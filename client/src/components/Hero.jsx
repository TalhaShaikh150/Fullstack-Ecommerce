import { motion } from "framer-motion";
import { ArrowUpRight, ShoppingBag, Star, Zap } from "lucide-react";

const HeroBento = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[650px]">
        
        {/* =========================================================
            1. MAIN BLOCK (Left - 2x2 Size)
        ========================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 md:row-span-2 bg-[#F5F5F7] rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden group flex flex-col justify-between"
        >
           {/* Background Grid Pattern (Technical Feel) */}
           <div className="absolute inset-0 opacity-[0.03]" 
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
           </div>

           {/* Floating Badge */}
           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-gray-200">
                <Zap size={14} className="text-[#EF4444] fill-current" />
                <span className="text-xs font-black uppercase tracking-widest text-gray-800">
                  New Season Drop
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-[#111] leading-[0.9] tracking-tighter mix-blend-darken">
                URBAN <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-orange-600">
                  LEGACY.
                </span>
              </h1>
           </div>

           {/* Call to Action */}
           <div className="relative z-10 mt-8 md:mt-0">
             <p className="text-gray-500 font-medium max-w-xs mb-8 leading-relaxed">
               Redefining street culture with bold silhouettes and premium materials.
             </p>
             <button className="bg-[#111] text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#EF4444] hover:scale-105 transition-all shadow-xl shadow-gray-300/50 flex items-center gap-2 group/btn">
                Shop Collection 
                <ArrowUpRight size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
             </button>
           </div>

           {/* Main Image with Glow Effect */}
           <div className="absolute right-0 bottom-0 h-[85%] w-[60%] pointer-events-none">
              {/* Glow behind image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gray-400 rounded-full blur-[100px] opacity-20"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop" 
                alt="Streetwear Model" 
                className="w-full h-full object-contain object-bottom mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
              />
           </div>
        </motion.div>


        {/* =========================================================
            2. TOP RIGHT BLOCK (Black - Accessories)
        ========================================================== */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#111] rounded-[2.5rem] p-8 relative overflow-hidden group cursor-pointer"
        >
           <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                 <h3 className="text-white text-3xl font-black uppercase italic tracking-tighter">
                   Access-<br/>ories
                 </h3>
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <ArrowUpRight size={20} />
                 </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md self-start px-4 py-2 rounded-lg border border-white/10">
                 <p className="text-gray-300 text-xs font-bold uppercase tracking-widest">
                   +40 New Items
                 </p>
              </div>
           </div>

           {/* Image */}
           <img 
             src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop" 
             className="absolute -right-4 -bottom-8 w-40 md:w-48 object-contain rotate-12 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 ease-out" 
             alt="Watch"
           />
        </motion.div>


        {/* =========================================================
            3. BOTTOM RIGHT BLOCK (Red - Sale Animation)
        ========================================================== */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#EF4444] rounded-[2.5rem] relative overflow-hidden group cursor-pointer flex flex-col items-center justify-center"
        >
           {/* Background Marquee Text */}
           <div className="absolute inset-0 flex flex-col justify-center opacity-10 pointer-events-none select-none overflow-hidden">
              <div className="whitespace-nowrap animate-marquee text-6xl font-black uppercase italic -rotate-12 scale-150">
                 SALE SALE SALE SALE SALE SALE SALE SALE
              </div>
              <div className="whitespace-nowrap animate-marquee text-6xl font-black uppercase italic -rotate-12 scale-150 mt-4">
                 SALE SALE SALE SALE SALE SALE SALE SALE
              </div>
           </div>

           <div className="relative z-10 text-center text-white scale-100 group-hover:scale-110 transition-transform duration-300">
              <div className="flex justify-center mb-2">
                 <Star fill="white" size={32} className="animate-spin-slow" />
              </div>
              <h3 className="text-7xl font-black leading-none tracking-tighter">
                50%
              </h3>
              <p className="font-bold uppercase tracking-[0.3em] text-sm mt-2 border-t border-white/30 pt-2 inline-block">
                Season Finale
              </p>
           </div>
           
           {/* Overlay on hover */}
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroBento;