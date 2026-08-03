import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { UserPlus } from "lucide-react";
import { authContext } from "../../Provider/AuthProvider";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createUser } = useContext(authContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return;

    try {
      setLoading(true);
      await createUser(name, email, password, "", phone);
      Swal.fire({ icon: "success", title: "Account created successfully" });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Foysal Garments | Sign Up</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FFFFFB]">
        <main className="flex-1 pt-28 pb-20 flex items-center justify-center max-w-md mx-auto px-4 w-full">
          <div className="w-full bg-white rounded-2xl border border-[#D9D9D9] p-8 shadow-md space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE9DB] text-[#FF6A1A] flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                U
              </div>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">{t("auth.signUpTitle")}</h1>
              <p className="text-sm text-[#3F3F46]">{t("auth.signUpSubtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3F3F46] mb-1">
                  {t("auth.fullName")} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4D4D4] text-sm text-[#1A1A1A] bg-white focus:border-[#FF6A1A] focus:outline-none"
                  placeholder="Parent Name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3F3F46] mb-1">
                  {t("auth.email")} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4D4D4] text-sm text-[#1A1A1A] bg-white focus:border-[#FF6A1A] focus:outline-none"
                  placeholder="parent@school.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3F3F46] mb-1">
                  {t("auth.phone")}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4D4D4] text-sm text-[#1A1A1A] bg-white focus:border-[#FF6A1A] focus:outline-none"
                  placeholder="+880 1700 000000"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3F3F46] mb-1">
                  {t("auth.password")}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4D4D4] text-sm text-[#1A1A1A] bg-white focus:border-[#FF6A1A] focus:outline-none"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#FF6A1A] text-white font-bold text-sm hover:bg-[#e0580e] transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <UserPlus className="w-4 h-4" />
                <span>{loading ? "Creating..." : t("auth.signUpBtn")}</span>
              </button>
            </form>

            <div className="text-center pt-2 border-t border-[#E0E0E0] text-sm text-[#3F3F46]">
              <p>
                {t("auth.hasAccount")}{" "}
                <Link to="/login" className="font-bold text-[#FF6A1A] hover:underline">
                  {t("auth.signInBtn")}
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
