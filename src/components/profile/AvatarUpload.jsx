import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Upload, Trash2, Loader2 } from "lucide-react";

export default function AvatarUpload({
  currentPhoto,
  userName,
  uploading = false,
  error = null,
  onFileSelected,
  onRemove,
}) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const getInitials = () => {
    if (!userName) return "U";
    const parts = userName.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0][0].toUpperCase();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-[#ECECEA]">
      <div className="relative">
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt={userName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#FFE9DB] shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FFE9DB] text-[#FF6A1A] font-bold text-2xl sm:text-3xl flex items-center justify-center border-2 border-[#FFE9DB]">
            {getInitials()}
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}
      </div>

      <div className="flex-1 text-center sm:text-left space-y-3">
        <div>
          <h4 className="font-bold text-base text-[#1A1A1A]">{t("profile.avatar")}</h4>
          <p className="text-xs text-[#6B6B6B] mt-0.5">
            Upload a clear photo for your profile avatar. Allowed formats: PNG, JPG (Max 5MB).
          </p>
        </div>

        {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              onFileSelected(e);
              e.target.value = "";
            }}
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF6A1A] text-white font-semibold text-xs hover:bg-[#e0580e] transition-colors shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Upload className="w-3.5 h-3.5" />
            {currentPhoto ? t("profile.changeAvatar") : t("profile.uploadAvatar")}
          </button>

          {currentPhoto && (
            <button
              type="button"
              onClick={onRemove}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAFAF9] text-red-600 border border-[#ECECEA] hover:bg-red-50 font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
              {t("profile.removeAvatar")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
