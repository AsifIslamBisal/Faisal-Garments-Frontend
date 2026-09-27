import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Package, ChevronRight, Calendar, MapPin, ShoppingBag } from "lucide-react";
import { catalogApi } from "../../api/catalogApi";
import OrderStatusBadge from "./OrderStatusBadge";

export default function Orders() {
  const { t } = useTranslation();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: catalogApi.getMyOrders,
  });

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-[#FFFFFB]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] mb-8">{t("orders.title")}</h1>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-[#FAFAF9] rounded-2xl border border-[#ECECEA] animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-[#ECECEA] shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#FFE9DB] text-[#FF6A1A] flex items-center justify-center mb-4">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{t("orders.noOrders")}</h3>
            <p className="text-sm text-[#6B6B6B] max-w-md mb-6">{t("orders.noOrdersDesc")}</p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#FF6A1A] text-white font-semibold text-sm hover:bg-[#e0580e] transition-colors shadow-xs"
            >
              {t("orders.browseShop")}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="block p-5 bg-white rounded-2xl border border-[#ECECEA] hover:border-[#FF6A1A]/50 hover:shadow-sm transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#ECECEA]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFE9DB] text-[#FF6A1A] flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#1A1A1A] group-hover:text-[#FF6A1A] transition-colors">
                        {order.orderNumber}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B] mt-0.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <OrderStatusBadge status={order.status} />
                    <span className="font-extrabold text-base text-[#FF6A1A]">৳{order.total}</span>
                    <ChevronRight className="w-5 h-5 text-[#6B6B6B] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B6B6B]">
                  <span>
                    {order.items.length} {t("orders.uniformItems")}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6A1A]" />
                    {order.shippingAddress.city} ({order.paymentMethod})
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
