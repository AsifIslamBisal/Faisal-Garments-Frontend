import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CheckCircle2, Clock, MapPin, Phone, Mail } from "lucide-react";
import { catalogApi } from "../../api/catalogApi";
import OrderStatusBadge from "./OrderStatusBadge";

const TIMELINE_STEPS = ["placed", "processing", "shipped", "out_for_delivery", "delivered"];

export default function OrderDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => catalogApi.getOrder(id),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="pt-32 max-w-4xl mx-auto px-4 w-full animate-pulse space-y-6">
        <div className="h-10 bg-[#FAFAF9] rounded-xl w-1/3" />
        <div className="h-40 bg-[#FAFAF9] rounded-2xl" />
        <div className="h-60 bg-[#FAFAF9] rounded-2xl" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="pt-32 pb-20 max-w-md mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-[#1A1A1A]">Order Not Found</h2>
        <p className="text-sm text-[#6B6B6B] mt-2 mb-6">We could not locate an order matching #{id}.</p>
        <Link to="/orders" className="px-6 py-3 rounded-xl bg-[#FF6A1A] text-white font-semibold text-sm hover:bg-[#e0580e] transition-colors">
          {t("orders.backToOrders")}
        </Link>
      </div>
    );
  }

  const justPlaced = location.state?.justPlaced;
  const currentStatusIndex = TIMELINE_STEPS.indexOf(order.status);

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-[#FFFFFB]">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#6B6B6B] hover:text-[#1A1A1A] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("orders.backToOrders")}</span>
        </Link>

        {justPlaced && (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-emerald-900">
                  {isBn ? "অর্ডার সফলভাবে গ্রহণ করা হয়েছে!" : "Order Placed Successfully!"}
                </h3>
                <p className="text-xs text-emerald-700">
                  {isBn
                    ? `আপনার অর্ডার নং ${order.orderNumber}। ক্যাশ অন ডেলিভারি মোডে অর্ডারটি প্রসেস হচ্ছে।`
                    : `Order reference ${order.orderNumber}. Our tailoring team is preparing your uniforms.`}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 bg-[#FAFAF9] rounded-2xl border border-[#ECECEA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1A1A1A]">
                {t("orders.orderNumber")}
                {order.orderNumber}
              </h1>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-xs text-[#6B6B6B] mt-1">
              Placed on {new Date(order.createdAt).toLocaleString()} • Payment:{" "}
              <strong className="text-[#1A1A1A]">{order.paymentMethod}</strong>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-[#6B6B6B] block">Total Amount</span>
            <span className="text-2xl font-extrabold text-[#FF6A1A]">৳{order.total}</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-[#ECECEA] space-y-6 shadow-xs">
          <h3 className="font-bold text-base text-[#1A1A1A] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF6A1A]" />
            <span>{t("orders.timeline")}</span>
          </h3>

          {order.status === "cancelled" ? (
            <p className="text-sm font-semibold text-red-600">{t("orders.cancelled")}</p>
          ) : (
            <>
              <div className="relative flex items-center justify-between">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#ECECEA] z-0" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#FF6A1A] z-0 transition-all duration-500"
                  style={{
                    width: `${Math.max(0, (currentStatusIndex / (TIMELINE_STEPS.length - 1)) * 100)}%`,
                  }}
                />

                {TIMELINE_STEPS.map((step, idx) => {
                  const isCompleted = idx <= currentStatusIndex;
                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          isCompleted
                            ? "bg-[#FF6A1A] text-white ring-4 ring-[#FFE9DB]"
                            : "bg-white text-[#6B6B6B] border-2 border-[#ECECEA]"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <span className="text-[11px] font-semibold text-[#1A1A1A] mt-2 max-w-[80px]">
                        {t(`orders.${step}`)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {order.statusHistory?.length > 0 && (
                <div className="pt-4 border-t border-[#ECECEA] space-y-3">
                  {order.statusHistory.map((hist, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <div className="w-2 h-2 rounded-full bg-[#FF6A1A] mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-bold text-[#1A1A1A]">
                          {hist.note || t(`orders.${hist.status}`, { defaultValue: hist.status })}
                        </p>
                        <p className="text-[11px] text-[#6B6B6B]">
                          {new Date(hist.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 p-6 bg-white rounded-2xl border border-[#ECECEA] space-y-4">
            <h3 className="font-bold text-base text-[#1A1A1A] pb-3 border-b border-[#ECECEA]">
              {t("orders.items")}
            </h3>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1A1A]">{item.productName}</h4>
                    <p className="text-[#6B6B6B] mt-0.5">
                      Size: <strong className="text-[#1A1A1A]">{item.variantSize}</strong> | Color:{" "}
                      <strong className="text-[#1A1A1A]">{item.variantColor}</strong> x {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#FF6A1A]">৳{item.lineTotal}</span>
                    <span className="text-[11px] text-[#6B6B6B] block">৳{item.price} each</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#ECECEA] space-y-1.5 text-xs text-right">
              <p className="text-[#6B6B6B]">
                Subtotal: <strong className="text-[#1A1A1A]">৳{order.subtotal}</strong>
              </p>
              <p className="text-[#6B6B6B]">
                Shipping: <strong className="text-[#1A1A1A]">৳{order.shippingFee}</strong>
              </p>
              <p className="text-sm font-extrabold text-[#1A1A1A] pt-1">
                Total: <span className="text-[#FF6A1A]">৳{order.total}</span>
              </p>
            </div>
          </div>

          <div className="p-6 bg-[#FAFAF9] rounded-2xl border border-[#ECECEA] space-y-4 h-fit">
            <h3 className="font-bold text-base text-[#1A1A1A] pb-3 border-b border-[#ECECEA]">
              {t("orders.shippingTo")}
            </h3>

            <div className="space-y-2 text-xs text-[#1A1A1A]">
              <p className="font-bold text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FF6A1A]" />
                {order.shippingAddress.fullName}
              </p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}
                {order.shippingAddress.postalCode ? ` ${order.shippingAddress.postalCode}` : ""}
              </p>

              <div className="pt-3 border-t border-[#ECECEA] space-y-1 text-[#6B6B6B]">
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#FF6A1A]" />
                  {order.contactPhone}
                </p>
                {order.contactEmail && (
                  <p className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#FF6A1A]" />
                    {order.contactEmail}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
