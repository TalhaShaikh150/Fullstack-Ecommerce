import Hero from "../components/Hero"; // Assuming you saved the new Hero here
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../services/product"; // Your API Hook
import { ArrowRight, ArrowLeft, Shirt, Watch, ShoppingBag, Monitor, Briefcase, Zap, Timer } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Home = () => {
  // 1. Fetch Real Data
  const { data: products, isLoading, error } = useGetProductsQuery();

  // Categories Data
  const categories = [
    { name: "Apparel", icon: <Shirt size={20}/> },
    { name: "Tech", icon: <Monitor size={20}/> },
    { name: "Accessories", icon: <Briefcase size={20}/> },
    { name: "Timepieces", icon: <Watch size={20}/> },
    { name: "Footwear", icon: <ShoppingBag size={20}/> },
    { name: "View All", icon: <div className="grid grid-cols-2 gap-0.5"><div className="w-1.5 h-1.5 bg-current rounded-full"/><div className="w-1.5 h-1.5 bg-current rounded-full"/><div className="w-1.5 h-1.5 bg-current rounded-full"/><div className="w-1.5 h-1.5 bg-current rounded-full"/></div> },
  ];

  return (
    <>
    <div className="bg-white min-h-screen pb-20 font-sans">      
      {/* Hero is already bold and styled */}
      <Hero />

      {/* ================= CATEGORIES (Modern Pill Style) ================= */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-lg font-black uppercase tracking-tighter">Shop By Category</h3>
           <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition">View All</a>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-6 py-4 bg-[#F5F5F7] rounded-2xl cursor-pointer min-w-[140px] group hover:bg-black hover:text-white transition-colors duration-300"
                >
                    <div className="text-gray-500 group-hover:text-white transition-colors">
                        {cat.icon}
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide whitespace-nowrap">{cat.name}</span>
                </motion.div>
            ))}
        </div>
      </div>

  
      {/* ================= NEW ARRIVALS (Full Grid) ================= */}
      <div className="container mx-auto px-4 py-12">
         <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-8 bg-[#EF4444]"></div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-[#111]">
               Just Dropped
            </h2>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {!isLoading && products.allProducts?.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
         </div>
      </div>
    </div>
<Footer/>
</>
  );
};

export default Home;