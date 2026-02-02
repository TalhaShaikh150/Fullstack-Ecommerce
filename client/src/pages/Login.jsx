import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../services/users";
import { setCredentials } from "../services/authSlice";
import { Eye, EyeOff, ArrowRight, Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(""); // Clear error when user starts typing
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password) {
        setErrorMsg("Please fill in all fields");
        return;
    }
    
    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials({ ...res.user }));
      navigate("/");
    } catch (err) {
      // ✅ LOGIC: Extract the exact error message from backend
      // It looks for err.data.message (standard) or falls back to generic
      const message = err?.data?.message || err?.data?.error || err?.error || "Login failed. Please check credentials.";
      setErrorMsg(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F3F4F6] relative overflow-hidden">
      
      {/* Background Decor (Subtle Red Blur) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gray-300/20 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 relative z-10"
      >
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-xl mb-6 shadow-lg transform rotate-3">
             <span className="font-black italic text-xl">M</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Enter your credentials to access your account.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 mb-6 text-xs font-bold uppercase tracking-wide"
            >
               <AlertCircle size={16} /> {errorMsg}
            </motion.div>
        )}

        <form onSubmit={submitHandler} className="space-y-5">
            
            {/* Email */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-gray-100 text-gray-900 text-sm font-medium rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-black transition-all placeholder:text-gray-400"
                      placeholder="john@example.com"
                  />
                </div>
            </div>

            {/* Password */}
            <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                   <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                     Password
                   </label>
                   <Link to="#" className="text-xs font-bold text-gray-400 hover:text-black transition-colors">
                     Forgot?
                   </Link>
                </div>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border-2 border-gray-100 text-gray-900 text-sm font-medium rounded-xl px-4 py-3.5 outline-none focus:bg-white focus:border-black transition-all placeholder:text-gray-400"
                        placeholder="••••••••"
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <button 
                disabled={isLoading}
                className="w-full bg-[#111] text-white h-12 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#EF4444] hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-4"
            >
                {isLoading ? (
                  <> <Loader2 size={16} className="animate-spin" /> Processing... </>
                ) : (
                  <> Sign In <ArrowRight size={16} /> </>
                )}
            </button>

        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link to="/signup" className="text-black font-bold hover:text-[#EF4444] hover:underline underline-offset-4 transition-colors">
                  Create Account
              </Link>
            </p>
        </div>

        {/* Back to Home */}
        <div className="absolute -bottom-16 left-0 w-full text-center">
           <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              <ArrowLeft size={14} /> Back to Store
           </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;