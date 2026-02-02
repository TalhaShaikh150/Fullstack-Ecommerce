import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-3xl font-black italic tracking-tighter mb-6 block">
              MERN<span className="text-[#EF4444]">.</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Redefining streetwear culture with bold silhouettes and premium materials. Designed for the modern urban nomad.
            </p>
            <div className="flex gap-4">
              <div className="p-2 bg-white/10 rounded-full hover:bg-[#EF4444] transition-colors cursor-pointer"><Instagram size={18}/></div>
              <div className="p-2 bg-white/10 rounded-full hover:bg-[#EF4444] transition-colors cursor-pointer"><Twitter size={18}/></div>
              <div className="p-2 bg-white/10 rounded-full hover:bg-[#EF4444] transition-colors cursor-pointer"><Facebook size={18}/></div>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-500">Shop</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-[#EF4444] transition-colors">New Arrivals</Link></li>
              <li><Link to="/" className="hover:text-[#EF4444] transition-colors">Best Sellers</Link></li>
              <li><Link to="/" className="hover:text-[#EF4444] transition-colors">Accessories</Link></li>
              <li><Link to="/" className="hover:text-[#EF4444] transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-500">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-[#EF4444] transition-colors">Order Status</Link></li>
              <li><Link to="/" className="hover:text-[#EF4444] transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/" className="hover:text-[#EF4444] transition-colors">FAQ</Link></li>
              <li><Link to="/" className="hover:text-[#EF4444] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-500">Stay in the loop</h4>
            <p className="text-gray-400 text-sm mb-4">Get 10% off your first order when you sign up.</p>
            <div className="flex bg-white/10 rounded-lg p-1 border border-white/10 focus-within:border-white transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent w-full px-4 py-2 text-sm outline-none placeholder:text-gray-500"
              />
              <button className="bg-white text-black p-2 rounded-md hover:bg-[#EF4444] hover:text-white transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            © 2024 Mern Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 font-bold uppercase tracking-widest">
            <Link to="/" className="hover:text-white">Privacy</Link>
            <Link to="/" className="hover:text-white">Terms</Link>
            <Link to="/" className="hover:text-white">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;