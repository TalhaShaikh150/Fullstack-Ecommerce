import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useDispatch } from "react-redux";
// import { addToCart } from "../services/cartSlice; // Ensure this path is correct

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Logic to handle "Original Price" (If API doesn't have it, we fake a 20% markup for the 'Sale' look)
  const originalPrice = product.originalPrice || (product.price * 1.2).toFixed(2);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Stop Link navigation
    dispatch(addToCart(product));
  };

  return (
    <div className="group relative">
      
      {/* 1. IMAGE CONTAINER */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#F3F4F6]">
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-10 bg-[#EF4444] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
          -{discount}%
        </div>

        {/* Wishlist Button (Visible on Hover) */}
        <button className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full text-gray-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Heart size={16} />
        </button>

        {/* Main Image */}
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>

        {/* Quick Add Button (Slides up on Hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} /> Add to Bag
          </button>
        </div>
      </div>

      {/* 2. PRODUCT DETAILS */}
      <div className="mt-4 space-y-1">
        
        {/* Category & Rating */}
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {product.category || "Collection"}
          </p>
          <div className="flex items-center gap-1 text-yellow-500 text-[10px] font-bold">
            <Star size={10} fill="currentColor" /> 4.8
          </div>
        </div>

        {/* Title */}
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-bold text-[#111] truncate group-hover:text-[#EF4444] transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-lg font-black text-[#111]">
            ${product.price}
          </span>
          <span className="text-xs text-gray-400 line-through font-medium">
            ${originalPrice}
          </span>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;