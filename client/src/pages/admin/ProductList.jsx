import { useGetProductsQuery, useDeleteProductMutation } from "../../services/product";
import { Link } from "react-router-dom";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const ProductList = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        toast.success("Product Deleted");
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-[#111] tracking-tight">Products</h1>
          <p className="text-gray-500 text-sm font-medium">Manage your inventory</p>
        </div>
        <Link to="/admin/product/add" className="bg-[#111] text-white px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#EF4444] transition-colors flex items-center gap-2 shadow-lg">
          <Plus size={16} /> Add New
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Stock</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr><td colSpan="5" className="p-10 text-center text-gray-400">Loading...</td></tr>
            ) : (
              products.allProducts?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                        <img src={product.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <span className="font-bold text-sm text-[#111]">{product.title}</span>
                    </div>
                  </td>
                  <td className="p-5 font-medium text-sm">${product.price}</td>
                  <td className="p-5"><span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wide">{product.category}</span></td>
                  <td className="p-5 text-sm font-bold text-gray-500">{product.stock}</td>
                  <td className="p-5">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/product/edit/${product._id}`} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        {isDeleting ? <Loader2 size={16} className="animate-spin"/> : <Trash2 size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;