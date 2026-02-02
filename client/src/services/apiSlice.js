import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Use environment variable or fallback to localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiSlice = createApi({
  reducerPath: "api", // The name in the Redux store
  
  // Base Query: Handles the connection
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // 👈 CRITICAL: Allows Cookies to be sent/received
  }),

  // Tag Types: Used for auto-refreshing data
  // When we "invalidate" 'Product', it refetches the product list automatically.
  tagTypes: ["Product", "User", "Order"],

  // Endpoints: Empty for now, we inject them in other files
  endpoints: (builder) => ({}),
});