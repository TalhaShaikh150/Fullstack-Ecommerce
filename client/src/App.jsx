import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import PageTransition from "./components/PageTransition";
import AdminRoute from "./components/AdminRoute";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout"; 
import ProductList from "./pages/admin/ProductList"; 
import AddProduct from "./pages/admin/AddProduct";   
import AdminDashboard from "./pages/admin/AdminDashboard";
import EditProduct from "./pages/admin/EditProduct";
import UserList from "./pages/admin/UserList";
// Public Pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- LAYOUT WRAPPER (The Fix) ---
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      
      <div className={isAdmin ? "" : "min-h-screen flex flex-col justify-between"}>
        {children}
      </div>

      {!isAdmin && <Footer />}
    </>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* We do NOT wrap these in PageTransition because Admin panel needs to be fast/static */}
   

<Route element={<AdminRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    
    {/* 1. DASHBOARD (Index) - No more redirect, shows stats now */}
    <Route index element={<AdminDashboard />} />

    {/* 2. PRODUCT MANAGEMENT */}
    <Route path="products" element={<ProductList />} />
    <Route path="product/add" element={<AddProduct />} />
    <Route path="product/edit/:id" element={<EditProduct />} /> {/* ✅ Edit Route */}

    {/* 3. USER MANAGEMENT */}
    <Route path="users" element={<UserList />} /> {/* ✅ Users Route */}

  </Route>
</Route>
        {/* === PUBLIC ROUTES (With Animations) === */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetails /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
      
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader finishLoading={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <BrowserRouter>
          <ScrollToTop />
          {/* ✅ Wrap everything in LayoutWrapper to handle Navbar logic */}
          <LayoutWrapper>
            <AnimatedRoutes />
          </LayoutWrapper>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;