import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../services/users";
import { setCredentials } from "../services/authSlice";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading, error }] = useSignupMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res.newUser }));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">

      {/* Background Ambient Glow (Adds depth) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="flex justify-center items-center min-h-[90vh] px-4 relative z-10">
        <div className="w-full max-w-md p-10 border border-white/10 shadow-2xl rounded-2xl bg-[#0A0A0A] backdrop-blur-sm">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black tracking-tighter mb-2 text-white uppercase italic">
              Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">UrbanMart.</span>
            </h1>
            <p className="text-gray-400 text-sm tracking-wide">Enter the future of shopping.</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/20 border border-red-900/50 text-red-400 text-xs font-bold uppercase tracking-wide p-4 rounded mb-8 text-center">
              {error?.data?.message || "Signup failed."}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-6">
            
            {/* Name Input */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 ml-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-[#111] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white focus:bg-black transition-all duration-300" 
                placeholder="JOHN DOE"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-[#111] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white focus:bg-black transition-all duration-300" 
                placeholder="YOU@EXAMPLE.COM"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-3 ml-1">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Password</label>
                <span className="text-[10px] text-gray-600">MIN 8 CHARS</span>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-[#111] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white focus:bg-black transition-all duration-300" 
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              disabled={isLoading} 
              className="w-full bg-white text-black py-4 rounded-lg font-black uppercase tracking-widest hover:bg-gray-200 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? "Processing..." : "Create Account"}
            </button>
          </form>

          <div className="mt-10 text-center text-xs tracking-wide text-gray-500">
            ALREADY A MEMBER?{" "}
            <Link to="/login" className="font-bold text-white border-b border-white hover:text-gray-300 hover:border-gray-300 transition ml-1">
              LOG IN
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;