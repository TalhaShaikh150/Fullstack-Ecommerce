import { Link } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // 1. Detect Scroll for "Shopify Style" State Change
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Dynamic Text Color Class
  const textColor = isScrolled ? "text-black" : "text-white";
  const hoverColor = isScrolled ? "hover:text-gray-600" : "hover:text-gray-300";

  return (
    <>
      {/* 2. ANNOUNCEMENT BAR (Disappears on scroll) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ height: 40, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-black text-white text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center justify-center overflow-hidden"
          >
            <span>Complimentary Shipping on Orders Over $200</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN NAVBAR */}
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "top-0 bg-white shadow-sm py-4 border-b border-gray-100" 
            : "top-10 bg-black py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* === LEFT: MENU & SEARCH === */}
          <div className={`flex items-center gap-6 ${textColor}`}>
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="md:hidden"
            >
              <Menu strokeWidth={1.5} size={24} />
            </button>
            <button className={`hidden md:flex items-center gap-2 text-sm font-medium tracking-wide group ${hoverColor} transition`}>
              <Search strokeWidth={1.5} size={18} />
              <span className="hidden lg:block">Search</span>
            </button>
          </div>

          {/* === CENTER: LOGO === */}
          <Link to="/" className={`absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center group ${textColor}`}>
            <span className="text-2xl md:text-3xl font-bold tracking-tighter uppercase font-sans">
              Mern<span className={isScrolled ? "text-gray-400" : "text-gray-300"}>.</span>
            </span>
          </Link>

          {/* === RIGHT: ACCOUNTS & CART === */}
          <div className={`flex items-center gap-6 ${textColor}`}>
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase">
              {['Shop', 'About', 'Journal'].map((item) => (
                <Link key={item} to="/" className={`relative group ${hoverColor} transition`}>
                  {item}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-black' : 'bg-white'}`}></span>
                </Link>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-current opacity-20 hidden md:block"></div>

            <Link to="/login" className={`hidden md:block ${hoverColor} transition`}>
              <User strokeWidth={1.5} size={22} />
            </Link>

            <Link to="/cart" className={`relative ${hoverColor} transition`}>
              <ShoppingBag strokeWidth={1.5} size={22} />
              <span className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${isScrolled ? "bg-black" : "bg-white"}`}></span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY (Simplified) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-[60] text-white p-8 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <span className="text-2xl font-bold uppercase">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={30} /></button>
          </div>
          <div className="flex flex-col gap-6 text-2xl font-light">
            <Link to="/">Shop</Link>
            <Link to="/">New Arrivals</Link>
            <Link to="/">Account</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;