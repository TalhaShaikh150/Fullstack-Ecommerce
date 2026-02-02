import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice'; // ✅ Import the PARENT slice
import authReducer from "../services/authSlice";
import cartReducer from "../services/cartSlice";

export const store = configureStore({
  reducer: {
    // 1. We only need the Parent API reducer now
    // It handles Products, Users, and Admin logic all in one place
    [apiSlice.reducerPath]: apiSlice.reducer,
    
    // 2. Client-side state
    auth: authReducer, 
    cart: cartReducer, 
  },

  // 3. We only need the Parent API middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});