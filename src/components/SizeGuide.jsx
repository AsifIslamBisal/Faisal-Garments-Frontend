import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler, Shirt, Scissors, Snowflake, CheckCircle } from 'lucide-react';

const SizeGuide = () => {
  const [activeTab, setActiveTab] = useState('boys');

  const tabs = [
    { id: 'boys', label: 'ছেলেদের ইউনিফর্ম (Shirt & Pant)', icon: <Shirt size={18} /> },
    { id: 'girls', label: 'মেয়েদের ইউনিফর্ম (Kamiz & Pajama)', icon: <Scissors size={18} /> },
    { id: 'winter', label: 'শীতকালীন পোশাক (Sweater/Cardigan)', icon: <Snowflake size={18} /> },
  ];

  const measurementTips = [
    { id: 1, title: 'Chest (বুক)', desc: 'বগলের ঠিক নিচ থেকে ফিতা দিয়ে বুকের চারপাশ মাপুন।' },
    { id: 2, title: 'Shoulder (কাঁধ)', desc: 'এক কাঁধের হাড় থেকে অন্য কাঁধের হাড় পর্যন্ত মাপুন।' },
    { id: 3, title: 'Length (লম্বা)', desc: 'কাঁধের উঁচু অংশ থেকে ড্রেসের নিচ পর্যন্ত লম্বা মাপুন।' },
  ];

  const sizeData = {
    boys: [
      { size: '20', chest: '24"', shoulder: '10"', sLength: '16"', waist: '18-20"', pLength: '22"' },
      { size: '24', chest: '28"', shoulder: '12"', sLength: '18"', waist: '22-24"', pLength: '28"' },
      { size: '28', chest: '32"', shoulder: '13.5"', sLength: '22"', waist: '26-28"', pLength: '34"' },
      { size: '32', chest: '36"', shoulder: '15.5"', sLength: '26"', waist: '30-32"', pLength: '38"' },
      { size: '36', chest: '40"', shoulder: '17.5"', sLength: '28"', waist: '34-36"', pLength: '40"' },
      { size: '40', chest: '44"', shoulder: '19"', sLength: '30"', waist: '38-40"', pLength: '42"' },
    ],
    girls: [
      { size: '20', chest: '22"', shoulder: '9"', kLength: '20"', waist: '18"', pLength: '20"' },
      { size: '24', chest: '26"', shoulder: '11"', kLength: '26"', waist: '22"', pLength: '28"' },
      { size: '28', chest: '30"', shoulder: '13"', kLength: '32"', waist: '26"', pLength: '34"' },
      { size: '32', chest: '34"', shoulder: '14.5"', kLength: '38"', waist: '30"', pLength: '38"' },
      { size: '36', chest: '38"', shoulder: '16"', kLength: '42"', waist: '34"', pLength: '40"' },
      { size: '40', chest: '42"', shoulder: '18"', kLength: '46"', waist: '38"', pLength: '42"' },
    ],
    winter: [
      { label: 'XS', chest: '26"', shoulder: '10.5"', length: '18"' },
      { label: 'S', chest: '30"', shoulder: '12"', length: '21"' },
      { label: 'M', chest: '36"', shoulder: '14.5"', length: '24"' },
      { label: 'L', chest: '40"', shoulder: '17"', length: '27"' },
      { label: 'XL', chest: '44"', shoulder: '19"', length: '30"' },
    ]
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 py-12 px-4 md:px-8 mt-14">
      <div className="max-w-6xl mx-auto">
        

        <header className="text-center mb-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-widest mb-4">
            OFFICIAL GARMENTS GUIDE
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">সঠিক মাপ ও সাইজ গাইড</h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">আপনার শিক্ষা প্রতিষ্ঠানের ইউনিফর্মের নিখুঁত ফিটিং নিশ্চিত করতে নিচের নির্দেশিকাটি অনুসরণ করুন।</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-100 border border-slate-100">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-slate-900">
                <Ruler className="text-blue-600" /> কিভাবে মাপ নিবেন?
              </h3>
              
              <div className="space-y-8">
                {measurementTips.map((tip) => (
                  <div key={tip.id} className="relative pl-10">
                    <span className="absolute left-0 top-0 w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-lg shadow-blue-200">
                      {tip.id}
                    </span>
                    <h4 className="font-bold text-slate-800 mb-1">{tip.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-xs text-amber-500 leading-relaxed font-medium">
                  <span className="font-bold">* বি.দ্র:</span> সঠিক মাপের জন্য দয়া করে মেজারমেন্ট টেপ ব্যবহার করুন এবং সরাসরি শরীরের ওপর মাপ নিন।
                </p>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-8">
            <nav className="flex flex-wrap gap-2 mb-8 bg-slate-100/50 p-1.5 rounded-2xl w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>


            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-[2rem] shadow-xl shadow-slate-100 border border-slate-100 overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/80 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Size / Class</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Chest (বুক)</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Shoulder (কাঁধ)</th>
                        <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                          {activeTab === 'winter' ? 'Length' : activeTab === 'boys' ? 'Shirt Len.' : 'Kamiz Len.'}
                        </th>
                        {activeTab !== 'winter' && (
                          <>
                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Waist (কোমর)</th>
                            <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Pant Len.</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {sizeData[activeTab].map((row, i) => (
                        <tr key={i} className="hover:bg-blue-50/30 transition-colors group font-medium">
                          <td className="px-6 py-5">
                            <span className="block text-slate-900 font-bold">{row.size || row.label}</span>
                          </td>
                          <td className="px-6 py-5 text-center text-slate-600">{row.chest}</td>
                          <td className="px-6 py-5 text-center text-slate-600">{row.shoulder}</td>
                          <td className="px-6 py-5 text-center text-slate-600">{row.sLength || row.kLength || row.length}</td>
                          {activeTab !== 'winter' && (
                            <>
                              <td className="px-6 py-5 text-center text-slate-600 ">{row.waist}</td>
                              <td className="px-6 py-5 text-center text-blue-600 font-bold">{row.pLength}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-6 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-green-600">
                    <CheckCircle size={14} /> আমাদের সকল সাইজ স্ট্যান্ডার্ড মেজারমেন্টে তৈরি
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Unit: All Measurements in Inches (")</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;