import { useTranslation } from "react-i18next";

const STYLES = {
  placed: "bg-[#FFE9DB] text-[#FF6A1A] border-[#FF6A1A]/20",
  processing: "bg-[#FAFAF9] text-[#6B6B6B] border-[#ECECEA]",
  shipped: "bg-emerald-50 text-emerald-700 border-emerald-200",
  out_for_delivery: "bg-emerald-50 text-emerald-700 border-emerald-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
};

export default function OrderStatusBadge({ status }) {
  const { t } = useTranslation();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap ${
        STYLES[status] || "bg-[#FAFAF9] text-[#6B6B6B] border-[#ECECEA]"
      }`}
    >
      {t(`orders.${status}`, { defaultValue: status })}
    </span>
  );
}
