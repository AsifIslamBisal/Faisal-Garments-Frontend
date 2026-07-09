import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Search,
  Globe,
  PhoneCall,
} from "lucide-react";
import nowdapara from '../assets/Branch/Nowdapara.jpg'
import Binodpur from '../assets/Branch/Binodpur.jpeg'

const AllBranch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const branches = [
    { id: 1, name: "Student Dress Corner", city: "Rajshahi", area: "RDA Market", phone: "01*****", time: "10 AM - 9 PM", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400" },
    { id: 2, name: "Parents Zone", city: "Rajshahi", area: "Uposhohor", phone: "01717851567", time: "10 AM - 9 PM", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400" },
    { id: 3, name: "New Foysal Garments ", city: "Rajshahi", area: "Nowdapara", phone: "01799651742", time: "9 AM - 8 PM", image: nowdapara },
    { id: 4, name: "New Foysal Garments", city: "Rajshahi", area: "Binodpur", phone: "01973847671", time: "10 AM - 8 PM", image: Binodpur},
    { id: 5, name: "School And College Dress Center", city: "Chapainawabganj", area: "Chapainawabganj", phone: "01704995141", time: "10 AM - 9 PM", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400" },
    { id: 6, name: " Dress Center", city: "Rajshahi", area: "Godagari", phone: "01867611280", time: "9 AM - 8 PM", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400" },
    { id: 7, name: "Dress Center ", city: "Naogaon", area: "Nachole", phone: "01735993343", time: "10 AM - 9 PM", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400" },
    { id: 8, name: "New Foysal Garments ", city: "Rajshahi", area: "zinnah nogor", phone: "01758390792", time: "10 AM - 9 PM", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400" },
    { id: 9, name: "Student Dress Corner", city: "Chapainawabganj", area: "Shibganj", phone: "01******", time: "10 AM - 8 PM", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400" },
  ];

  const cities = ["All", ...new Set(branches.map((b) => b.city))];

  const filteredBranches = branches.filter((branch) =>
    (selectedCity === "All" || branch.city === selectedCity) &&
    (branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-bold mb-4">
            <Globe size={14} /> Our Branch Network
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800">
            আমাদের <span className="text-blue-600">সকল শাখা</span>
          </h1>
          <p className="text-slate-500 mt-3">
            মোট শাখা: {filteredBranches.length}
          </p>
        </div>


        <div className="bg-white p-5 rounded-3xl shadow-md mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search branch..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>


          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  selectedCity === city
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredBranches.map((branch) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
              >
                <div className="overflow-hidden h-48 w-full">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={branch.image}
                    alt={branch.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-lg font-bold text-slate-800 mb-2">
                    {branch.name}
                  </h2>

                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                    <MapPin size={14} /> {branch.area}
                  </p>

                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                    <Phone size={14} /> {branch.phone}
                  </p>

                  <p className="text-sm text-gray-500 flex items-center gap-2 mb-4">
                    <Clock size={14} /> {branch.time}
                  </p>


                  <a
                    href={`tel:${branch.phone}`}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition font-semibold"
                  >
                    <PhoneCall size={16} /> Call Now
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>


        {filteredBranches.length === 0 && (
          <div className="text-center mt-20 text-gray-400">
            No branch found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBranch;