import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "../../services/product";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2, UploadCloud, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

const AddProduct = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const navigate = useNavigate();
  
  const [isNewCategory, setIsNewCategory] = useState(false);

  // MOCK CATEGORIES (Replace this with API data if you have time)
  // const { data: categories } = useGetCategoriesQuery();
  const categories = ["Men", "Women", "Kids", "Accessories", "Footwear"];

  const onSubmit = async (data) => {
    try {
      // Ensure numbers are numbers
      const formattedData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      };

      await createProduct(formattedData).unwrap();
      toast.success("Product Created Successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/admin/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-6">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
        <h1 className="text-2xl font-black text-[#111] mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
            <input {...register("title", { required: "Title is required" })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none transition-all" placeholder="e.g. Oversized Hoodie" />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Price ($)</label>
              <input type="number" step="0.01" {...register("price", { required: "Price is required" })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" placeholder="0.00" />
            </div>
            {/* Stock (Now Included) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Stock Count</label>
              <input type="number" {...register("stock", { required: "Stock is required", min: 0 })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" placeholder="0" />
            </div>
          </div>

          {/* Dynamic Category Selector */}
          <div>
            <div className="flex justify-between items-center mb-2">
               <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Category</label>
               <button 
                 type="button" 
                 onClick={() => {
                    setIsNewCategory(!isNewCategory);
                    setValue("category", ""); // Reset field
                 }}
                 className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wide flex items-center gap-1"
               >
                 {isNewCategory ? "Select Existing" : <><Plus size={12}/> Add New</>}
               </button>
            </div>

            {isNewCategory ? (
               <input 
                 {...register("category", { required: true })} 
                 className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" 
                 placeholder="Type new category name..." 
                 autoFocus
               />
            ) : (
               <div className="relative">
                 <select 
                   {...register("category", { required: true })} 
                   className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none appearance-none cursor-pointer"
                 >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                       <option key={cat} value={cat}>{cat}</option>
                    ))}
                 </select>
                 {/* Custom Arrow */}
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1L5 5L9 1"/></svg>
                 </div>
               </div>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
            <div className="flex items-center gap-2 w-full bg-gray-50 border border-transparent focus-within:bg-white focus-within:border-black rounded-xl p-4 transition-all">
               <UploadCloud size={20} className="text-gray-400" />
               <input {...register("image", { required: true })} className="flex-1 bg-transparent outline-none text-sm font-medium" placeholder="https://..." />
            </div>
            
            {/* Image Preview */}
            {watch("image") && (
               <div className="mt-4 w-full h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                  <img src={watch("image")} alt="Preview" className="w-full h-full object-contain" onError={(e) => e.target.style.display = 'none'} />
               </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
            <textarea {...register("description", { required: true })} rows={4} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" placeholder="Product details..."></textarea>
          </div>

          <button disabled={isLoading} className="w-full bg-[#111] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#EF4444] transition-all flex justify-center items-center gap-2 shadow-lg">
            {isLoading ? <Loader2 className="animate-spin" /> : "Create Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;