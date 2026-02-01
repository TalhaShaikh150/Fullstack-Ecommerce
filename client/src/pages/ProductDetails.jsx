import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../services/product";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
  // 1. Get the ID from the URL (e.g., /product/123 -> id = 123)
  const { id } = useParams();

  // 2. Fetch data for this ID
  const { data: product, isLoading, error } = useGetSingleProductQuery(id);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Product not found</div>;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="container mx-auto px-6 py-12 md:py-20">
        
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 transition">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        {/* LAYOUT: Left Image, Right Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: Image */}
          <div className="bg-gray-100 aspect-square rounded-xl overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT: Info */}
          <div className="flex flex-col justify-center">
            <span className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">
              {product.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-serif text-[#1C1C1C] mb-4">
              {product.title}
            </h1>

            <p className="text-2xl font-medium text-gray-900 mb-8">
              ${product.price}
            </p>

            <p className="text-gray-600 leading-relaxed mb-8 max-w-md">
              {product.description}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">
              <button className="flex-1 bg-[#1C1C1C] text-white py-4 px-8 font-bold uppercase tracking-widest hover:bg-[#FF4E00] transition-colors flex items-center justify-center gap-3">
                <ShoppingBag size={20} />
                Add to Cart
              </button>
            </div>
            
            {/* Stock Indicator */}
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;