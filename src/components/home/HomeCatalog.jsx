import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { catalogApi } from "../../api/catalogApi";
import ProductCard from "../catalog/ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const CATEGORY_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=60";

export default function HomeCatalog() {
  const { t } = useTranslation();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: catalogApi.getCategories,
    staleTime: 5 * 60 * 1000,
  });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => catalogApi.getProducts({ category: "all" }),
    staleTime: 5 * 60 * 1000,
  });

  const featured = products.slice(0, 6);

  return (
    <>
      <section className="py-16 bg-[#FAFAF9] border-y border-[#ECECEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A]">
                {t("home.featuredCategories")}
              </h2>
              <p className="text-xs text-[#6B6B6B] mt-1">
                {t("home.selectByCategory")}
              </p>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-[#FF6A1A] hover:underline flex items-center gap-1"
            >
              {t("home.viewAll")} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/shop?category=${cat.slug}`}
                className="group bg-white rounded-2xl border border-[#ECECEA] p-3 text-center hover:border-[#FF6A1A] hover:shadow-sm transition-all flex flex-col items-center"
              >
                <div className="w-full aspect-square rounded-xl bg-[#FAFAF9] overflow-hidden mb-3">
                  <img
                    src={cat.image || CATEGORY_FALLBACK_IMAGE}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="font-semibold text-xs sm:text-sm text-[#1A1A1A] group-hover:text-[#FF6A1A] transition-colors line-clamp-1">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
              {t("home.featuredProducts")}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1">
              {t("home.featuredProductsDesc")}
            </p>
          </div>
          <Link
            to="/shop"
            className="text-sm font-bold text-[#FF6A1A] hover:underline flex items-center gap-1"
          >
            {t("home.viewAll")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
