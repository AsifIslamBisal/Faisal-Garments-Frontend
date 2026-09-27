import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX, FiShoppingCart, FiGlobe, FiUser } from "react-icons/fi";
import { UserCheck, Package, LogOut, ChevronDown } from "lucide-react";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { authContext } from "../Provider/AuthProvider";
import { useCartContext } from "../Provider/CartProvider";

export default function Navbar() {
  const { user, logOut } = useContext(authContext);
  const { itemCount } = useCartContext();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    const parts = user.name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0][0].toUpperCase();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "bn" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("fg_lang", next);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          timer: 2000,
          showConfirmButton: false,
          position: "end-end",
          toast: true,
        });
        console.error(error);
      });
  };

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.shop"), path: "/shop" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const navLinkCls = ({ isActive }) =>
    `px-2 py-1 rounded-md transition ${isActive ? "text-[#FF6A1A] font-semibold" : "hover:text-[#e0580e]"}`;

  return (
    <div className="flex flex-col items-center relative z-[9999]">
      <nav
        className={`fixed top-4 w-[95%] md:w-[90%] mx-auto z-50 flex items-center justify-between px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-lg shadow-[0_8px_20px_rgba(0,255,255,0.1)] transition-all duration-300 ${
          scrolled ? "bg-white/40" : "bg-white/15"
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-12" />
          <span className="text-lg font-bold text-gray-800">Foysal Garments</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center text-gray-800 font-medium absolute left-1/2 -translate-x-1/2">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <NavLink to={item.path} className={navLinkCls}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="hidden md:flex gap-3 items-center">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/40 hover:bg-white/70 border border-white/50 text-sm font-semibold text-gray-700 transition"
            title="Language"
          >
            <FiGlobe /> {i18n.language === "en" ? "বাংলা" : "EN"}
          </button>

          <Link to="/cart" className="relative p-2 rounded-full hover:bg-white/40 transition" aria-label={t("nav.cart")}>
            <FiShoppingCart className="w-6 h-6 text-gray-700" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF6A1A] text-white text-xs flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen((v) => !v)}
                className="flex items-center space-x-1.5 p-1.5 rounded-full hover:bg-white/40 transition-colors border border-[#ECECEA] cursor-pointer focus:outline-none"
                aria-expanded={profileDropdownOpen}
                aria-label="Account menu"
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFE9DB] text-[#FF6A1A] font-bold text-xs flex items-center justify-center">
                    {getUserInitials()}
                  </div>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-[#6B6B6B] hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#ECECEA] py-2 z-20">
                    <div className="px-4 py-2 border-b border-[#ECECEA]">
                      <p className="text-sm font-semibold text-[#1A1A1A] truncate">{user.name}</p>
                      <p className="text-xs text-[#6B6B6B] truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#FAFAF9] transition-colors"
                    >
                      <UserCheck className="w-4 h-4 text-[#6B6B6B]" />
                      {t("nav.myProfile")}
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#FAFAF9] transition-colors"
                    >
                      <Package className="w-4 h-4 text-[#6B6B6B]" />
                      {t("nav.myOrders")}
                    </Link>

                    <div className="border-t border-[#ECECEA] mt-1 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleLogOut();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        {t("nav.signOut")}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-1.5 rounded-full bg-[#FF6A1A] text-white text-sm hover:bg-[#e0580e] hover:shadow-md transition">
                  {t("nav.signIn")}
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-1.5 rounded-full bg-[#FF6A1A] text-white text-sm hover:bg-[#e0580e] hover:shadow-md transition">
                  {t("nav.signUp")}
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link to="/cart" className="relative p-1" aria-label={t("nav.cart")}>
            <FiShoppingCart className="w-6 h-6 text-gray-700" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF6A1A] text-white text-xs flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <FiMenu
            onClick={() => setShowMenu(true)}
            className="w-6 h-6 text-gray-700 cursor-pointer"
          />
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          showMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setShowMenu(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-black z-[9999] shadow-lg transform transition-transform duration-300 md:hidden ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-300">
          <span className="text-lg font-bold">Foysal Garments</span>
          <FiX
            className="w-6 h-6 text-gray-600 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>

        <div className="px-5 pt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">Language</span>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF6A1A] text-white text-sm font-semibold"
          >
            <FiGlobe /> {i18n.language === "en" ? "বাংলা" : "English"}
          </button>
        </div>

        <ul className="flex flex-col items-start gap-4 mt-5 px-6 text-lg font-medium">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              onClick={() => setShowMenu(false)}
              className="hover:text-[#FF6A1A]"
            >
              {item.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <Link to="/profile" onClick={() => setShowMenu(false)} className="flex items-center gap-2 hover:text-[#FF6A1A]">
                <FiUser /> {t("nav.myProfile")}
              </Link>
              <Link to="/orders" onClick={() => setShowMenu(false)} className="flex items-center gap-2 hover:text-[#FF6A1A]">
                <FiShoppingCart /> {t("nav.myOrders")}
              </Link>
              <Link to="/dashboard" onClick={() => setShowMenu(false)}>
                <button className="px-4 py-1.5 rounded-full bg-[#FF6A1A] text-white text-sm w-full">
                  {t("nav.dashboard")}
                </button>
              </Link>
              <button
                onClick={() => {
                  handleLogOut();
                  setShowMenu(false);
                }}
                className="px-4 py-1.5 rounded-full bg-red-600 text-white text-sm w-full"
              >
                {t("nav.signOut")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setShowMenu(false)}>
                <button className="px-4 py-1.5 rounded-full bg-[#FF6A1A] text-white text-sm w-full">
                  {t("nav.signIn")}
                </button>
              </Link>
              <Link to="/register" onClick={() => setShowMenu(false)}>
                <button className="px-4 py-1.5 rounded-full bg-[#FF6A1A] text-white text-sm w-full">
                  {t("nav.signUp")}
                </button>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
