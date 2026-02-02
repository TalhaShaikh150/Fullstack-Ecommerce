import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:${import.meta.env.VITE_API_URL}`, 
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    
    // 1. LOGIN
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login", 
        method: "POST",
        body: data,
      }),
    }),

    // 2. SIGNUP
    signup: builder.mutation({
      query: (data) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    // 3. LOGOUT
    logoutApi: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
    }),

    // 4. PROFILE (Protected Route)
    getProfile: builder.query({
      query: () => ({
        url: "/api/auth/profile",
        method: "GET",
      }),
    }),

  }),
});

export const { 
  useLoginMutation, 
  useSignupMutation, 
  useLogoutApiMutation, 
  useGetProfileQuery 
} = userApi;