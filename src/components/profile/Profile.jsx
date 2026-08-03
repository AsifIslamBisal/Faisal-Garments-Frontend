import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Plus, Trash2, Edit2, CheckCircle2 } from "lucide-react";
import { catalogApi } from "../../api/catalogApi";
import useAuth from "../../hooks/useAuth";
import AvatarUpload from "./AvatarUpload";
import AddressForm from "./AddressForm";

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [savingInfo, setSavingInfo] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addingAddress, setAddingAddress] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const { data: me, refetch } = useQuery({
    queryKey: ["me", user?.email],
    enabled: !!user,
    queryFn: catalogApi.getMe,
  });

  const profile = me?.user;
  const addresses = profile?.addresses || [];

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
    }
  }, [profile]);

  if (!user) {
    return (
      <div className="pt-40 pb-20 px-4 min-h-screen text-center">
        <p className="text-lg font-semibold text-[#1A1A1A]">{t("profile.signInToView")}</p>
        <Link
          to="/login"
          className="inline-block mt-6 px-8 py-3 rounded-xl bg-[#FF6A1A] text-white font-semibold hover:bg-[#e0580e] transition"
        >
          {t("nav.signIn")}
        </Link>
      </div>
    );
  }

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSavePersonalInfo = async (e) => {
    e.preventDefault();
    setSavingInfo(true);
    try {
      await catalogApi.updateMe({ name, phone: phone || "" });
      refetch();
      showToast(t("profile.savedSuccessfully"));
    } catch (err) {
      console.error("Failed to update personal info", err);
    } finally {
      setSavingInfo(false);
    }
  };

  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file (PNG, JPG, WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size must be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      setUploading(true);
      setUploadError(null);
      try {
        await catalogApi.updateMe({ photo: reader.result });
        refetch();
        showToast(t("profile.savedSuccessfully"));
      } catch (err) {
        console.error("Failed to upload avatar", err);
        setUploadError("Failed to upload image");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = async () => {
    setUploading(true);
    setUploadError(null);
    try {
      await catalogApi.updateMe({ photo: "" });
      refetch();
      showToast(t("profile.savedSuccessfully"));
    } catch (err) {
      console.error("Failed to remove avatar", err);
      setUploadError("Failed to remove avatar");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAddress = async (addr) => {
    let next = editingAddress
      ? addresses.map((a) => (a.id === addr.id ? addr : a))
      : [...addresses, addr];
    if (addr.isDefault) {
      next = next.map((a) => ({ ...a, isDefault: a.id === addr.id }));
    }
    try {
      await catalogApi.updateMe({ addresses: next });
      refetch();
      setEditingAddress(null);
      setAddingAddress(false);
      showToast(t("profile.savedSuccessfully"));
    } catch (err) {
      console.error("Failed to save address", err);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await catalogApi.updateMe({ addresses: addresses.filter((a) => a.id !== id) });
      refetch();
      showToast(t("profile.savedSuccessfully"));
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      await catalogApi.updateMe({ addresses: addresses.map((a) => ({ ...a, isDefault: a.id === id })) });
      refetch();
      showToast(t("profile.savedSuccessfully"));
    } catch (err) {
      console.error("Failed to set default address", err);
    }
  };

  const inputCls =
    "w-full px-3.5 py-2.5 rounded-xl border border-[#ECECEA] text-sm text-[#1A1A1A] focus:border-[#FF6A1A] focus:outline-none";

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen bg-[#FFFFFB]">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A]">{t("profile.title")}</h1>

        {toastMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        )}

        <AvatarUpload
          currentPhoto={profile?.photo || user.photo || ""}
          userName={name || user.name}
          uploading={uploading}
          error={uploadError}
          onFileSelected={handleAvatarFile}
          onRemove={handleRemoveAvatar}
        />

        <div className="bg-white rounded-2xl border border-[#ECECEA] p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#1A1A1A] pb-3 border-b border-[#ECECEA]">
            {t("profile.personalInfo")}
          </h3>

          <form onSubmit={handleSavePersonalInfo} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  {t("checkout.fullName")}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1">
                  {t("checkout.phone")}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-1">
                {t("checkout.email")}
              </label>
              <input type="email" value={email} disabled className={`${inputCls} opacity-60 cursor-not-allowed`} />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={savingInfo}
                className="px-6 py-2.5 rounded-xl bg-[#FF6A1A] text-white font-semibold text-xs hover:bg-[#e0580e] transition-colors shadow-xs cursor-pointer disabled:opacity-50"
              >
                {savingInfo ? t("profile.saving") : t("profile.saveChanges")}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-[#ECECEA] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECECEA]">
            <h3 className="font-bold text-base text-[#1A1A1A]">{t("profile.savedAddresses")}</h3>
            {!addingAddress && !editingAddress && (
              <button
                onClick={() => setAddingAddress(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FFE9DB] text-[#FF6A1A] font-bold text-xs hover:bg-[#FF6A1A] hover:text-white transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t("profile.addAddress")}</span>
              </button>
            )}
          </div>

          {addingAddress || editingAddress ? (
            <AddressForm
              initialAddress={editingAddress || undefined}
              onSave={handleSaveAddress}
              onCancel={() => {
                setAddingAddress(false);
                setEditingAddress(null);
              }}
            />
          ) : addresses.length === 0 ? (
            <p className="text-xs text-[#6B6B6B] text-center py-6">{t("profile.noAddresses")}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-4 rounded-xl border border-[#ECECEA] bg-[#FAFAF9] space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#1A1A1A] flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#FF6A1A]" />
                        {addr.fullName}
                      </span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FFE9DB] text-[#FF6A1A] font-bold text-[10px]">
                          {t("profile.defaultBadge")}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#1A1A1A]">
                      {addr.street}, {addr.city}
                      {addr.postalCode ? ` ${addr.postalCode}` : ""}
                    </p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">{addr.phone}</p>
                  </div>

                  <div className="pt-3 border-t border-[#ECECEA] flex items-center justify-between text-xs font-semibold">
                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-[#6B6B6B] hover:text-[#FF6A1A] cursor-pointer"
                      >
                        {t("profile.makeDefault")}
                      </button>
                    )}
                    <div className="flex items-center gap-3 ml-auto">
                      <button
                        onClick={() => setEditingAddress(addr)}
                        className="text-[#6B6B6B] hover:text-[#1A1A1A] p-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
