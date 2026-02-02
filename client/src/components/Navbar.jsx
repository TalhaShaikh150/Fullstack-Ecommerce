import { Link, useNavigate } from "react-router-dom";
import {
  Search, ShoppingBag, Bell, Menu, X, User, LogOut, 
  ChevronDown, ArrowRight, Truck, Zap, RefreshCw, Trash2, Plus, Minus,
  Heart
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutApiMutation } from "../services/users";
import { logout } from "../services/authSlice";
import { removeFromCart, decreaseCart, addToCart, getTotals } from "../services/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. ANNOUNCEMENT BAR ---
const AnnouncementBar = () => {
  const messages = [
    { text: "Free Express Shipping on Orders over $200", icon: <Truck size={14} /> },
    { text: "New Season Drop: The Urban Collection", icon: <Zap size={14} /> },
    { text: "30-Day Hassle-Free Returns", icon: <RefreshCw size={14} /> },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % messages.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white h-10 flex items-center justify-center overflow-hidden relative z-[60]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest font-display"
        >
          {messages[index].icon}
          {messages[index].text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- 2. CART DRAWER COMPONENT ---
const CartDrawer = ({ isOpen, onClose }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[80] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="text-xl font-black italic tracking-tighter uppercase font-display">
                Bag <span className="text-[#EF4444]">({cart.cartItems.length})</span>
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400"><ShoppingBag size={32} /></div>
                  <p className="text-gray-500 font-medium">Your bag is empty.</p>
                  <button onClick={onClose} className="text-sm font-bold border-b-2 border-black pb-1 hover:text-[#EF4444] hover:border-[#EF4444] transition-colors">Start Shopping</button>
                </div>
              ) : (
                cart.cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-black line-clamp-2 leading-tight">{item.title}</h3>
                          <button onClick={() => dispatch(removeFromCart(item))} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 rounded-lg h-8">
                          <button onClick={() => dispatch(decreaseCart(item))} className="px-2 hover:bg-gray-50 h-full flex items-center"><Minus size={12}/></button>
                          <span className="px-2 text-xs font-bold">{item.cartQuantity}</span>
                          <button onClick={() => dispatch(addToCart(item))} className="px-2 hover:bg-gray-50 h-full flex items-center"><Plus size={12}/></button>
                        </div>
                        <span className="font-bold text-sm">${(item.price * item.cartQuantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Subtotal</span>
                  <span className="text-xl font-black font-display">${cart.cartTotalAmount}</span>
                </div>
                <Link to="/checkout" onClick={onClose} className="w-full bg-[#111] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#EF4444] transition-colors flex items-center justify-center gap-2">
                  Checkout <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- 3. SEARCH OVERLAY COMPONENT ---
const SearchOverlay = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-xl flex flex-col"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Search Store</span>
             <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><X size={24} /></button>
          </div>

          <div className="flex-1 flex flex-col pt-10 px-6">
            <div className="w-full max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-black w-8 h-8" strokeWidth={2} />
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="WHAT ARE YOU LOOKING FOR?" 
                  className="w-full pl-12 pr-4 py-4 text-2xl md:text-4xl font-black uppercase font-display bg-transparent border-b-2 border-gray-200 focus:border-[#EF4444] outline-none placeholder:text-gray-300"
                />
              </div>
              
              <div className="mt-10">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">Trending Searches</span>
                <div className="flex flex-wrap gap-3">
                  {['Oversized Tees', 'Sneakers', 'Cargo Pants', 'Hoodies'].map((tag) => (
                    <button key={tag} className="px-5 py-2 bg-gray-100 rounded-full text-sm font-bold hover:bg-black hover:text-white transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- 4. MAIN NAVBAR ---
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [isSearchOpen, setIsSearchOpen] = useState(false); 

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutApiMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AnnouncementBar />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm/50 backdrop-blur-md bg-white/95 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-2 md:gap-8">
            
            {/* 1. LEFT: LOGO */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-black rounded-lg md:rounded-xl flex items-center justify-center text-white font-display font-bold italic text-lg md:text-xl shadow-lg group-hover:bg-[#EF4444] group-hover:rotate-3 transition-all duration-300">
                M
              </div>
              <span className="text-xl md:text-2xl font-display font-bold tracking-tighter text-black hidden sm:block">
                MERN<span className="text-[#EF4444]">.</span>
              </span>
            </Link>

            {/* 2. CENTER: DESKTOP SEARCH */}
            <div className="hidden md:flex flex-1 max-w-xl justify-center">
               <button 
                 onClick={() => setIsSearchOpen(true)}
                 className="flex items-center gap-3 w-full bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 hover:border-gray-300 hover:shadow-sm transition-all group"
               >
                 <Search size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                 <span className="text-sm text-gray-400 font-medium">Search products...</span>
                 <div className="ml-auto flex items-center gap-1 text-[10px] font-bold text-gray-300 border border-gray-200 rounded px-1.5 py-0.5">
                    ⌘K
                 </div>
               </button>
            </div>

            {/* 3. RIGHT: ACTIONS (Mobile & Desktop) */}
            <div className="flex items-center gap-1 md:gap-4">
              
              {/* Search Icon (Mobile Only) */}
              <button onClick={() => setIsSearchOpen(true)} className="md:hidden p-2 text-black hover:bg-gray-100 rounded-full">
                <Search size={22} strokeWidth={2} />
              </button>

              {/* Cart Toggle */}
              <button 
                onClick={() => setIsCartOpen(true)} 
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group"
              >
                <ShoppingBag size={22} strokeWidth={2} className="text-gray-900" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* USER PROFILE / LOGIN (Visible on Mobile & Desktop) */}
              <div className="relative">
                {userInfo ? (
                  // LOGGED IN: Show Avatar -> Dropdown
                  <div className="relative">
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 pr-2 transition-colors border border-transparent md:border-gray-200"
                    >
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-transparent group-hover:ring-gray-200">
                         {userInfo.name.charAt(0).toUpperCase()}
                      </div>
                      <ChevronDown size={14} className={`text-gray-400 hidden md:block transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown */}
                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-12 w-60 bg-white border
                           border-gray-100 shadow-xl rounded-xl p-2 z-[60]"
                        >
                          <div className="px-4 py-3 bg-gray-50/80 rounded-lg mb-2">
                             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Signed In As {userInfo.name}</p>
                             <p className="text-sm font-bold text-black truncate"></p>
                             <p className="text-sm font-bold text-black truncate">{userInfo.email}</p>
                          </div>
                          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-all"><User size={16} /> My Profile</Link>
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all text-left"><LogOut size={16} /> Sign Out</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // LOGGED OUT: Show Icon (Mobile) or Buttons (Desktop)
                  <>
                    <Link to="/login" className="md:hidden p-2 text-black hover:bg-gray-100 rounded-full">
                       <User size={22} strokeWidth={2} />
                    </Link>
                    <div className="hidden md:flex items-center gap-3">
                      <Link to="/login" className="px-5 py-2.5 text-xs font-bold uppercase tracking-wide border-2 border-gray-200 rounded-full hover:border-black transition-colors">Login</Link>
                      <Link to="/signup" className="px-5 py-2.5 text-xs font-bold uppercase tracking-wide bg-black text-white rounded-full hover:bg-[#EF4444] transition-colors shadow-lg shadow-gray-200">Sign Up</Link>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Trigger (Only for Links now) */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-black hover:bg-gray-100 rounded-full"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER (LINKS ONLY) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-xs bg-white z-[70] p-6 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-display font-black italic tracking-tighter">MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
              </div>

              <div className="flex flex-col space-y-4">
                {['New Arrivals', 'Men', 'Women', 'Sale'].map(item => (
                   <Link key={item} to="/" className="text-lg font-bold hover:text-[#EF4444] transition-colors border-b border-gray-50 pb-2">{item}</Link>
                ))}
              </div>
              
              {/* Extra Mobile Actions */}
              <div className="mt-auto pt-6">
                 <Link to="/profile" className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-4"><Heart size={16} /> Wishlist</Link>
                 <Link to="/" className="flex items-center gap-2 text-sm font-bold text-gray-500"><Truck size={16} /> Order Tracking</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;