import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Users, LogOut, PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLogoutApiMutation } from "../../services/users";
import { logout } from "../../services/authSlice";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutApiMutation();

  const isActive = (path) => location.pathname === path;

  // ✅ LOGOUT LOGIC
  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Products", path: "/admin/products", icon: <ShoppingBag size={20} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F5F7] font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111] text-white flex flex-col fixed h-full z-10">
        <div className="p-8">
          <h1 className="text-2xl font-black italic tracking-tighter">MERN. <span className="text-[#EF4444] text-sm not-italic font-bold tracking-widest block">ADMIN</span></h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-bold uppercase tracking-wide
                ${isActive(item.path) 
                  ? "bg-[#EF4444] text-white shadow-lg shadow-red-900/20" 
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-800">
             <Link to="/admin/product/add" className="flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wide text-green-400 hover:bg-white/10 rounded-xl">
                <PlusCircle size={20} /> Add Product
             </Link>
          </div>
        </nav>

        <div className="p-4">
          <button 
            onClick={handleLogout} // ✅ Attached Logic
            className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-white/5 rounded-xl transition-colors text-sm font-bold uppercase tracking-wide"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8 md:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;