import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../services/users";
import { setCredentials } from "../services/authSlice";
import { Eye, EyeOff, ArrowRight, Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Full Name is required").min(3, "Name must be at least 3 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters")
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const res = await signup(data).unwrap();
      console.log("Signup Success:", res); // 🔍 Debugging

      // ⚠️ IMPORTANT: Backend sends { newUser: {...} } for signup
      // We must pass the inner object to setCredentials
      dispatch(setCredentials(res.newUser)); 
      navigate("/");
    } catch (err) {
      console.error("Signup Failed:", err); // 🔍 Debugging

      // Robust Error Extraction
      const message = 
        err?.data?.error ||           // 1. Specific backend error (e.g. "Email taken")
        err?.data?.message ||         // 2. General backend message
        err?.error ||                 // 3. Network error
        "Signup failed. Please try again.";
        
      setApiError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F3F4F6] relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-xl mb-6 shadow-lg transform -rotate-3">
             <span className="font-black italic text-xl">M</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">Create Account</h1>
          <p className="text-sm text-gray-500 font-medium">Join UrbanMart for exclusive drops.</p>
        </div>

        {apiError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 mb-6 text-xs font-bold uppercase tracking-wide"
            >
               <AlertCircle size={16} /> {apiError}
            </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Full Name</label>
                <input 
                    type="text" 
                    {...register("name")}
                    className={`w-full border-2 text-gray-900 text-sm font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400 ${errors.name ? "bg-red-50 border-red-500" : "bg-gray-50 border-gray-100 focus:bg-white focus:border-black"}`}
                    placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.name.message}</p>}
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">Email Address</label>
                <input 
                    type="email" 
                    {...register("email")}
                    className={`w-full border-2 text-gray-900 text-sm font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400 ${errors.email ? "bg-red-50 border-red-500" : "bg-gray-50 border-gray-100 focus:bg-white focus:border-black"}`}
                    placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.email.message}</p>}
            </div>

            <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                   <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                </div>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className={`w-full border-2 text-gray-900 text-sm font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400 pr-12 ${errors.password ? "bg-red-50 border-red-500" : "bg-gray-50 border-gray-100 focus:bg-white focus:border-black"}`}
                        placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.password.message}</p>}
            </div>

            <button disabled={isLoading} className="w-full bg-[#111] text-white h-12 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#EF4444] transition-all flex items-center justify-center gap-2 mt-4 shadow-lg disabled:opacity-50">
                {isLoading ? <><Loader2 size={16} className="animate-spin" /> Creating...</> : <>Sign Up <ArrowRight size={16} /></>}
            </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">Already have an account? <Link to="/login" className="text-black font-bold hover:text-[#EF4444] underline underline-offset-4">Log In</Link></p>
        </div>
        <div className="absolute -bottom-16 left-0 w-full text-center">
           <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black"><ArrowLeft size={14} /> Back to Store</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;