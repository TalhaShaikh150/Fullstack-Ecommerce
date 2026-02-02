import { useParams, Link } from "react-router-dom";
import { useGetSingleProductQuery } from "../services/product";
import { ShoppingBag, ArrowLeft, Star, Truck, ShieldCheck, Share2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../services/cartSlice";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

// Simple Skeleton Component
const Skeleton = () => (
  <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
    <div className="bg-gray-100 aspect-[4/5] rounded-2xl animate-pulse"></div>
    <div className="space-y-6 pt-10">
      <div className="h-4 bg-gray-100 w-1/4 rounded animate-pulse"></div>
      <div className="h-12 bg-gray-100 w-3/4 rounded animate-pulse"></div>
      <div className="h-6 bg-gray-100 w-full rounded animate-pulse"></div>
      <div className="h-16 bg-gray-100 w-full rounded animate-pulse mt-8"></div>
    </div>
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, isLoading, error } = useGetSingleProductQuery(id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to bag", {
      style: { background: '#333', color: '#fff' },
      iconTheme: { primary: '#EF4444', secondary: '#fff' },
    });
  };

  if (isLoading) return <Skeleton />;
  if (error) return <div className="text-center py-20 text-red-500 font-bold">Product not found.</div>;

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 md:px-8 py-8">
          
          {/* Breadcrumb */}
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Shop
          </Link>

          {/* === MAIN LAYOUT === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* LEFT: IMAGE (Sticky on Desktop) */}
            <div className="relative bg-[#F5F5F7] rounded-[2rem] overflow-hidden aspect-[4/5] md:sticky md:top-24">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 right-4">
                 <button className="p-3 bg-white rounded-full hover:bg-gray-100 transition shadow-sm">
                    <Share2 size={18} />
                 </button>
              </div>
            </div>

            {/* RIGHT: DETAILS */}
            <div className="flex flex-col pt-2">
              
              {/* Header */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between items-start mb-2">
                   <span className="text-xs font-bold tracking-widest text-[#EF4444] uppercase bg-red-50 px-2 py-1 rounded">
                     {product.category}
                   </span>
                   <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                      <Star size={14} fill="currentColor" /> 4.9 (128 Reviews)
                   </div>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-black text-[#111] leading-tight mb-4 tracking-tight">
                  {product.title}
                </h1>

                <div className="flex items-end gap-4">
                   <p className="text-3xl font-black text-[#111] font-display">
                     ${product.price}
                   </p>
                   <p className="text-lg text-gray-400 line-through font-medium mb-1">
                     ${(product.price * 1.2).toFixed(2)}
                   </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
                {product.description}
              </p>

           
              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#111] text-white py-4 px-8 rounded-xl font-bold uppercase tracking-widest hover:bg-[#EF4444] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200"
                >
                  <ShoppingBag size={20} />
                  Add to Bag
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Truck size={20} className="text-gray-600" />
                    <div>
                       <p className="text-xs font-bold uppercase text-gray-900">Free Delivery</p>
                       <p className="text-[10px] text-gray-500">2-3 Business Days</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <ShieldCheck size={20} className="text-gray-600" />
                    <div>
                       <p className="text-xs font-bold uppercase text-gray-900">Secure Checkout</p>
                       <p className="text-[10px] text-gray-500">Encrypted Payment</p>
                    </div>
                 </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProductDetails;