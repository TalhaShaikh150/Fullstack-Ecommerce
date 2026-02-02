import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../services/users";
import { setCredentials } from "../services/authSlice";
import { Eye, EyeOff, ArrowRight, Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 1. Validation Schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  // 2. State & Hooks
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // 3. Form Setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // 4. Redirect if logged in
  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  // 5. Submit Handler
  const onSubmit = async (data) => {
    setApiError("");
    try {
      const res = await login(data).unwrap();
      console.log("Login Success:", res); 

      // Save user to Redux
      dispatch(setCredentials(res.user)); 
      navigate("/");
    } catch (err) {
      console.error("Login Failed:", err);
      // Logic to catch backend error message
      const message = 
        err?.data?.error || 
        err?.data?.message || 
        "Login failed. Please check your credentials.";
      setApiError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F3F4F6] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 relative z-10" 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-xl mb-6 shadow-lg transform rotate-3">
            <span className="font-black italic text-xl">M</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-500 font-medium">Access your curated collection.</p>
        </div>

        {/* API Error Alert */}
        {apiError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 mb-6 text-xs font-bold uppercase tracking-wide"
            >
               <AlertCircle size={16} /> {apiError}
            </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email Field */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Email Address</label>
                <div className="relative group">
                  <input 
                    type="email" 
                    {...register("email")} 
                    className={`w-full border-2 text-gray-900 text-sm font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400 
                      ${errors.email ? "bg-red-50 border-red-500" : "bg-gray-50 border-gray-100 focus:bg-white focus:border-black"}`} 
                    placeholder="john@example.com" 
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email.message}
                  </p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                   <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                   <span className="text-xs font-bold text-gray-400 cursor-pointer hover:text-black transition-colors">Forgot?</span>
                </div>
                <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      {...register("password")} 
                      className={`w-full border-2 text-gray-900 text-sm font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400 pr-12 
                        ${errors.password ? "bg-red-50 border-red-500" : "bg-gray-50 border-gray-100 focus:bg-white focus:border-black"}`} 
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
                {errors.password && (
                  <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.password.message}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button 
              disabled={isLoading} 
              className="w-full bg-[#111] text-white h-12 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#EF4444] hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                  <> <Loader2 size={16} className="animate-spin" /> Signing In... </>
                ) : (
                  <> Sign In <ArrowRight size={16} /> </>
                )}
            </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link to="/signup" className="text-black font-bold hover:text-[#EF4444] underline underline-offset-4 transition-colors">
                Create Account
              </Link>
            </p>
        </div>

        {/* Back Link */}
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