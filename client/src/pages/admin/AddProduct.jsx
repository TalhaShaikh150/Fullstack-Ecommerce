import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "../../services/product";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createProduct(data).unwrap();
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
              <input type="number" {...register("price", { required: true })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" placeholder="0.00" />
            </div>
            {/* Stock */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Stock Count</label>
              <input type="number" {...register("stock", { required: true })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" placeholder="0" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
            <select {...register("category", { required: true })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none appearance-none">
               <option value="">Select Category</option>
               <option value="Men">Men</option>
               <option value="Women">Women</option>
               <option value="Accessories">Accessories</option>
            </select>
          </div>

          {/* Image URL (Simple for now) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
            <div className="flex items-center gap-2 w-full bg-gray-50 border border-transparent focus-within:bg-white focus-within:border-black rounded-xl p-4 transition-all">
               <UploadCloud size={20} className="text-gray-400" />
               <input {...register("image", { required: true })} className="flex-1 bg-transparent outline-none text-sm font-medium" placeholder="https://..." />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
            <textarea {...register("description", { required: true })} rows={4} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" placeholder="Product details..."></textarea>
          </div>

          <button disabled={isLoading} className="w-full bg-[#111] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#EF4444] transition-all flex justify-center items-center gap-2">
            {isLoading ? <Loader2 className="animate-spin" /> : "Create Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;