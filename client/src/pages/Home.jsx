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
</>
  );
};

export default Home;