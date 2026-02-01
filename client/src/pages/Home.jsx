import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../services/product";

const Home = () => {
  
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar you created earlier */}
      <Navbar />

     
      {/* === PRODUCT GRID SECTION === */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col items-center mb-16 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">
                Discover
             </span>
             <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C]">
                Latest Arrivals
             </h2>
          </div>

          {/* LOADING STATE */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
          )}

          {/* ERROR STATE */}
          {error && (
            <div className="text-center text-red-500 py-10">
               Error loading products. Is the server running?
            </div>
          )}

          {/* DATA RENDER */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
              {products.allProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Home;