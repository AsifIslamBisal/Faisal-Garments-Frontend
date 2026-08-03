import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=60";

export default function ProductCard({ product }) {
  const { t } = useTranslation();

  const variants = product.variants || [];
  const prices = variants.map((v) => v.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
  const isAllOutOfStock = totalStock === 0;

  const priceDisplay =
    minPrice === maxPrice
      ? `৳${minPrice}`
      : t("shop.fromPrice", { price: minPrice });

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-2xl border border-[#ECECEA] overflow-hidden hover:border-[#FF6A1A]/60 hover:shadow-md transition-all duration-200 flex flex-col h-full"
    >
      <div className="relative aspect-4/3 bg-[#FAFAF9] overflow-hidden">
        <img
          src={product.images?.[0] || FALLBACK_IMAGE}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.schoolTag && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap bg-white/90 backdrop-blur-xs text-[#1A1A1A]">
              {product.schoolTag}
            </span>
          )}
          {product.isBundle && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap bg-[#FFE9DB] text-[#FF6A1A] border-[#FF6A1A]/20">
              Bundle
            </span>
          )}
        </div>

        {isAllOutOfStock && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap bg-red-50 text-red-600 border-red-200">
              {t("shop.outOfStock")}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#FF6A1A] transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-[#6B6B6B] mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="pt-2 border-t border-[#ECECEA] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#6B6B6B] block">{t("shop.price")}</span>
            <span className="font-bold text-base sm:text-lg text-[#FF6A1A]">
              {priceDisplay}
            </span>
          </div>

          <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-[#FAFAF9] group-hover:bg-[#FFE9DB] text-[#1A1A1A] group-hover:text-[#FF6A1A] text-xs font-semibold transition-colors">
            {t("shop.viewDetails")}
          </span>
        </div>
      </div>
    </Link>
  );
}
