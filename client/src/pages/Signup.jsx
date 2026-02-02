import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../services/users";
import { setCredentials } from "../services/authSlice";
import { Eye, EyeOff, ArrowRight, Loader2, ArrowLeft, AlertCircle, User } from "lucide-react";
import { motion } from "framer-motion";

// ✅ 1. Import Hook Form & Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// ✅ 2. Define Validation Schema
const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Full Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // ✅ 3. Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  // ✅ 4. Submit Handler
  const onSubmit = async (data) => {
    setApiError("");
    
    try {
      const res = await signup(data).unwrap();
      // Backend returns { newUser: ... } for signup usually
      dispatch(setCredentials({ ...res.newUser }));
      navigate("/");
    } catch (err) {
      console.log("Signup Error:", err);
      // ✅ FIX: Prioritize err.data.error to avoid "Bad Request"
      const message = 
        err?.data?.error || 
        err?.data?.message || 
        "Signup failed. Please try again.";
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 relative z-10"
      >
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-xl mb-6 shadow-lg transform -rotate-3">
             <span className="font-black italic text-xl">M</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Join UrbanMart for exclusive drops.
          </p>
        </div>

        {/* API Error Alert */}
        {apiError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 mb-6 text-xs font-bold uppercase tracking-wide"
            >
               <AlertCircle size={16} /> {apiError}
            </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Name Field */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <input 
                      type="text" 
                      {...register("name")}
                      className={`w-full border-2 text-gray-900 text-sm font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400 
                        ${errors.name 
                          ? "bg-red-50 border-red-500 focus:border-red-500" 
                          : "bg-gray-50 border-gray-100 focus:bg-white focus:border-black"
                        }`}
                      placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name.message}
                  </p>
                )}
            </div>

            {/* Email Field */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <input 
                      type="email" 
                      {...register("email")}
                      className={`w-full border-2 text-gray-900 text-sm font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400 
                        ${errors.email 
                          ? "bg-red-50 border-red-500 focus:border-red-500" 
                          : "bg-gray-50 border-gray-100 focus:bg-white focus:border-black"
                        }`}
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
                   <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                     Password
                   </label>
                </div>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className={`w-full border-2 text-gray-900 text-sm font-medium rounded-xl px-4 py-3.5 outline-none transition-all placeholder:text-gray-400 pr-12
                          ${errors.password 
                            ? "bg-red-50 border-red-500 focus:border-red-500" 
                            : "bg-gray-50 border-gray-100 focus:bg-white focus:border-black"
                          }`}
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
                className="w-full bg-[#111] text-white h-12 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#EF4444] hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-4"
            >
                {isLoading ? (
                  <> <Loader2 size={16} className="animate-spin" /> Creating Account... </>
                ) : (
                  <> Sign Up <ArrowRight size={16} /> </>
                )}
            </button>

        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-black font-bold hover:text-[#EF4444] hover:underline underline-offset-4 transition-colors">
                  Log In
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

export default Signup;