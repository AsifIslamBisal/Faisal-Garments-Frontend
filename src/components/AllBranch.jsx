import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Search,
  Globe,
  PhoneCall,
  Navigation,
} from "lucide-react";
import nowdapara from "../assets/Branch/Nowdapara.jpg";
import Binodpur from "../assets/Branch/Binodpur.jpeg";

const parseMinutes = (timeStr) => {
  const match = timeStr.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2] || "0", 10);
  if (/PM/i.test(match[3]) && hours !== 12) hours += 12;
  if (/AM/i.test(match[3]) && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

const isBranchOpen = (time) => {
  const [openStr, closeStr] = time.split("-");
  const openMin = parseMinutes(openStr);
  const closeMin = parseMinutes(closeStr);
  if (openMin === null || closeMin === null) return null;
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
  const nowMin = now.getHours() * 60 + now.getMinutes();
  return nowMin >= openMin && nowMin < closeMin;
};

const directionsUrl = (branch) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${branch.area}, ${branch.city}, Bangladesh`
  )}`;

const AllBranch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const branches = [
    {
      id: 1,
      name: "Student Dress Corner",
      city: "Rajshahi",
      area: "RDA Market",
      phone: "01*****",
      time: "10 AM - 9 PM",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=400",
    },
    {
      id: 2,
      name: "Parents Zone",
      city: "Rajshahi",
      area: "Uposhohor",
      phone: "01717851567",
      time: "10 AM - 9 PM",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=400",
    },
    {
      id: 3,
      name: "New Foysal Garments",
      city: "Rajshahi",
      area: "Nowdapara",
      phone: "01799651742",
      time: "9 AM - 8 PM",
      image: nowdapara,
    },
    {
      id: 4,
      name: "New Foysal Garments",
      city: "Rajshahi",
      area: "Binodpur",
      phone: "01973847671",
      time: "10 AM - 8 PM",
      image: Binodpur,
    },
    {
      id: 5,
      name: "School And College Dress Center",
      city: "Chapainawabganj",
      area: "Chapainawabganj",
      phone: "01704995141",
      time: "10 AM - 9 PM",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400",
    },
    {
      id: 6,
      name: "Dress Center",
      city: "Rajshahi",
      area: "Godagari",
      phone: "01867611280",
      time: "9 AM - 8 PM",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400",
    },
    {
      id: 7,
      name: "Dress Center",
      city: "Naogaon",
      area: "Nachole",
      phone: "01735993343",
      time: "10 AM - 9 PM",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400",
    },
    {
      id: 8,
      name: "New Foysal Garments",
      city: "Rajshahi",
      area: "Zinnah Nagar",
      phone: "01758390792",
      time: "10 AM - 9 PM",
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=400",
    },
    {
      id: 9,
      name: "Student Dress Corner",
      city: "Chapainawabganj",
      area: "Shibganj",
      phone: "01******",
      time: "10 AM - 8 PM",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400",
    },
  ];

  const cities = ["All", ...new Set(branches.map((b) => b.city))];

  const filteredBranches = branches.filter((branch) =>
    (selectedCity === "All" || branch.city === selectedCity) &&
    (branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-[#FFFFFB] min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#FFE9DB] text-[#FF6A1A] px-4 py-2 rounded-full text-xs font-bold mb-4">
            <Globe size={14} /> Our Branch Network
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800">
            আমাদের <span className="text-[#FF6A1A]">সকল শাখা</span>
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
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 focus:ring-2 focus:ring-[#FF6A1A] outline-none"
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
                    ? "bg-[#FF6A1A] text-white"
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
            {filteredBranches.map((branch) => {
              const open = isBranchOpen(branch.time);
              const maskedPhone = branch.phone.includes("*");

              return (
                <motion.div
                  key={branch.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="group bg-white rounded-2xl border border-[#ECECEA] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    <img
                      src={branch.image}
                      alt={branch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />

                    <span
                      className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm ${
                        open === null
                          ? "bg-slate-700/80 text-white"
                          : open
                            ? "bg-emerald-500 text-white"
                            : "bg-rose-500 text-white"
                      }`}
                    >
                      <span className="relative flex h-2 w-2">
                        <span
                          className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                            open ? "bg-white" : "bg-white/60"
                          }`}
                        />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                      </span>
                      {open === null ? "Hours vary" : open ? "Open Now" : "Closed"}
                    </span>

                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur text-[11px] font-bold text-slate-800 shadow-sm">
                      <MapPin size={12} className="text-[#FF6A1A]" /> {branch.city}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-slate-800 mb-3">
                      {branch.name}
                    </h2>

                    <div className="space-y-2.5 text-sm text-gray-600 mb-4">
                      <p className="flex items-start gap-2">
                        <MapPin size={15} className="text-[#FF6A1A] mt-0.5 shrink-0" />
                        <span>{branch.area}, {branch.city}</span>
                      </p>

                      <p className="flex items-center gap-2">
                        <Phone size={15} className="text-[#FF6A1A] shrink-0" />
                        <a
                          href={maskedPhone ? undefined : `tel:${branch.phone}`}
                          className={maskedPhone ? "cursor-default" : "hover:text-[#FF6A1A] transition-colors"}
                        >
                          {maskedPhone ? "Number coming soon" : branch.phone}
                        </a>
                      </p>

                      <p className="flex items-center gap-2">
                        <Clock size={15} className="text-[#FF6A1A] shrink-0" />
                        <span>
                          {branch.time}
                          {open !== null && (
                            <span className={`font-semibold ${open ? "text-emerald-600" : "text-rose-500"}`}>
                              {" "}· {open ? "Open now" : "Closed"}
                            </span>
                          )}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0 flex gap-2.5 mt-auto">
                    <a
                      href={maskedPhone ? undefined : `tel:${branch.phone}`}
                      className={`flex-1 bg-[#FF6A1A] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition ${
                        maskedPhone
                          ? "opacity-40 cursor-not-allowed"
                          : "hover:bg-[#e0580e]"
                      }`}
                    >
                      <PhoneCall size={15} /> Call Now
                    </a>
                    <a
                      href={directionsUrl(branch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#FFE9DB] text-[#FF6A1A] py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold border border-[#FF6A1A]/20 hover:bg-[#FF6A1A] hover:text-white transition"
                    >
                      <Navigation size={15} /> Directions
                    </a>
                  </div>
                </motion.div>
              );
            })}
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
