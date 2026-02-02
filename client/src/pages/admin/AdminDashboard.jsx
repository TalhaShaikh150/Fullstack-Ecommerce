import { useGetProductsQuery } from "../../services/product";
import { DollarSign, Package, Users, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  // 1. Rename 'data' to 'apiData' to avoid naming conflicts
  const { data: apiData, isLoading } = useGetProductsQuery();

  // 2. DEBUGGING: Check your console to see what the backend actually sends
  // console.log("API RESPONSE:", apiData);

  // 3. ROBUST DATA EXTRACTION
  let products = [];
  
  if (isLoading) {
    products = []; // If loading, use empty array
  } else if (Array.isArray(apiData)) {
    products = apiData; // It's already an array
  } else if (apiData?.allProducts) {
    products = apiData.allProducts; // It's inside an object key
  } else if (apiData?.products) {
    products = apiData.products; // Maybe it's this key?
  } else {
    products = []; // Fallback
  }

  // 4. Calculations (Now safe because products is guaranteed to be an array)
  const totalProducts = products.length;
  
  const totalValue = products.reduce((acc, item) => {
    return acc + (Number(item.price || 0) * Number(item.stock || 0));
  }, 0);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black text-[#111]">{value}</h3>
      </div>
      <div className={`p-4 rounded-full ${color} text-white`}>{icon}</div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-black text-[#111] mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Sales" value="$12,450" icon={<DollarSign size={24} />} color="bg-green-500" />
        <StatCard title="Total Products" value={isLoading ? "..." : totalProducts} icon={<Package size={24} />} color="bg-blue-500" />
        <StatCard title="Total Customers" value="1,203" icon={<Users size={24} />} color="bg-purple-500" />
        <StatCard title="Inventory Value" value={isLoading ? "..." : `$${totalValue.toLocaleString()}`} icon={<TrendingUp size={24} />} color="bg-[#EF4444]" />
      </div>

      <div className="mt-10 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
           Chart Placeholder
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;