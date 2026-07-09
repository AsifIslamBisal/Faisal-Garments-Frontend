import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroVideo from "../../assets/herovideo/herovideo.mp4";

const HeroSection = () => {
  const headings = [
    "শীর্ষ মানের ইনস্টিটিউট ড্রেস তৈরি",
    "আপনার স্বপ্নের ইউনিফর্ম বাস্তবায়ন",
    "আরামদায়ক এবং স্টাইলিশ পোশাক",
  ];

  const subTexts = [
    "আমরা নিশ্চিত করি যে প্রতিটি ড্রেস মান, আরাম এবং স্টাইলের দিক থেকে শ্রেষ্ঠ।",
    "ইনস্টিটিউটের জন্য কাস্টমাইজড ইউনিফর্ম যা প্রতিটি ছাত্রের জন্য নিখুঁত।",
    "আপনার প্রতিষ্ঠানকে বিশেষ ও প্রফেশনাল লুক দেওয়ার জন্য আমাদের দক্ষ টিম প্রস্তুত।",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMainTitle, setShowMainTitle] = useState(true);

  useEffect(() => {
    const mainTitleTimeout = setTimeout(() => {
      setShowMainTitle(false);
    }, 4000);

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

      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <AnimatePresence>
          {showMainTitle && (
            <motion.h1
              key="main-title"
              className="text-yellow-400 text-3xl md:text-5xl font-extrabold mb-8 leading-snug"
              variants={mainTitleVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              বাংলাদেশের উন্নততম বৃহত্তম শিক্ষা প্রতিষ্ঠানের পোশাক তৈরির
              কারখানায় Foysal Garments আপনাকে স্বাগতম
            </motion.h1>
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
              <h2 className="text-cyan-400 text-4xl md:text-6xl font-bold mb-4">
                {headings[currentIndex]}
              </h2>
              <p className="text-white text-lg md:text-2xl max-w-2xl mx-auto">
                {subTexts[currentIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
