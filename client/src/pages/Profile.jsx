import { useEffect } from "react"; // ✅ Added useEffect
import { useGetProfileQuery, useLogoutApiMutation } from "../services/users";
import { useDispatch, useSelector } from "react-redux"; // ✅ Added useSelector
import { logout } from "../services/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { User, Package, Settings, LogOut, ShieldCheck, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";

const Profile = () => {
  // 1. Get User from Redux State (Instant data)
  const { userInfo } = useSelector((state) => state.auth);

  // 2. Get User from API (Background data)
  // We grab 'refetch' to force an update when this page loads
  const { data, isLoading, error, refetch } = useGetProfileQuery();
  
  const [logoutApiCall] = useLogoutApiMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 3. Force Refetch on Component Mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // 4. Combine Sources (Prefer API data, fallback to Redux state)
  const user = data?.user || userInfo;

  // Show loading ONLY if we have absolutely no user data
  if (isLoading && !user) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  );

  // If not logged in
  if (!user) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#F9FAFB]">
      <h2 className="text-xl font-bold text-gray-800">Please log in to view your profile</h2>
      <Link to="/login" className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors">
        Login Now
      </Link>
    </div>
  );

  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-20">
      
      <div className="container mx-auto px-4 py-10">
        
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#111]">My Account</h1>
            <p className="text-gray-500 font-medium">Manage your orders and preferences.</p>
          </div>
          
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-sm uppercase tracking-wide"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: USER CARD */}
          <div className="space-y-6">
            
            {/* 1. Profile Box */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
               <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center text-white text-3xl font-black mb-4 shadow-xl ring-4 ring-gray-50">
                  {user?.name?.charAt(0).toUpperCase()}
               </div>
               <h2 className="text-xl font-bold text-[#111]">{user?.name}</h2>
               <p className="text-gray-500 text-sm mb-4 font-medium">{user?.email}</p>
               
               {/* Fixed Admin Link Path */}
               {user?.role === 'admin' && (
                 <Link to="/admin/products" className="flex items-center gap-2 bg-[#111] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#EF4444] transition-colors shadow-lg">
                    <ShieldCheck size={14} /> Admin Dashboard
                 </Link>
               )}
            </div>

            {/* 2. Menu Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="flex items-center gap-4 p-4 border-b border-gray-100 bg-gray-50/50 border-l-4 border-l-black">
                  <User size={18} className="text-[#111]" /> 
                  <span className="font-bold text-sm">Account Overview</span>
               </div>
               <div className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors group">
                  <Package size={18} className="text-gray-400 group-hover:text-black transition-colors" /> 
                  <span className="font-medium text-sm text-gray-600 group-hover:text-black transition-colors">My Orders</span>
               </div>
               <div className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors group">
                  <MapPin size={18} className="text-gray-400 group-hover:text-black transition-colors" /> 
                  <span className="font-medium text-sm text-gray-600 group-hover:text-black transition-colors">Saved Addresses</span>
               </div>
            </div>

          </div>

          {/* RIGHT: DASHBOARD CONTENT */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Stats Row */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                   <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Orders</p>
                   <p className="text-3xl font-black text-[#111]">0</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                   <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Pending</p>
                   <p className="text-3xl font-black text-yellow-500">0</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                   <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Wishlist</p>
                   <p className="text-3xl font-black text-[#EF4444]">0</p>
                </div>
             </div>

             {/* Recent Orders Section */}
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-[300px]">
                <h3 className="text-lg font-bold text-[#111] mb-6 border-b border-gray-100 pb-4">Recent Orders</h3>
                
                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-8 text-center">
                   <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Package size={32} className="text-gray-300" />
                   </div>
                   <h4 className="font-bold text-gray-900 mb-2 text-lg">No orders yet</h4>
                   <p className="text-gray-500 text-sm max-w-xs mb-8 leading-relaxed">
                     Looks like you haven't made your first purchase yet. Explore our collection to find something you love.
                   </p>
                   <Link to="/" className="bg-[#111] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#EF4444] transition-colors shadow-lg">
                     Start Shopping
                   </Link>
                </div>
             </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;