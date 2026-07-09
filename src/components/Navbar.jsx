import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { authContext } from "../Provider/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useContext(authContext);
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 const handleLogOut = () => {
  logOut()
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have successfully logged out.",
        timer: 2000,
        showConfirmButton: false,
        position: "end-end",
        toast: true,
      });
    })
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
    { name: "Home", path: "/" },
    { name: "All Products", path: "/product" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex flex-col items-center relative z-[9999]">

      <nav
        className={`fixed top-4 w-[95%] md:w-[90%] mx-auto z-50 flex items-center justify-between px-6 py-3 rounded-2xl border border-white/20 backdrop-blur-lg shadow-[0_8px_20px_rgba(0,255,255,0.1)] transition-all duration-300 ${
          scrolled ? "bg-white/25" : "bg-white/15"
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
        <NavLink
          to={item.path}
          className="px-2 py-1 rounded-md hover:text-cyan-400 transition"
        >
          {item.name}
        </NavLink>
      </li>
    ))}
  </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <div className="dropdown dropdown-end relative">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={user.photoURL || "https://ibb.co/ZzDnYRsq"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content absolute right-0 mt-3 w-52 p-2 shadow bg-gray-300 rounded-box z-50"
              >
                <li>
                  <span className="justify-between">{user.displayName}</span>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm hover:shadow-md transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-1.5 rounded-full bg-black text-white text-sm hover:shadow-md transition">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <FiMenu
          onClick={() => setShowMenu(true)}
          className="w-6 h-6 text-gray-700 md:hidden cursor-pointer"
        />
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

        <ul className="flex flex-col items-start gap-4 mt-5 px-6 text-lg font-medium">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              onClick={() => setShowMenu(false)}
              className="hover:text-[#F29200]"
            >
              {item.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setShowMenu(false)}>
                <button className="px-4 py-1.5 rounded-full bg-gray-800 text-white text-sm w-full">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={() => {
                  handleLogOut();
                  setShowMenu(false);
                }}
                className="px-4 py-1.5 rounded-full bg-red-600 text-white text-sm w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setShowMenu(false)}>
                <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm w-full">
                  Login
                </button>
              </Link>
              <Link to="/register" onClick={() => setShowMenu(false)}>
                <button className="px-4 py-1.5 rounded-full bg-black text-white text-sm w-full">
                  Register
                </button>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}