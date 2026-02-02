import { motion } from "framer-motion";
import { useEffect } from "react";

const PreloaderLiquid = ({ finishLoading }) => {
  useEffect(() => {
    const timeout = setTimeout(finishLoading, 2000);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
    >
      <div className="relative">
        {/* Outline Logo */}
        <h1 className="text-8xl font-black italic tracking-tighter text-transparent" 
            style={{ WebkitTextStroke: "2px #E5E5E5" }}>
          MERN.
        </h1>

        {/* Filling Logo */}
        <motion.div 
          className="absolute top-0 left-0 overflow-hidden"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
           <h1 className="text-8xl font-black italic tracking-tighter text-black whitespace-nowrap">
             MERN.
           </h1>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PreloaderLiquid;