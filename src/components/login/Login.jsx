import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { LogIn, ArrowRight } from "lucide-react";
import { authContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, resetPassword } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      await signIn(email, password);
      Swal.fire({ icon: "success", title: "Login Successful" });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      Swal.fire({ icon: "warning", title: "Enter your email first" });
      return;
    }

    resetPassword(email)
      .then(() => {
        Swal.fire({ icon: "success", title: "Check your email for reset link" });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response?.data?.message || error.message,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Foysal Garments | Sign In</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-[#FFFFFB]">
        <main className="flex-1 pt-28 pb-20 flex items-center justify-center max-w-md mx-auto px-4 w-full">
          <div className="w-full bg-white rounded-2xl border border-[#D9D9D9] p-8 shadow-md space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE9DB] text-[#FF6A1A] flex items-center justify-center mx-auto mb-3 font-bold text-xl">
                U
              </div>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">{t("auth.signInTitle")}</h1>
              <p className="text-sm text-[#3F3F46]">{t("auth.signInSubtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#3F3F46] mb-1">
                  {t("auth.email")}
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
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#3F3F46] mb-1">
                    {t("auth.password")}
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-semibold text-[#FF6A1A] mb-1 hover:underline cursor-pointer"
                  >
                    {t("auth.forgotPassword")}
                  </button>
                </div>
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
                <LogIn className="w-4 h-4" />
                <span>{loading ? "Signing in..." : t("auth.signInBtn")}</span>
              </button>
            </form>

            <div className="text-center pt-2 border-t border-[#E0E0E0] space-y-2 text-sm text-[#3F3F46]">
              <p>
                {t("auth.noAccount")}{" "}
                <Link to="/register" className="font-bold text-[#FF6A1A] hover:underline">
                  {t("auth.signUpBtn")}
                </Link>
              </p>
              <p>
                <Link to="/checkout" className="text-[#3F3F46] hover:underline">
                  {t("auth.guestProceed")}{" "}
                  <ArrowRight className="w-3.5 h-3.5 inline" />
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
