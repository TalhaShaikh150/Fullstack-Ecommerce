import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group cursor-pointer">
      {/* 1. IMAGE CONTAINER */}
      <div className="relative overflow-hidden mb-4 bg-[#F0F0F0] aspect-[3/4]">
        {/* Main Image */}
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </Link>

        {/* 'Quick Add' Button - Appears on Hover */}
        <button 
          className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-sm translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
          title="Add to Cart"
        >
          <ShoppingBag size={18} strokeWidth={1.5} />
        </button>
        
        {/* Stock Badge */}
        {product.stock === 0 && (
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest px-2 py-1 text-gray-500">
                Sold Out
            </span>
        )}
      </div>

      {/* 2. TEXT DETAILS (Minimalist) */}
      <div className="flex justify-between items-start">
        <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                {product.category}
            </p>
            <Link to={`/product/${product._id}`}>
                <h3 className="text-sm font-medium text-[#1C1C1C] hover:underline decoration-1 underline-offset-4 line-clamp-1">
                    {product.title}
                </h3>
            </Link>
        </div>
        <span className="text-sm font-medium text-[#1C1C1C] ml-4">
            ${product.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;