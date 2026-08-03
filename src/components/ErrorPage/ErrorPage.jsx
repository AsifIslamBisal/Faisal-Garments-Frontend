import Lottie from "lottie-react";
import Anime from "../../assets/lottie/error.json";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const LottieComponent = Lottie.default || Lottie;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#FFFFFB] px-6 py-12 gap-10">
      <div className="max-w-md space-y-4">
        <h1 className="text-6xl font-extrabold text-[#FF6A1A]">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-[#FF6A1A] text-white px-6 py-2 rounded-lg hover:bg-[#e0580e] cursor-pointer"
        >
          Go Back Home
        </button>
      </div>

      <div className="w-80 lg:w-96">
        {LottieComponent && Anime ? (
          <LottieComponent animationData={Anime} loop={true} />
        ) : (
          <p>Loading Animation...</p>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
