import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // (Create this similar to Login)
import Profile from "./pages/Profile";


function App() {
  return (
    <BrowserRouter>
      {/* Navbar appears on all pages */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
