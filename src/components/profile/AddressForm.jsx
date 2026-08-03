import { useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

export default function AddressForm({ initialAddress, onSave, onCancel }) {
  const { t } = useTranslation();

  const [fullName, setFullName] = useState(initialAddress?.fullName || "");
  const [phone, setPhone] = useState(initialAddress?.phone || "");
  const [street, setStreet] = useState(initialAddress?.street || "");
  const [city, setCity] = useState(initialAddress?.city || "");
  const [postalCode, setPostalCode] = useState(initialAddress?.postalCode || "");
  const [isDefault, setIsDefault] = useState(initialAddress?.isDefault || false);

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl border border-[#ECECEA] text-sm text-[#1A1A1A] focus:border-[#FF6A1A] focus:outline-none";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone || !street || !city) return;
    onSave({
      id: initialAddress?.id || "addr-" + Date.now().toString(36),
      fullName,
      phone,
      street,
      city,
      postalCode,
      isDefault,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ECECEA] p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#ECECEA]">
        <h4 className="font-bold text-base text-[#1A1A1A]">
          {initialAddress ? t("profile.editAddress") : t("profile.addAddress")}
        </h4>
        <button onClick={onCancel} className="p-1 rounded-lg text-[#6B6B6B] hover:bg-[#FAFAF9] cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1">
              {t("checkout.fullName")} *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputCls}
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1">
              {t("checkout.phone")} *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputCls}
              placeholder="+880 1700 000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1">
            {t("checkout.address")} *
          </label>
          <input
            type="text"
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className={inputCls}
            placeholder="House / Road / Block / Area"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1">
              {t("checkout.city")} *
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={inputCls}
              placeholder="Dhaka, Chittagong, etc."
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1">
              {t("checkout.postalCode")}
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className={inputCls}
              placeholder="1212"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="isDefault"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="w-4 h-4 accent-[#FF6A1A] rounded cursor-pointer"
          />
          <label htmlFor="isDefault" className="text-xs font-semibold text-[#1A1A1A] cursor-pointer">
            {t("profile.makeDefault")}
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#ECECEA]">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-[#FAFAF9] text-[#1A1A1A] font-semibold text-xs hover:bg-[#ECECEA] transition-colors cursor-pointer"
          >
            {t("profile.cancel")}
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-[#FF6A1A] text-white font-semibold text-xs hover:bg-[#e0580e] transition-colors shadow-xs cursor-pointer"
          >
            {t("profile.saveChanges")}
          </button>
        </div>
      </form>
    </div>
  );
}
