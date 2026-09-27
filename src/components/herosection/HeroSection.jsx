import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import heroVideo from "../../assets/herovideo/herovideo.mp4";

const HeroSection = () => {
  const { t } = useTranslation();

  const headings = [
    t("hero.title"),
    "আপনার স্বপ্নের ইউনিফর্ম বাস্তবায়ন",
    "আরামদায়ক এবং স্টাইলিশ পোশাক",
  ];

  const subTexts = [
    t("hero.subtitle"),
    "ইনস্টিটিউটের জন্য কাস্টমাইজড ইউনিফর্ম যা প্রতিটি ছাত্রের জন্য নিখুঁত।",
    "আপনার প্রতিষ্ঠানকে বিশেষ ও প্রফেশনাল লুক দেওয়ার জন্য আমাদের দক্ষ টিম প্রস্তুত।",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMainTitle, setShowMainTitle] = useState(true);

  useEffect(() => {
    const mainTitleTimeout = setTimeout(() => {
      setShowMainTitle(false);
    }, 5000);

    return () => clearTimeout(mainTitleTimeout);
  }, []);

  useEffect(() => {
    if (!showMainTitle) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % headings.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showMainTitle]);

  const mainTitleVariant = {
    hidden: { opacity: 0, y: 60, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.5 },
    },
    exit: {
      opacity: 0,
      y: -60,
      transition: { duration: 1 },
    },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <AnimatePresence>
          {showMainTitle && (
            <motion.div
              key="main-title"
              variants={mainTitleVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center"
            >
              <span className="px-5 py-1.5 rounded-full bg-yellow-400 text-gray-900 text-sm font-bold tracking-wide uppercase shadow-lg">
                {t("hero.season")}
              </span>
              <h1 className="mt-5 text-white text-4xl md:text-6xl font-extrabold leading-snug drop-shadow-lg">
                {t("hero.title")}
              </h1>
              <p className="mt-4 text-white/90 text-lg md:text-xl max-w-2xl drop-shadow">
                {t("hero.subtitle")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!showMainTitle && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={textVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <span className="px-5 py-1.5 rounded-full bg-yellow-400 text-gray-900 text-sm font-bold tracking-wide uppercase shadow-lg">
                {t("hero.season")}
              </span>
              <h2 className="text-[#FF6A1A] text-4xl md:text-6xl font-bold mb-4 mt-5 drop-shadow-lg">
                {headings[currentIndex]}
              </h2>
              <p className="text-white text-lg md:text-2xl max-w-2xl mx-auto drop-shadow">
                {subTexts[currentIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to="/shop"
            className="px-8 py-3.5 rounded-full bg-[#FF6A1A] text-white font-semibold hover:bg-[#e0580e] transition shadow-xl shadow-[#FF6A1A]/40"
          >
            {t("hero.cta")} →
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3.5 rounded-full bg-white/15 backdrop-blur border border-white/50 text-white font-semibold hover:bg-white/25 transition"
          >
            {t("hero.exploreCategories")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
