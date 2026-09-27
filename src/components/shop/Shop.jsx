import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X, Search, Filter } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { catalogApi } from "../../api/catalogApi";
import ProductCard from "../catalog/ProductCard";
import FilterSidebar from "../filters/FilterSidebar";

export default function Shop() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = searchParams.get("category") || "all";
  const school = searchParams.get("school") || "all";
  const ageGroup = searchParams.get("ageGroup") || "all";
  const size = searchParams.get("size") || "all";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const search = searchParams.get("search") || "";

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const handleFilterChange = (updated) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updated).forEach(([key, value]) => {
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
    });
    setSearchParams(next, { replace: true });
  };

  const clearAll = () => setSearchParams({}, { replace: true });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: catalogApi.getCategories,
    staleTime: 5 * 60 * 1000,
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", { category, school, ageGroup, size, minPrice, maxPrice, search }],
    queryFn: () =>
      catalogApi.getProducts({
        category,
        school: school === "all" ? undefined : school,
        ageGroup: ageGroup === "all" ? undefined : ageGroup,
        size: size === "all" ? undefined : size,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        search: search || undefined,
      }),
  });

  const { data: allProducts = [] } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => catalogApi.getProducts({ category: "all" }),
    staleTime: 5 * 60 * 1000,
  });

  const schools = useMemo(
    () => [...new Set(allProducts.map((p) => p.schoolTag).filter(Boolean))].sort(),
    [allProducts]
  );
  const ageGroups = useMemo(
    () => [
      ...new Set(allProducts.flatMap((p) => (p.variants || []).map((v) => v.ageGroup)).filter(Boolean)),
    ].sort(),
    [allProducts]
  );
  const sizes = useMemo(
    () => [
      ...new Set(allProducts.flatMap((p) => (p.variants || []).map((v) => v.size)).filter(Boolean)),
    ].sort((a, b) => {
      const nums = (s) => s.replace(/[^0-9]/g, "");
      const na = Number(nums(a));
      const nb = Number(nums(b));
      if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) return na - nb;
      return a.localeCompare(b);
    }),
    [allProducts]
  );

  const catalogMinPrice = useMemo(() => {
    const prices = allProducts.flatMap((p) => (p.variants || []).map((v) => v.price)).filter((n) => Number.isFinite(n));
    return prices.length ? Math.min(...prices) : 0;
  }, [allProducts]);

  const catalogMaxPrice = useMemo(() => {
    const prices = allProducts.flatMap((p) => (p.variants || []).map((v) => v.price)).filter((n) => Number.isFinite(n));
    return prices.length ? Math.max(...prices) : 5000;
  }, [allProducts]);

  const minPriceNum = minPrice ? Number(minPrice) : catalogMinPrice;
  const maxPriceNum = maxPrice ? Number(maxPrice) : catalogMaxPrice;

  const activeChips = useMemo(() => {
    const chips = [];
    if (category !== "all") {
      const cat = categories.find((c) => c.slug === category);
      chips.push({ key: "category", label: "Category", value: cat ? cat.name : category });
    }
    if (school !== "all") {
      chips.push({ key: "school", label: "School", value: school });
    }
    if (ageGroup !== "all") {
      chips.push({ key: "ageGroup", label: "Age", value: `${ageGroup} Yrs` });
    }
    if (size !== "all") {
      chips.push({ key: "size", label: "Size", value: size });
    }
    if (
      (minPrice && Number(minPrice) > catalogMinPrice) ||
      (maxPrice && Number(maxPrice) < catalogMaxPrice)
    ) {
      chips.push({ key: "minPrice", label: "Price", value: `৳${minPriceNum} - ৳${maxPriceNum}` });
    }
    if (search) {
      chips.push({ key: "search", label: "Search", value: `"${search}"` });
    }
    return chips;
  }, [category, school, ageGroup, size, minPrice, maxPrice, minPriceNum, maxPriceNum, catalogMinPrice, catalogMaxPrice, search, categories]);

  const removeChip = (key) => {
    if (key === "minPrice" || key === "maxPrice") {
      const next = new URLSearchParams(searchParams);
      next.delete("minPrice");
      next.delete("maxPrice");
      setSearchParams(next, { replace: true });
    } else {
      setParam(key, key === "search" ? "" : "all");
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-[#FFFFFB]">
      <div className="max-w-7xl mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">
              {t("shop.title")}
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
              {t("shop.showing", { count: products.length })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setParam("search", e.target.value)}
                placeholder={t("shop.searchPlaceholder")}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#ECECEA] bg-[#FAFAF9] text-xs text-[#1A1A1A] focus:bg-white focus:border-[#FF6A1A] focus:outline-none transition-colors"
              />
              {search && (
                <button
                  onClick={() => setParam("search", "")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#1A1A1A]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#ECECEA] text-xs font-semibold text-[#1A1A1A] hover:border-[#FF6A1A] transition-colors shadow-xs cursor-pointer"
            >
              <Filter className="w-4 h-4 text-[#FF6A1A]" />
              <span>{t("shop.filters")}</span>
              {activeChips.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#FF6A1A] text-white text-[10px] font-bold flex items-center justify-center">
                  {activeChips.length}
                </span>
              )}
            </button>
          </div>
        </Motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FilterSidebar
            filters={{
              category,
              school,
              ageGroup,
              size,
              minPrice: minPriceNum,
              maxPrice: maxPriceNum,
              search,
            }}
            categories={categories}
            schools={schools}
            sizes={sizes}
            ageGroups={ageGroups}
            catalogMinPrice={catalogMinPrice}
            catalogMaxPrice={catalogMaxPrice}
            onFilterChange={handleFilterChange}
            onClearAll={clearAll}
            isMobileDrawerOpen={mobileFiltersOpen}
            onCloseMobileDrawer={() => setMobileFiltersOpen(false)}
          />

          <main className="lg:col-span-3">
            {activeChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-[#FAFAF9] rounded-2xl border border-[#ECECEA]">
                <span className="text-xs font-bold text-[#6B6B6B] mr-1">Active Filters:</span>
                {activeChips.map((chip) => (
                  <span
                    key={chip.key}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE9DB] text-[#FF6A1A] text-xs font-semibold border border-[#FF6A1A]/30"
                  >
                    <span>{chip.label}: {chip.value}</span>
                    <button
                      onClick={() => removeChip(chip.key)}
                      className="hover:text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}

                <button
                  onClick={clearAll}
                  className="text-xs font-bold text-[#FF6A1A] hover:underline ml-auto cursor-pointer"
                >
                  {t("shop.clearAll")}
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-2xl bg-white/70 animate-pulse h-80" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 rounded-2xl bg-white/60 backdrop-blur border border-dashed border-[#FF6A1A]/50">
                <p className="text-lg font-semibold text-gray-700">{t("shop.noProducts")}</p>
                <p className="text-sm text-gray-500 mt-1">{t("shop.noProductsDesc")}</p>
                <button
                  onClick={clearAll}
                  className="mt-5 px-6 py-2.5 rounded-full bg-[#FF6A1A] text-white text-sm font-semibold hover:bg-[#e0580e] transition"
                >
                  {t("shop.clearFiltersBtn")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {products.map((product, idx) => (
                  <ProductCard key={product._id} product={product} index={idx} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
