import { configureStore } from '@reduxjs/toolkit'
import { productApi } from '../services/product'
import { userApi } from "../services/users"; // ✅ Import User API
import authReducer from "../services/authSlice"; // ✅ Import Auth Slice
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer, // ✅ Add User API
    auth: authReducer, // ✅ Add Auth State
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(userApi.middleware), // ✅ Add Middleware

  
})