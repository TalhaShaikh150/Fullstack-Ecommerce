import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1. LOGIN
    login: builder.mutation({
      query: (data) => ({
        // ✅ WAS: "/auth/login" -> NOW: "/api/auth/login"
        url: "/api/auth/login", 
        method: "POST",
        body: data,
      }),
    }),

    // 2. SIGNUP (Fixes your current error)
    signup: builder.mutation({
      query: (data) => ({
        // ✅ WAS: "/auth/signup" -> NOW: "/api/auth/signup"
        url: "/api/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    // 3. LOGOUT
    logoutApi: builder.mutation({
      query: () => ({
        // ✅ WAS: "/auth/logout" -> NOW: "/api/auth/logout"
        url: "/api/auth/logout",
        method: "POST",
      }),
    }),

    // 4. PROFILE
    getProfile: builder.query({
      query: () => ({
        // ✅ WAS: "/auth/profile" -> NOW: "/api/auth/profile"
        url: "/api/auth/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

      // ✅ ADD THIS: Fetch All Users (Admin Only)
    getUsers: builder.query({
      query: () => ({
        url: "/api/users", // Make sure this matches your backend route
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // ✅ ADD THIS: Delete User (Admin Only)
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const { 
  useLoginMutation, 
  useSignupMutation, 
  useLogoutApiMutation, 
  useGetProfileQuery ,
    useGetUsersQuery,   // ✅ New
  useDeleteUserMutation // ✅ New
} = userApiSlice;