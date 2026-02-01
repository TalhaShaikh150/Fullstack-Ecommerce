import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";


function App() {
  return (
    <BrowserRouter>
      {/* Navbar appears on all pages */}
    <Navbar/>      
      <Routes>
        <Route path="/" element={<Home />} />
             <Route path="/product/:id" element={<ProductDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;