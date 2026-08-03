import { useTranslation } from "react-i18next";
import { useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import { X, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

const FilterSection = ({ title, open, onToggle, children }) => (
  <div className="pt-4 border-t border-[#ECECEA]">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between mb-2.5 cursor-pointer group"
    >
      <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] group-hover:text-[#1A1A1A] transition-colors">
        {title}
      </span>
      {open ? (
        <ChevronUp className="w-4 h-4 text-[#6B6B6B] group-hover:text-[#1A1A1A]" />
      ) : (
        <ChevronDown className="w-4 h-4 text-[#6B6B6B] group-hover:text-[#1A1A1A]" />
      )}
    </button>
    {open && children}
  </div>
);

const FilterSidebar = ({
  filters,
  categories,
  schools,
  sizes,
  ageGroups,
  catalogMinPrice,
  catalogMaxPrice,
  onFilterChange,
  onClearAll,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer,
}) => {
  const { t } = useTranslation();

  const [openSections, setOpenSections] = useState({
    category: true,
    school: true,
    ageGroup: true,
    size: true,
    price: true,
  });

  const toggleSection = (key) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#ECECEA]">
        <h3 className="font-bold text-base text-[#1A1A1A]">{t("shop.filters")}</h3>
        <button
          onClick={onClearAll}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF6A1A] hover:underline cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          {t("shop.clearAll")}
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <button
          type="button"
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between mb-2.5 cursor-pointer group"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] group-hover:text-[#1A1A1A] transition-colors">
            {t("shop.category")}
          </span>
          {openSections.category ? (
            <ChevronUp className="w-4 h-4 text-[#6B6B6B] group-hover:text-[#1A1A1A]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#6B6B6B] group-hover:text-[#1A1A1A]" />
          )}
        </button>
        {openSections.category && (
          <div className="space-y-1.5">
            <button
              onClick={() => onFilterChange({ category: "all" })}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                filters.category === "all" || !filters.category
                  ? "bg-[#FFE9DB] text-[#FF6A1A] font-semibold"
                  : "text-[#1A1A1A] hover:bg-[#FAFAF9]"
              }`}
            >
              {t("shop.allCategories")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id || cat.id}
                onClick={() => onFilterChange({ category: cat.slug })}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  filters.category === cat.slug
                    ? "bg-[#FFE9DB] text-[#FF6A1A] font-semibold"
                    : "text-[#1A1A1A] hover:bg-[#FAFAF9]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* School Filter (Only rendered if schools exist in catalog) */}
      {schools.length > 0 && (
        <FilterSection
          title={t("shop.school")}
          open={openSections.school}
          onToggle={() => toggleSection("school")}
        >
          <div className="space-y-1.5">
            <button
              onClick={() => onFilterChange({ school: "all" })}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                filters.school === "all" || !filters.school
                  ? "bg-[#FFE9DB] text-[#FF6A1A] font-semibold"
                  : "text-[#1A1A1A] hover:bg-[#FAFAF9]"
              }`}
            >
              {t("shop.allSchools")}
            </button>
            {schools.map((sch) => (
              <button
                key={sch}
                onClick={() => onFilterChange({ school: sch })}
                className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors truncate cursor-pointer ${
                  filters.school === sch
                    ? "bg-[#FFE9DB] text-[#FF6A1A] font-semibold"
                    : "text-[#1A1A1A] hover:bg-[#FAFAF9]"
                }`}
              >
                {sch}
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Age Group Filter */}
      {ageGroups.length > 0 && (
        <FilterSection
          title={t("shop.ageGroup")}
          open={openSections.ageGroup}
          onToggle={() => toggleSection("ageGroup")}
        >
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onFilterChange({ ageGroup: "all" })}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                filters.ageGroup === "all" || !filters.ageGroup
                  ? "bg-[#FFE9DB] text-[#FF6A1A] border-[#FF6A1A]"
                  : "bg-white text-[#1A1A1A] border-[#ECECEA] hover:border-[#FF6A1A]/50"
              }`}
            >
              All Ages
            </button>
            {ageGroups.map((age) => (
              <button
                key={age}
                onClick={() => onFilterChange({ ageGroup: age })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  filters.ageGroup === age
                    ? "bg-[#FFE9DB] text-[#FF6A1A] border-[#FF6A1A]"
                    : "bg-white text-[#1A1A1A] border-[#ECECEA] hover:border-[#FF6A1A]/50"
                }`}
              >
                {age} Yrs
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Size Filter */}
      {sizes.length > 0 && (
        <FilterSection
          title={t("shop.size")}
          open={openSections.size}
          onToggle={() => toggleSection("size")}
        >
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onFilterChange({ size: "all" })}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                filters.size === "all" || !filters.size
                  ? "bg-[#FFE9DB] text-[#FF6A1A] border-[#FF6A1A]"
                  : "bg-white text-[#1A1A1A] border-[#ECECEA] hover:border-[#FF6A1A]/50"
              }`}
            >
              All
            </button>
            {sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => onFilterChange({ size: sz })}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                  filters.size === sz
                    ? "bg-[#FFE9DB] text-[#FF6A1A] border-[#FF6A1A]"
                    : "bg-white text-[#1A1A1A] border-[#ECECEA] hover:border-[#FF6A1A]/50"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Price Range Slider */}
      <FilterSection
        title={t("shop.priceRange")}
        open={openSections.price}
        onToggle={() => toggleSection("price")}
      >
        <PriceRangeSlider
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          catalogMinPrice={catalogMinPrice}
          catalogMaxPrice={catalogMaxPrice}
          onChange={(min, max) => onFilterChange({ minPrice: min, maxPrice: max })}
        />
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 bg-white p-6 rounded-2xl border border-[#ECECEA] h-fit sticky top-24 shadow-xs">
        {content}
      </div>

      {/* Mobile Top Sheet / Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-black/40 backdrop-blur-xs">
          <div className="mt-auto bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-[#ECECEA] mb-4">
              <h3 className="font-bold text-lg text-[#1A1A1A]">{t("shop.filters")}</h3>
              <button
                onClick={onCloseMobileDrawer}
                className="p-2 rounded-full hover:bg-[#FAFAF9] text-[#1A1A1A] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
            <div className="mt-6 pt-4 border-t border-[#ECECEA]">
              <button
                onClick={onCloseMobileDrawer}
                className="w-full py-3 rounded-xl bg-[#FF6A1A] text-white font-semibold text-sm hover:bg-[#e0580e] shadow-xs cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
