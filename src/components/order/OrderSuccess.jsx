import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { catalogApi } from "../../api/catalogApi";
import OrderTimeline from "../orders/OrderTimeline";
import { Spinner } from "../ui/spinner";

const STATUS_COLORS = {
  placed: "bg-[#FFE9DB] text-[#FF6A1A]",
  processing: "bg-amber-100 text-amber-700",
  shipped: "bg-indigo-100 text-indigo-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderSuccess() {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data: order } = useQuery({
    queryKey: ["order", id],
    queryFn: () => catalogApi.getOrder(id),
    retry: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return (
      <div className="pt-40 min-h-screen flex justify-center">
        <Spinner className="w-8 h-8 text-[#FF6A1A]" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-b from-[#FFE9DB] via-[#FFFFFB] to-[#FFE9DB]">
      <div className="max-w-3xl mx-auto text-center">
        <FiCheckCircle className="mx-auto text-7xl text-green-500" />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-800">{t("orders.justPlaced")}</h1>
        <p className="mt-2 text-gray-500">
          {t("orders.orderNumber")} <span className="font-bold text-[#FF6A1A]">{order.orderNumber}</span>
        </p>

        <div className="mt-8 rounded-2xl border border-white/40 bg-white/80 backdrop-blur p-6 text-left">
          <h2 className="font-bold text-gray-800 mb-6">{t("orders.timeline")}</h2>
          <OrderTimeline status={order.status} history={order.statusHistory} />
        </div>

        <div className="mt-8 rounded-2xl border border-white/40 bg-white/80 backdrop-blur p-6 text-left">
          <h2 className="font-bold text-gray-800 mb-4">{t("orders.uniformItems")}</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.productName}
                  <span className="text-gray-400">
                    {" "}
                    ({item.variantSize}
                    {item.variantColor ? ` / ${item.variantColor}` : ""}) × {item.quantity}
                  </span>
                </span>
                <span className="font-semibold text-gray-800">
                  {t("common.currency")}
                  {item.lineTotal.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{t("cart.subtotal")}</span>
              <span>{t("common.currency")}{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{t("cart.shipping")}</span>
              <span>{t("common.currency")}{order.shippingFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800">
              <span>{t("cart.total")}</span>
              <span className="text-[#FF6A1A]">{t("common.currency")}{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/40 bg-white/80 backdrop-blur p-6 text-left">
          <h2 className="font-bold text-gray-800 mb-2">{t("orders.shippingTo")}</h2>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.fullName} — {order.shippingAddress.street}, {order.shippingAddress.city}
            {order.shippingAddress.postalCode ? `, ${order.shippingAddress.postalCode}` : ""}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {t("orders.contact")}: {order.contactPhone}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/orders"
            className="px-8 py-3 rounded-full bg-[#FF6A1A] text-white font-semibold hover:bg-[#e0580e] transition shadow-lg shadow-[#FF6A1A]/40"
          >
            {t("orders.title")}
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3 rounded-full bg-white border border-[#FF6A1A] text-[#FF6A1A] font-semibold hover:bg-[#FFE9DB] transition"
          >
            {t("checkout.goToShop")}
          </Link>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center gap-2 mt-6 text-sm text-gray-400 hover:text-[#FF6A1A] transition"
        >
          <FiArrowLeft /> {t("product.backToCatalog")}
        </Link>
      </div>
    </div>
  );
}
