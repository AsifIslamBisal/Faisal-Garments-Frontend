import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiTrash2, FiShoppingBag } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCartContext } from "../../Provider/CartProvider";
import { Spinner } from "../ui/spinner";

export default function CartPage() {
  const { t } = useTranslation();
  const { cart, loading, updateQuantity, removeItem, subtotal, shippingFee, total } = useCartContext();

  if (loading) {
    return (
      <div className="pt-40 min-h-screen flex justify-center">
        <Spinner className="w-8 h-8 text-[#FF6A1A]" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 px-4 min-h-screen text-center">
        <FiShoppingBag className="mx-auto text-6xl text-[#C9D5EA]" />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">{t("cart.empty")}</h1>
        <p className="text-gray-500 mt-2">{t("cart.emptyDesc")}</p>
        <Link
          to="/shop"
          className="inline-block mt-6 px-8 py-3 rounded-full bg-[#FF6A1A] text-white font-semibold hover:bg-[#e0580e] transition shadow-lg shadow-[#FF6A1A]/40"
        >
          {t("cart.startShopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-b from-[#FFE9DB] via-[#FFFFFB] to-[#FFE9DB]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8">{t("cart.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <motion.div
                key={item.variantId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-white/40 bg-white/80 backdrop-blur p-4 shadow-sm"
              >
                <Link to={`/product/${item.productSlug}`} className="shrink-0">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.productSlug}`}
                    className="font-semibold text-gray-800 hover:text-[#FF6A1A] transition line-clamp-1"
                  >
                    {item.productName}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.variantSize}
                    {item.variantColor ? ` / ${item.variantColor}` : ""}
                    {item.variantAgeGroup ? ` / ${item.variantAgeGroup}` : ""}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="inline-flex items-center rounded-lg border border-gray-300 bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-3 font-semibold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
                    >
                      <FiTrash2 /> {t("cart.remove")}
                    </button>
                  </div>
                  {item.stockWarning && (
                    <p className="mt-1 text-xs text-amber-600">{item.stockWarning}</p>
                  )}
                </div>

                <p className="font-bold text-[#FF6A1A] text-lg shrink-0">
                  {t("common.currency")}
                  {(item.price * item.quantity).toLocaleString()}
                </p>
              </motion.div>
            ))}

            <Link to="/orders" className="inline-block text-sm text-[#FF6A1A] hover:underline">
              {t("cart.viewOrders")}
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-white/40 bg-white/80 backdrop-blur p-6 shadow-md">
              <h2 className="text-lg font-bold text-gray-800 mb-4">{t("cart.orderSummary")}</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{t("cart.subtotal")}</span>
                  <span className="font-semibold text-gray-800">
                    {t("common.currency")}
                    {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t("cart.shipping")}</span>
                  <span className="font-semibold text-gray-800">
                    {t("common.currency")}
                    {shippingFee.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-gray-800">
                  <span className="font-bold">{t("cart.total")}</span>
                  <span className="font-extrabold text-[#FF6A1A] text-lg">
                    {t("common.currency")}
                    {total.toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-400">{t("cart.codNote")}</p>
              <Link
                to="/checkout"
                className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF6A1A] text-white font-semibold hover:bg-[#e0580e] transition shadow-lg shadow-[#FF6A1A]/40"
              >
                {t("cart.checkout")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
