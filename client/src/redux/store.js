import { configureStore } from '@reduxjs/toolkit'
import { productApi } from '../services/product'
import { userApi } from "../services/users"; // ✅ Import User API
import authReducer from "../services/authSlice"; // ✅ Import Auth Slice
import cartReducer from "../services/cartSlice"; // ✅ 1. Import it

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer, // ✅ Add User API
    auth: authReducer, // ✅ Add Auth State
        cart: cartReducer, // ✅ 2. Add it here

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(userApi.middleware), // ✅ Add Middleware

  
})