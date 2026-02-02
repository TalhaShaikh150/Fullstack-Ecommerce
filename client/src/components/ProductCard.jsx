import { Link } from "react-router-dom";
import { Plus, Check, ShoppingBag } from "lucide-react"; // Added Check icon
import { useDispatch } from "react-redux";
import { addToCart } from "../services/cartSlice";
import { useState } from "react"; // Added state for animation
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false); // State to handle button animation
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // 1. Redux Action
    dispatch(addToCart(product));
    
    // 2. Toast Notification
    toast.success(`${product.title} added`, {
        style: {
            background: '#111',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: 'bold'
        },
        iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
        },
    });

    // 3. Button Animation (Flip to Checkmark)
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="group relative">
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[3/4] bg-[#F4F4F5] rounded-[1.5rem] overflow-hidden mb-4 border border-transparent group-hover:border-gray-200 transition-all">
        
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </Link>
        
        {/* Discount Tag */}
        <div className="absolute top-3 left-3 bg-[#EF4444] text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest rounded-full shadow-sm">
          Sale
        </div>

        {/* --- THE INTERACTIVE BUTTON --- */}
        <button 
          onClick={handleAddToCart}
          disabled={isAdded} // Prevent double clicks while animating
          className={`absolute bottom-3 right-3 w-12 h-12 flex items-center justify-center rounded-full shadow-xl transition-all duration-300 z-20
            ${isAdded 
              ? "bg-green-500 text-white scale-110"  // Success State
              : "bg-white text-black hover:bg-[#111] hover:text-white hover:scale-110 active:scale-95" // Default State
            }
          `}
        >
          {/* Animated Icon Swap */}
          <div className="relative w-6 h-6 flex items-center justify-center">
             <span className={`absolute transition-all duration-300 ${isAdded ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`}>
                <Plus size={24} strokeWidth={2} />
             </span>
             <span className={`absolute transition-all duration-300 ${isAdded ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`}>
                <Check size={24} strokeWidth={3} />
             </span>
          </div>
        </button>

        {/* Hover Overlay (Optional: Makes text clearer if image is busy) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      </div>

      {/* TEXT DETAILS */}
      <div className="px-1">
        <div className="flex justify-between items-start mb-1">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
             {product.category || "Collection"}
           </p>
           {/* Mock Colors */}
           <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
           </div>
        </div>

        <Link to={`/product/${product._id}`}>
           <h3 className="font-display font-bold text-base text-[#111] leading-tight truncate capitalize group-hover:text-[#EF4444] transition-colors">
             {product.title}
           </h3>
        </Link>

        <div className="flex items-center gap-3 mt-2">
           <span className="font-black text-lg text-[#111]">${product.price}</span>
           <span className="text-xs text-gray-400 line-through font-medium">
             ${(product.price * 1.2).toFixed(2)}
           </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;