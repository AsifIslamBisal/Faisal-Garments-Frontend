import React from 'react';
import logo from '../assets/logo.png';
import { FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-12">
        
        
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center mb-4">
            <div className="h- w-20 rounded-lg flex items-center justify-center mr-3 overflow-hidden">
              <img src={logo} alt="Foysal Garments Logo" className="object-contain h-full w-full" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Foysal Garments
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            High-quality school uniforms, dresses, and premium accessories like bags, shoes, and belts for educational institutions.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm border-l-4 border-blue-500 pl-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
            <li><a href="/product" className="hover:text-blue-400 transition-colors">Our Collections</a></li>
            <li><a href="/orderProcess" className="hover:text-blue-400 transition-colors">Order Process</a></li>
            <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm border-l-4 border-blue-500 pl-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="/Contact" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
            <li><a href="/sizeGuide" className="hover:text-blue-400 transition-colors">Size Guide</a></li>
            <li><a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm border-l-4 border-blue-500 pl-3">Contact Us</h3>
          <div className="text-sm space-y-2 text-gray-400">
            <p>Court Station Mor, Rajshahi, Bangladesh</p>
            <p className="font-medium text-blue-400">Phone: +880  1676952977, +880 1820809695</p>
            <p className="">Email: foysolgarments@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        
        <div className="flex justify-center space-x-5 mb-8">
          <a href="#" className="bg-gray-800 p-3 rounded-full hover:scale-110 transition-transform shadow-lg group">
            <FaFacebook size={20} className="text-[#1877F2] group-hover:brightness-125" />
          </a>
          <a 
              href="https://wa.me/8801820809695" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gray-800 p-3 rounded-full hover:scale-110 transition-transform shadow-lg group"
            >
              <FaWhatsapp size={20} className="text-[#25D366] group-hover:brightness-125" />
            </a>
        </div>
        
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-[2px]">Developed By</span>
            <a 
              href="https://www.smartpathshalabd.com" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 bg-gray-700 px-3 py-1 rounded-full border border-gray-800 hover:border-blue-500/50 transition-all group"
            >
              {/*  SIEMS Logo */}
              <div className="h-8 w-8 overflow-hidden rounded-sm">
                <img src="/SIEMS.png" alt="SIEMS Logo" className="h-full w-full object-contain group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-bold text-xs text-gray-200 tracking-tight">SIEMS</span>
            </a>
          </div>
          
          <p className="text-[11px] text-gray-400">&copy; {new Date().getFullYear()} Foysal Garments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;