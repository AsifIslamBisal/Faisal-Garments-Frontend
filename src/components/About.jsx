import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, Briefcase, Quote, Star, History } from 'lucide-react';
import image1 from '../assets/image1.jpg'
import Founder from '../assets/Founder.jpeg'

const AboutUs = () => {
  const stats = [
    { id: 1, label: "প্রতিষ্ঠানের সেবা", value: "২,৫০০+", icon: <Briefcase className="text-[#FF6A1A]" /> },
    { id: 2, label: "অভিজ্ঞতা", value: "৩৫+ বছর", icon: <History className="text-amber-500" /> },
    { id: 3, label: "দক্ষ কারিগর", value: "7০০+", icon: <Users className="text-rose-500" /> },
    { id: 4, label: "সাফল্যের হার", value: "১০০%", icon: <Star className="text-emerald-500" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFB] font-sans selection:bg-[#FFE9DB] md:mt-5 mt-14 overflow-x-hidden">
      <section className="py-12 md:py-20 px-4 md:px-10 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5 relative"
          >
            <div className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden border-[8px] md:border-[16px] border-slate-50 shadow-2xl">
              <img 
                src={Founder} 
                alt="Founder of Foysal Garments" 
                className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-2 md:-bottom-8 md:-right-8 bg-[#FF6A1A] text-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl z-20">
              <p className="text-[10px] md:text-sm font-bold opacity-80 uppercase tracking-tighter">যাত্রা শুরু</p>
              <h4 className="text-2xl md:text-4xl font-black italic">১৯৮৯</h4>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5 space-y-6 md:space-y-8"
          >
            <div className="space-y-4 text-center lg:text-left">
              <h4 className="justify-center lg:justify-start text-[#FF6A1A] font-black uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-8 h-[2px] bg-[#FF6A1A]"></span> Founder's Message
              </h4>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                আমাদের ঐতিহ্যের <br /> <span className="text-[#FF6A1A] text-4xl md:text-6xl">সাড়ে তিন দশক</span>
              </h2>
            </div>

            <div className="relative p-6 md:p-6 italic bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] border-l-8 border-[#FF6A1A] text-slate-600 leading-relaxed font-medium">
              <Quote className="absolute top-4 right-0 text-slate-200 hidden md:block " size={40} />
              "১৯৮৯ সালে ছোট্ট একটি স্বপ্ন নিয়ে আমাদের যাত্রা শুরু হয়েছিল। আমাদের লক্ষ্য ছিল বাংলাদেশের শিক্ষা প্রতিষ্ঠানগুলোতে এমন মানের ইউনিফর্ম সরবরাহ করা, যা হবে দীর্ঘস্থায়ী, আরামদায়ক এবং যা শিক্ষার্থীদের মধ্যে শৃঙ্খলার প্রতিফলন ঘটাবে। আজ ২,৫০০টিরও বেশি প্রতিষ্ঠানের ভালোবাসা আমাদের এই অবস্থানে নিয়ে এসেছে।"
              <div className="mt-4 ">
                <h5 className="font-bold text-slate-900 text-lg">Arif All Mashud Faruquy</h5>
                <p className="text-xs md:text-sm font-bold text-[#e0580e] uppercase">ফাউন্ডার ও ম্যানেজিং ডিরেক্টর</p>
              </div>
            </div>

            <div className="space-y-6 text-slate-500 font-medium leading-relaxed">
              <p className="text-sm md:text-base">
                ফয়সাল গার্মেন্টস-এর যাত্রা শুরু হয়েছিল অত্যন্ত বিনয় ও কঠোর পরিশ্রমের সাথে। তৎকালীন সময়ে মানসম্মত ইউনিফর্মের অভাব পূরণ করতেই আমরা আমাদের আধুনিক প্রোডাকশন লাইনের কাজ শুরু করি।
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['২,৫০০+ শিক্ষা প্রতিষ্ঠানের আস্থা', '৩৫ বছরের দীর্ঘ অভিজ্ঞতা', 'উন্নত ও আরামদায়ক ফেব্রিক', 'সারা বাংলাদেশে শক্তিশালী নেটওয়ার্ক'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-800 font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="relative py-16 md:pt-24 md:pb-20 px-4 md:px-10 lg:px-24 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-[#FFE9DB] text-[#e0580e] px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Briefcase size={14} /> Who We Are
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-6">
              আমরা সেরা মানের <span className="text-[#FF6A1A]">ইউনিফর্ম</span> নিশ্চিত করি
            </h1>
            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed italic">
              "দীর্ঘ ৩৫ বছর ধরে আমরা বাংলাদেশের নামী-দামী শিক্ষা প্রতিষ্ঠান এবং কর্পোরেট অফিসগুলোতে প্রিমিয়াম মানের ইউনিফর্ম সরবরাহ করে আসছি। আমাদের লক্ষ্য শুধু পোশাক তৈরি নয়, বরং একটি ব্র্যান্ডের সঠিক পরিচয় ও শৃঙ্খলা তুলে ধরা। দেশের সীমানা ছাড়িয়ে এখন আমাদের তৈরি এই গুণগত মানের ইউনিফর্ম বিদেশের মাটিতেও পৌঁছে যাচ্ছে।"
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white">
              <img 
                src={image1} 
                alt="Our Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl">
              <h4 className="text-2xl md:text-3xl font-black text-[#FF6A1A]">১০০%</h4>
              <p className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">কোয়ালিটি গ্যারান্টি</p>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-16 px-4 md:px-10 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat) => (
            <motion.div 
              whileHover={{ y: -5 }}
              key={stat.id} 
              className="p-5 md:p-8 bg-white border border-slate-200 rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-slate-100 text-center"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-slate-400 text-[10px] md:text-sm font-bold tracking-wide uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-16 md:py-24 px-4 md:px-10 bg-slate-900 text-white rounded-[2rem] md:rounded-[4rem] mx-2 md:mx-10 mb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">কেন আমাদের <span className="text-[#e0580e]">বেছে নেবেন?</span></h2>
            <p className="text-slate-400 text-sm md:text-base font-medium">আমাদের কাজের প্রতিটি ধাপে আমরা নিখুঁত মান বজায় রাখি।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: "সেরা ফেব্রিক", desc: "আমরা আরামদায়ক এবং টেকসই ফেব্রিক ব্যবহার করি যা ধোয়ার পরেও নতুনের মতো থাকে।" },
              { title: "নিখুঁত ফিটিং", desc: "আমাদের আধুনিক সাইজ গাইড এবং অভিজ্ঞ দর্জিদের মাধ্যমে পারফেক্ট ফিটিং নিশ্চিত করি।" },
              { title: "দ্রুত ডেলিভারি", desc: "সারা বাংলাদেশে আমাদের ২০টি শাখার মাধ্যমে নির্দিষ্ট সময়ের মধ্যে ডেলিভারি প্রদান করি।" }
            ].map((item, idx) => (
              <div key={idx} className="space-y-4 text-center md:text-left">
                <div className="w-10 h-10 bg-[#FF6A1A] rounded-full flex items-center justify-center font-black text-white mx-auto md:mx-0">
                  {idx + 1}
                </div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6A1A]/10 rounded-full blur-[100px]"></div>
      </section>
      <section className="py-16 md:py-20 px-4 max-w-4xl mx-auto text-center">
        <CheckCircle size={40} className="text-[#FF6A1A] mx-auto mb-6 md:mb-8" />
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 uppercase tracking-widest">আমাদের লক্ষ্য</h2>
        <p className="text-slate-500 text-lg md:text-xl leading-relaxed italic px-2">
          "আমরা চাই বাংলাদেশের প্রতিটি শিক্ষার্থীর পোশাক হবে আরামদায়ক এবং আভিজাত্যপূর্ণ। আগামী ৫ বছরের মধ্যে আমরা সারা বাংলাদেশে আমাদের সেবাকে আরও বিস্তৃত করতে কাজ করে যাচ্ছি।"
        </p>
      </section>

    </div>
  );
};

export default AboutUs;