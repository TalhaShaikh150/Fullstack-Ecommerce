import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useGetSingleProductQuery, useUpdateProductMutation } from "../../services/product";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 1. Fetch Existing Data
  const { data: product, isLoading: isFetching } = useGetSingleProductQuery(id);
  
  // 2. Update Hook
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // 3. Pre-fill form when data arrives
  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("image", product.image);
      setValue("category", product.category);
      setValue("description", product.description);
      setValue("stock", product.stock);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      // Pass ID and Data
      await updateProduct({ id, ...data }).unwrap();
      toast.success("Product Updated!");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isFetching) return <div className="p-10 text-center">Loading product data...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/admin/products" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-6">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-2xl font-black text-[#111] mb-8">Edit Product</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
            <input {...register("title", { required: "Title is required" })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none transition-all" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Price ($)</label>
              <input type="number" {...register("price", { required: true })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Stock</label>
              <input type="number" {...register("stock", { required: true })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
            <input {...register("category", { required: true })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
            <input {...register("image", { required: true })} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
            <textarea {...register("description")} rows={4} className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-xl p-4 text-sm font-medium outline-none"></textarea>
          </div>

          <button disabled={isUpdating} className="w-full bg-[#111] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#EF4444] transition-all flex justify-center items-center gap-2">
            {isUpdating ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Update Product</>}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;