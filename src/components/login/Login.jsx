import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginAnimi from "../../assets/lottie/login.json";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import { authContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, resetPassword } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const LottieComponent = Lottie.default || Lottie;

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Email & Password required",
      });
      return;
    }

    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  const handleForgotPassword = () => {
    const email = document.querySelector('input[name="email"]').value;

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Enter your email first",
      });
      return;
    }

    resetPassword(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Check your Gmail for reset link",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Foysal Garments | Sign In</title>
      </Helmet>

      <div className="min-h-screen bg-white px-4 md:px-8 flex items-start md:items-center justify-center pt-20 md:pt-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 md:gap-12 w-full max-w-6xl">
          <div className="w-full md:w-1/2 flex justify-center">
            <LottieComponent
              animationData={loginAnimi}
              loop={true}
              className="w-[280px] md:w-[350px] lg:w-[450px] xl:w-[520px]"
            />
          </div>

          <div className="bg-white w-full md:w-1/2 max-w-md p-6 rounded-2xl ">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <label className="text-sm font-semibold">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  className="w-full px-3 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <span
                  className="absolute top-[38px] right-3 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </span>

                <p
                  onClick={handleForgotPassword}
                  className="text-xs text-blue-500 mt-1 cursor-pointer hover:underline"
                >
                  Forgot password?
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <input
                  disabled={disabled}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg cursor-pointer hover:bg-blue-700"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>

            <p className="text-center mt-4 text-sm">
              New Here?
              <Link to="/register" className="text-blue-600 ml-1">
                Create an account
              </Link>
            </p>

            <div className="my-4 border-t text-center text-sm text-gray-400">
              OR
            </div>

            <div className="flex justify-center">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
