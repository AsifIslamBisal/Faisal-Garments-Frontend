import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, CreditCard, PackageCheck, Truck, MousePointer2, Settings2 } from 'lucide-react';

const OrderProcess = () => {
  const onlineSteps = [
    {
      id: 1,
      title: "পণ্য নির্বাচন করুন",
      desc: "আমাদের ওয়েবসাইট থেকে আপনার পছন্দের ইউনিফর্ম, সাইজ এবং কালার সিলেক্ট করুন।",
      icon: <ShoppingBag size={30} />,
      color: "from-[#FF6A1A] to-[#e0580e]"
    },
    {
      id: 2,
      title: "অর্ডার কনফার্ম করুন",
      desc: "কার্টে পণ্য যোগ করে আপনার সঠিক ঠিকানা এবং ফোন নম্বর দিয়ে অর্ডার সম্পন্ন করুন।",
      icon: <MousePointer2 size={30} />,
      color: "from-[#e0580e] to-[#FF6A1A]"
    },
    {
      id: 3,
      title: "পেমেন্ট সম্পন্ন করুন",
      desc: "বিকাশ, নগদ বা কার্ডের মাধ্যমে অথবা ক্যাশ অন ডেলিভারিতে পেমেন্ট নিশ্চিত করুন।",
      icon: <CreditCard size={30} />,
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "কোয়ালিটি যাচাই",
      desc: "আপনার অর্ডার করা পণ্যটি আমাদের টিম দ্বারা নিখুঁতভাবে পরীক্ষা এবং প্যাকিং করা হবে।",
      icon: <Settings2 size={30} />,
      color: "from-rose-500 to-rose-600"
    },
    {
      id: 5,
      title: "প্যাকিং ও প্রসেসিং",
      desc: "সুরক্ষিতভাবে প্যাকিং শেষে আপনার পার্সেলটি আমাদের ডেলিভারি পার্টনারের কাছে হস্তান্তর করা হবে।",
      icon: <PackageCheck size={30} />,
      color: "from-amber-500 to-amber-600"
    },
    {
      id: 6,
      title: "দ্রুত ডেলিভারি",
      desc: "খুব অল্প সময়ের মধ্যে আপনার দোরগোড়ায় পৌঁছে যাবে ফয়সাল গার্মেন্টস-এর প্রিমিয়াম ইউনিফর্ম।",
      icon: <Truck size={30} />,
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFB] py-24 px-6 lg:px-24 font-sans mt-10">
      <div className="max-w-7xl mx-auto">
        

        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#FF6A1A] font-black uppercase tracking-[0.4em] text-[10px]"
          >
            Digital Shopping Experience
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-4 tracking-tighter">
            অনলাইনে অর্ডার করার <span className="text-[#FF6A1A]">নিয়মাবলী</span>
          </h2>
          <div className="mt-6 w-24 h-2 bg-[#FF6A1A] mx-auto rounded-full"></div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {onlineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group bg-white p-1 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="bg-white rounded-[2.8rem] p-10 h-full border border-slate-50 relative z-10 flex flex-col items-center text-center">
                

                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                  {step.icon}
                </div>


                <span className="absolute top-8 right-10 text-slate-100 font-black text-6xl -z-10 group-hover:text-[#e0580e] transition-colors">
                  0{step.id}
                </span>

                <h3 className="text-2xl font-black text-slate-800 mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-semibold leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>


              <div className={`absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r ${step.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
            </motion.div>
          ))}
        </div>


        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-10 bg-[#FF6A1A] rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-[#e0580e]"
        >
          <div className="text-white">
            <h4 className="text-2xl font-black mb-2 ">অর্ডার করতে কোনো সমস্যা হচ্ছে?</h4>
            <p className="text-[#FFE9DB] font-medium">আমাদের হটলাইনে কল করুন, আমরা আপনাকে অর্ডার করতে সাহায্য করব।</p>
          </div>
          <button className="bg-white text-[#e0580e] px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
            কল করুন: +880  1676952977,+880 1820809695
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default OrderProcess;