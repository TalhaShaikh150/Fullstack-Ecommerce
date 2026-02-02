import { apiSlice } from "./apiSlice"; // Import the parent

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1. GET ALL PRODUCTS
    getProducts: builder.query({
      query: () => "/api/products",
      providesTags: ["Product"], // Keep track of this list
    }),

    // 2. GET SINGLE PRODUCT
    getSingleProduct: builder.query({
      query: (id) => `/api/products/${id}`,
    }),

    // 3. ADD PRODUCT (Admin)
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/api/products/addproduct",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"], // 👈 Auto-refetches the list after adding
    }),

    // 4. DELETE PRODUCT (Admin)
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"], // 👈 Auto-refetches the list after deleting
    }),

  }),
});

// Export Hooks
export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productsApiSlice;