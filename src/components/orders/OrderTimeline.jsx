import { useTranslation } from "react-i18next";
import { FiCheckCircle, FiCircle, FiXCircle } from "react-icons/fi";

const STEPS = ["placed", "processing", "shipped", "out_for_delivery", "delivered"];

export default function OrderTimeline({ status, history = [] }) {
  const { t } = useTranslation();

  const currentIndex = STEPS.indexOf(status);
  const historySet = new Set(history.map((h) => h.status));

  const renderStep = (step, index) => {
    const reached = currentIndex >= index && status !== "cancelled";
    const active = currentIndex === index && status !== "cancelled";
    const hasTimestamp = historySet.has(step);
    const entry = history.find((h) => h.status === step);

    return (
      <div key={step} className="flex items-start gap-3 flex-1 min-w-0">
        <div className="flex flex-col items-center">
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
              reached
                ? "bg-[#FF6A1A] text-white"
                : status === "cancelled"
                  ? "bg-red-100 text-red-400"
                  : "bg-gray-200 text-gray-400"
            }`}
          >
            {reached ? <FiCheckCircle /> : <FiCircle />}
          </span>
          {index < STEPS.length - 1 && (
            <span
              className={`w-0.5 h-10 sm:h-12 ${
                reached ? "bg-[#FF6A1A]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
        <div className="pt-1">
          <p className={`text-sm font-semibold ${reached ? "text-gray-800" : "text-gray-400"}`}>
            {t(`orders.${step}`)}
          </p>
          {hasTimestamp && entry?.timestamp && (
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(entry.timestamp).toLocaleString()}
            </p>
          )}
          {entry?.note && <p className="text-xs text-gray-500 mt-0.5">{entry.note}</p>}
        </div>
        {active && (
          <span className="ml-auto hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#FF6A1A]/10 text-[#FF6A1A] text-xs font-semibold">
            {t("orders.status")}
          </span>
        )}
      </div>
    );
  };

  return (
    <div>
      {status === "cancelled" ? (
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
            <FiXCircle />
          </span>
          <div>
            <p className="text-sm font-semibold text-red-600">{t("orders.cancelled")}</p>
            {history.length > 0 && (
              <p className="text-xs text-gray-400">
                {new Date(history[history.length - 1].timestamp).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          {STEPS.map(renderStep)}
        </div>
      )}
    </div>
  );
}
