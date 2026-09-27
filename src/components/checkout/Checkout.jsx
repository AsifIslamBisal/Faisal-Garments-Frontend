import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { catalogApi } from "../../api/catalogApi";
import { useCartContext } from "../../Provider/CartProvider";
import useAuth from "../../hooks/useAuth";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Spinner } from "../ui/spinner";

export default function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, loading, total, subtotal, shippingFee, refreshCart } = useCartContext();

  const { data: me } = useQuery({
    queryKey: ["me", user?.email],
    enabled: !!user,
    queryFn: catalogApi.getMe,
    staleTime: 60 * 1000,
  });

  const savedAddresses = me?.user?.addresses || [];

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    street: "",
    city: "",
    postalCode: "",
  });
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    setForm((f) => ({
      ...f,
      fullName: f.fullName || user?.name || "",
      email: f.email || user?.email || "",
      phone: f.phone || user?.phone || "",
    }));
  }, [user]);

  const items = useMemo(
    () => cart.map((i) => ({ productId: i.productId, variantId: i.variantId, quantity: i.quantity })),
    [cart]
  );

  const applySavedAddress = (addr) => {
    setForm({
      fullName: addr.fullName || user?.name || "",
      phone: addr.phone || "",
      email: user?.email || "",
      street: addr.street || "",
      city: addr.city || "",
      postalCode: addr.postalCode || "",
    });
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, phone, street, city } = form;
    if (!fullName || !phone || !street || !city) {
      Swal.fire({ icon: "warning", title: t("checkout.required") });
      return;
    }

    setPlacing(true);
    try {
      const order = await catalogApi.createOrder({
        shippingAddress: {
          fullName: form.fullName,
          phone: form.phone,
          street: form.street,
          city: form.city,
          postalCode: form.postalCode,
        },
        contactPhone: form.phone,
        contactEmail: form.email || "",
        items,
      });
      await refreshCart(true);
      navigate(`/order-success/${order.id}`);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setPlacing(false);
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-800">{t("checkout.empty")}</h1>
        <p className="text-gray-500 mt-2">{t("checkout.emptyDesc")}</p>
        <Link
          to="/shop"
          className="inline-block mt-6 px-8 py-3 rounded-full bg-[#FF6A1A] text-white font-semibold hover:bg-[#e0580e] transition"
        >
          {t("checkout.goToShop")}
        </Link>
      </div>
    );
  }

  const inputCls =
    "w-full px-4 py-2.5 rounded-xl border border-[#FF6A1A] bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6A1A]/50";

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gradient-to-b from-[#FFE9DB] via-[#FFFFFB] to-[#FFE9DB]">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#FF6A1A] transition mb-6"
        >
          <FiArrowLeft /> {t("product.back")}
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8">{t("checkout.title")}</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {savedAddresses.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">{t("checkout.savedAddresses")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedAddresses.map((addr) => (
                    <button
                      type="button"
                      key={addr.id || addr.street}
                      onClick={() => applySavedAddress(addr)}
                      className="text-left rounded-2xl border border-[#FF6A1A] bg-white/80 p-4 hover:border-[#e0580e] hover:shadow-md transition"
                    >
                      <span className="text-sm font-semibold text-gray-800">{addr.label}</span>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {addr.fullName} — {addr.street}, {addr.city}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{addr.phone}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">{t("checkout.contactInfo")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-white/40 bg-white/80 backdrop-blur p-5">
                <input className={inputCls} placeholder={t("checkout.fullName")} value={form.fullName} onChange={set("fullName")} />
                <input className={inputCls} placeholder={t("checkout.phone")} value={form.phone} onChange={set("phone")} />
                <input className={`${inputCls} sm:col-span-2`} placeholder={t("checkout.email")} type="email" value={form.email} onChange={set("email")} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">{t("checkout.shippingAddress")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-white/40 bg-white/80 backdrop-blur p-5">
                <input className={inputCls} placeholder={t("checkout.address")} value={form.street} onChange={set("street")} />
                <input className={inputCls} placeholder={t("checkout.city")} value={form.city} onChange={set("city")} />
                <input className={inputCls} placeholder={t("checkout.postalCode")} value={form.postalCode} onChange={set("postalCode")} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-3">{t("checkout.paymentMethod")}</h2>
              <RadioGroup value="cod">
                <label className="flex items-start gap-3 rounded-2xl border border-[#FF6A1A] bg-[#FFE9DB]/70 p-5 cursor-pointer">
                  <RadioGroupItem value="cod" className="mt-0.5" />
                  <span>
                    <span className="block font-semibold text-gray-800">{t("checkout.cod")}</span>
                    <span className="block text-sm text-gray-500">{t("checkout.codDesc")}</span>
                  </span>
                </label>
              </RadioGroup>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-white/40 bg-white/80 backdrop-blur p-6 shadow-md">
              <h2 className="text-lg font-bold text-gray-800 mb-4">{t("checkout.orderSummary")}</h2>
              <div className="space-y-3 max-h-64 overflow-auto pr-1">
                {cart.map((item) => (
                  <div key={item.variantId} className="flex items-center gap-3">
                    <img src={item.productImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 line-clamp-1">{item.productName}</p>
                      <p className="text-xs text-gray-500">
                        {item.variantSize}
                        {item.variantColor ? ` / ${item.variantColor}` : ""} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {t("common.currency")}
                      {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-sm border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>{t("cart.subtotal")}</span>
                  <span>{t("common.currency")}{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t("cart.shipping")}</span>
                  <span>{t("common.currency")}{shippingFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-800 font-bold text-base">
                  <span>{t("cart.total")}</span>
                  <span className="text-[#FF6A1A]">{t("common.currency")}{total.toLocaleString()}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={placing}
                className="mt-5 w-full px-6 py-3 rounded-full bg-[#FF6A1A] text-white font-semibold hover:bg-[#e0580e] transition shadow-lg shadow-[#FF6A1A]/40 disabled:opacity-60"
              >
                {placing ? t("checkout.placingOrder") : t("checkout.placeOrder")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
