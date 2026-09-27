import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  Package,
  AlertCircle,
} from "lucide-react";
import { catalogApi } from "../../api/catalogApi";
import { useCartContext } from "../../Provider/CartProvider";
import ProductCard from "../catalog/ProductCard";
import { Spinner } from "../ui/spinner";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=60";

const chipSelected =
  "bg-[#FFE9DB] text-[#FF6A1A] border-[#FF6A1A] ring-2 ring-[#FF6A1A]/20";
const chipIdle = "bg-white text-[#1A1A1A] border-[#ECECEA] hover:border-[#FF6A1A]/50";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addItem } = useCartContext();

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => catalogApi.getProduct(slug),
    retry: false,
  });

  const { data: related = [] } = useQuery({
    queryKey: ["products", "related", product?.categoryId],
    enabled: !!product,
    queryFn: () =>
      catalogApi.getProducts({ category: "all" }).then((all) =>
        all
          .filter((p) => String(p.categoryId) === String(product.categoryId) && p.slug !== product.slug)
          .slice(0, 3)
      ),
  });

  useEffect(() => {
    if (product) {
      const variants = product.variants || [];
      if (variants.length) {
        setSize(variants[0].size);
        setColor(variants[0].color);
        setAgeGroup(variants[0].ageGroup);
      }
      setSelectedImage(product.images?.[0] || FALLBACK_IMAGE);
      setQuantity(1);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="pt-40 min-h-screen flex justify-center">
        <Spinner className="w-8 h-8 text-[#FF6A1A]" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-40 pb-20 px-4 min-h-screen text-center">
        <AlertCircle className="w-12 h-12 text-[#FF6A1A] mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#1A1A1A]">{t("product.notFound")}</h2>
        <p className="text-sm text-[#6B6B6B] mt-2 mb-6">{t("product.notFoundDesc")}</p>
        <Link
          to="/shop"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#FF6A1A] text-white font-semibold text-sm shadow-xs hover:bg-[#e0580e] transition-colors"
        >
          {t("product.backToCatalog")}
        </Link>
      </div>
    );
  }

  const variants = product.variants || [];
  const colors = [...new Set(variants.map((v) => v.color).filter(Boolean))];
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];
  const ageGroups = [...new Set(variants.map((v) => v.ageGroup).filter(Boolean))];
  const images =
    product.images && product.images.length > 0 ? product.images : [FALLBACK_IMAGE];

  const selectColor = (c) => {
    setColor(c);
    const cands = variants.filter((v) => v.color === c);
    if (cands.length) {
      setSize(cands[0].size);
      setAgeGroup(cands[0].ageGroup);
    }
  };
  const selectSize = (s) => {
    setSize(s);
    const cands = variants.filter((v) => v.size === s);
    if (cands.length) {
      setColor(cands[0].color);
      setAgeGroup(cands[0].ageGroup);
    }
  };
  const selectAgeGroup = (g) => {
    setAgeGroup(g);
    const cands = variants.filter((v) => v.ageGroup === g);
    if (cands.length) {
      setSize(cands[0].size);
      setColor(cands[0].color);
    }
  };

  const sizeOutOfStock = (s) => {
    const m = variants.find((v) => v.size === s);
    return m ? m.stock === 0 : false;
  };

  const selectedVariant = variants.find(
    (v) => v.size === size && v.color === color && v.ageGroup === ageGroup
  );
  const stock = selectedVariant?.stock || 0;
  const inStock = stock > 0;
  const isOutOfStock = !inStock;

  const handleAdd = async () => {
    if (!selectedVariant || isOutOfStock) return;
    setAdding(true);
    try {
      await addItem(product._id, selectedVariant._id, quantity);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 3500);
    } catch (err) {
      console.error("Failed to add to cart", err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-[#FFFFFB]">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6B6B6B] hover:text-[#1A1A1A] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("product.back")}</span>
        </button>

        {addedToast && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-emerald-800 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>{t("product.addedToCart")}</span>
            </div>
            <Link
              to="/cart"
              className="text-xs font-bold uppercase tracking-wider text-emerald-700 underline"
            >
              {t("product.viewCart")}
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-4/3 rounded-2xl bg-[#FAFAF9] overflow-hidden border border-[#ECECEA] relative">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.schoolTag && (
                <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-[#ECECEA] bg-white/95 backdrop-blur-xs text-[#1A1A1A] whitespace-nowrap">
                  {product.schoolTag}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === img
                        ? "border-[#FF6A1A] ring-2 ring-[#FF6A1A]/20"
                        : "border-[#ECECEA] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isBundle && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-[#FFE9DB] text-[#FF6A1A] border-[#FF6A1A]/20 whitespace-nowrap">
                    Bundle Package
                  </span>
                )}
                {isOutOfStock ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-red-50 text-red-600 border-red-200 whitespace-nowrap">
                    {t("shop.outOfStock")}
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200 whitespace-nowrap">
                    {t("product.inStock", { count: stock })}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] leading-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#FF6A1A]">
                  ৳{selectedVariant?.price}
                </span>
                <span className="text-xs text-[#6B6B6B]">(Inclusive of all taxes)</span>
              </div>
            </div>

            <p className="text-sm text-[#6B6B6B] leading-relaxed border-t border-b border-[#ECECEA] py-4">
              {product.description ||
                "Premium quality school uniform tailored for comfort and durability."}
            </p>

            {product.isBundle && product.bundleItems?.length > 0 && (
              <div className="p-4 rounded-2xl bg-[#FAFAF9] border border-[#ECECEA] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#FF6A1A]" />
                  {t("product.bundleIncludes")}
                </h4>
                <ul className="space-y-1.5 text-xs text-[#1A1A1A]">
                  {product.bundleItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>
                        {item.label}
                        {item.qty > 1 ? ` ×${item.qty}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variant Selector */}
            <div className="space-y-5">
              {ageGroups.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-2">
                    {t("product.ageGroup")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ageGroups.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => selectAgeGroup(g)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          ageGroup === g ? chipSelected : chipIdle
                        }`}
                      >
                        {g} Years
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {sizes.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-2">
                    {t("product.size")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => {
                      const out = sizeOutOfStock(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => selectSize(s)}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                            size === s
                              ? chipSelected
                              : out
                              ? "bg-[#FAFAF9] text-[#6B6B6B]/50 border-[#ECECEA] line-through"
                              : chipIdle
                          }`}
                        >
                          {s}
                          {out ? " (Out of stock)" : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {colors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-2">
                    {t("product.color")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => selectColor(c)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          color === c ? chipSelected : chipIdle
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-4 pt-4 border-t border-[#ECECEA]">
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
                  {t("product.quantity")}
                </label>

                <div className="flex items-center border border-[#ECECEA] rounded-xl bg-[#FAFAF9] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="p-2.5 text-[#1A1A1A] hover:bg-[#FFE9DB] hover:text-[#FF6A1A] transition-colors cursor-pointer disabled:opacity-40"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-[#1A1A1A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    disabled={quantity >= stock || isOutOfStock}
                    className="p-2.5 text-[#1A1A1A] hover:bg-[#FFE9DB] hover:text-[#FF6A1A] transition-colors cursor-pointer disabled:opacity-40"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={isOutOfStock || adding}
                className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  isOutOfStock
                    ? "bg-[#FAFAF9] text-[#6B6B6B] border border-[#ECECEA] cursor-not-allowed shadow-none"
                    : "bg-[#FF6A1A] text-white hover:bg-[#e0580e]"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>
                  {adding
                    ? t("product.adding")
                    : isOutOfStock
                    ? t("product.outOfStockBtn")
                    : t("product.addToCart")}
                </span>
              </button>
            </div>

            <div className="pt-4 flex items-center gap-2 text-xs text-[#6B6B6B]">
              <ShieldCheck className="w-4 h-4 text-[#FF6A1A]" />
              <span>Guaranteed authentic school tailoring & high-durability fabrics.</span>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-6">Related Uniforms</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
