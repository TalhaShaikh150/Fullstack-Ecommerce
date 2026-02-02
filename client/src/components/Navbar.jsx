import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Bell,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  ArrowRight,
  Truck,
  RefreshCw,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutApiMutation } from "../services/users";
import { logout } from "../services/authSlice";
import { motion, AnimatePresence } from "framer-motion";

// --- SUB-COMPONENT: ANIMATED ANNOUNCEMENT BAR ---
const AnnouncementBar = () => {
  const messages = [
    {
      text: "Free Express Shipping on Orders over $200",
      icon: <Truck size={14} />,
    },
    { text: "New Season Drop: The Urban Collection", icon: <Zap size={14} /> },
    { text: "30-Day Hassle-Free Returns", icon: <RefreshCw size={14} /> },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white h-10 flex items-center justify-center overflow-hidden relative z-[51]">
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

// --- MAIN NAVBAR COMPONENT ---
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
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

      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm/50 backdrop-blur-md bg-white/95 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            
            {/* LOGO (Updated Font) */}
            <Link
              to="/"
              className="flex items-center gap-2 flex-shrink-0 group"
            >
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-display font-bold italic text-xl shadow-lg group-hover:bg-[#EF4444] group-hover:rotate-3 transition-all duration-300">
                M
              </div>
              {/* Used .font-display here for the bold look */}
              <span className="text-2xl font-display font-bold tracking-tighter text-black hidden sm:block">
                MERN<span className="text-[#EF4444]">.</span>
              </span>
            </Link>

            {/* SEARCH BAR */}
            <div
              className={`hidden md:flex flex-1 max-w-2xl relative transition-all duration-300 ${isSearchFocused ? "scale-[1.01]" : "scale-100"}`}
            >
              <div
                className={`w-full flex items-center bg-gray-100 rounded-full border transition-all duration-300 overflow-hidden ${isSearchFocused ? "bg-white border-black shadow-xl ring-4 ring-gray-100" : "border-transparent"}`}
              >
                <button className="px-5 py-3 border-r border-gray-200 text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-black hover:bg-gray-50 transition-colors flex items-center gap-2 bg-gray-50/50 font-display">
                  All <ChevronDown size={12} />
                </button>

                <input
                  type="text"
                  placeholder="Search for streetwear, sneakers..."
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="flex-1 bg-transparent border-none text-sm font-medium px-4 py-3 outline-none placeholder:text-gray-400 font-sans"
                />

                <button className="pr-4 pl-2 text-gray-400 hover:text-black transition-colors">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* ICONS & ACTIONS */}
            <div className="flex items-center gap-2 md:gap-4">
              
              <button className="hidden md:flex w-10 h-10 items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-black">
                <Bell size={20} strokeWidth={2} />
              </button>

              <Link
                to="/cart"
                className="relative w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors group"
              >
                <ShoppingBag
                  size={22}
                  strokeWidth={2}
                  className="text-gray-900"
                />
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm group-hover:scale-110 transition-transform">
                  2
                </span>
              </Link>

              {/* USER PROFILE */}
              <div className="relative">
                {userInfo ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 hover:bg-gray-50 rounded-full p-1 pr-3 transition-colors border border-gray-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-tr from-gray-700 to-black rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {userInfo.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold truncate max-w-[80px] hidden md:block">
                        {userInfo.name.split(" ")[0]}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`text-gray-400 hidden md:block transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-12 w-60 bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 z-50 overflow-hidden"
                        >
                          <div className="px-4 py-3 bg-gray-50/80 rounded-xl mb-2">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                              Signed In As
                            </p>
                            <p className="text-sm font-bold text-black truncate">
                              {userInfo.email}
                            </p>
                          </div>

                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-all"
                          >
                            <User size={16} /> My Profile
                          </Link>
                          <Link
                            to="/orders"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-all"
                          >
                            <ShoppingBag size={16} /> Orders
                          </Link>

                          <div className="h-[1px] bg-gray-100 my-1"></div>

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all text-left"
                          >
                            <LogOut size={16} /> Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-3">
                    <Link
                      to="/login"
                      className="px-5 py-2.5 text-xs font-bold uppercase tracking-wide border-2 border-gray-200 rounded-full hover:border-black transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-5 py-2.5 text-xs font-bold uppercase tracking-wide bg-black text-white rounded-full hover:bg-[#EF4444] transition-colors shadow-lg shadow-gray-200"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-black hover:bg-gray-100 rounded-full"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          <div className="md:hidden mt-4 relative group">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-100 text-sm font-medium px-10 py-3 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
            />
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black"
            />
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "circOut" }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] p-6 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                {/* Updated Font here too */}
                <span className="text-2xl font-display font-black italic tracking-tighter">
                  MENU
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-8 p-5 bg-gray-50 rounded-2xl flex items-center gap-4 border border-gray-100">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {userInfo ? userInfo.name.charAt(0) : <User />}
                </div>
                <div>
                  {userInfo ? (
                    <>
                      <p className="font-bold text-sm text-black">
                        {userInfo.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">
                        {userInfo.email}
                      </p>
                    </>
                  ) : (
                    <p className="font-bold text-sm text-gray-400">
                      Guest User
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                {["New Arrivals", "Men", "Women", "Sale", "Support"].map(
                  (item) => (
                    <Link
                      key={item}
                      to="/"
                      className="flex justify-between items-center text-lg font-bold text-gray-600 hover:text-black hover:bg-gray-50 p-3 rounded-xl transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                      <ArrowRight size={16} className="text-gray-300" />
                    </Link>
                  ),
                )}
              </div>

              <div className="mt-auto pt-6 space-y-4">
                {userInfo ? (
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-50 text-red-500 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                  >
                    <LogOut size={18} /> Log Out
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-4 text-center border-2 border-gray-200 rounded-xl font-bold uppercase text-xs hover:border-black transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-4 text-center bg-black text-white rounded-xl font-bold uppercase text-xs hover:bg-[#EF4444] transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;