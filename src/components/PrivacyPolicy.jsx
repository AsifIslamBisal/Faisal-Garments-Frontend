import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Globe, ArrowLeft, Mail, ChevronRight, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "৫ এপ্রিল, ২০২৬";

  const policySections = [
    {
      id: 1,
      title: "ডাটা সংগ্রহ",
      subtitle: "Data Collection",
      icon: <Eye className="text-violet-500" />,
      desc: "আমরা আপনার নাম, ফোন নম্বর এবং সঠিক ইউনিফর্ম তৈরির জন্য প্রয়োজনীয় শারীরিক মাপ সংগ্রহ করি। ব্রাউজিং অভিজ্ঞতা উন্নত করতে সামান্য কুকিজ ব্যবহৃত হতে পারে।"
    },
    {
      id: 2,
      title: "তথ্যের গোপনীয়তা",
      subtitle: "Data Security",
      icon: <Lock className="text-rose-500" />,
      desc: "আপনার দেওয়া প্রতিটি তথ্য আমাদের এনক্রিপ্টেড ডাটাবেজে সংরক্ষিত থাকে। অননুমোদিত কোনো ব্যক্তি আপনার তথ্যে প্রবেশ করতে পারবে না।"
    },
    {
      id: 3,
      title: "তৃতীয় পক্ষ",
      subtitle: "Third Party Sharing",
      icon: <Globe className="text-sky-500" />,
      desc: "আমরা আপনার ডাটা কোনো বিজ্ঞাপন সংস্থার কাছে বিক্রি করি না। শুধুমাত্র ডেলিভারি পার্টনারদের (যেমন কুরিয়ার) সাথে প্রয়োজনীয় তথ্য শেয়ার করা হয়।"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 pb-20">
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-30">
        
        <div className="max-w-3xl mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[2px] w-12 bg-black"></div>
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Legal Document</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6"
          >
            গোপনীয়তা <span className="text-transparent bg-clip-text bg-blue-600">নীতিমালা</span>
          </motion.h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            আপনার তথ্যের সুরক্ষা আমাদের কাছে সর্বোচ্চ অগ্রাধিকার। আমাদের সেবা ব্যবহারের সময় আপনার ডাটা কীভাবে ব্যবহৃত হয় তা এখানে বিস্তারিত জানানো হলো।
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {policySections.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-1">{item.title}</h3>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">{item.subtitle}</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
                "{item.desc}"
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-slate-300"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <FileText size={16} className="text-indigo-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Legal Agreement</span>
              </div>
              <h2 className="text-3xl font-black mb-6 leading-tight">মেজারমেন্ট এবং রিটার্ন পলিসি সম্পর্কে স্পষ্ট ধারণা</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-slate-400 text-sm leading-relaxed">অনলাইনে দেওয়া মেজারমেন্ট গাইড অনুযায়ী অর্ডার করলে তা কাস্টম-মেড হিসেবে গণ্য হয়।</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-slate-400 text-sm leading-relaxed">সেলাইয়ের ক্ষেত্রে সামান্য (১-২ সেমি) তারতম্য হতে পারে যা আন্তর্জাতিক মানের অন্তর্ভুক্ত।</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem]">
              <h4 className="text-lg font-bold mb-4">আমাদের সাথে যোগাযোগ</h4>
              <p className="text-slate-400 text-sm mb-6 font-medium">পলিসি সংক্রান্ত যেকোনো জিজ্ঞাসায় আমাদের এক্সপার্ট টিমের সাথে কথা বলুন।</p>
              <a 
                href="mailto:foysolgarments@gmail.com" 
                className="flex items-center justify-between w-full bg-white text-slate-900 px-6 py-4 rounded-2xl font-black text-sm group transition-all hover:bg-indigo-600 hover:text-white"
              >
                ইমেইল করুন <Mail size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;