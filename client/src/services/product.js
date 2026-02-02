import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1. Get All
    getProducts: builder.query({
      query: () => "/api/products",
      providesTags: ["Product"],
    }),

    // 2. Get Single
    getSingleProduct: builder.query({
      query: (id) => `/api/products/${id}`,
      providesTags: ["Product"],
    }),

    // 3. Create
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/api/products/addproduct",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // 4. Delete
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      // We accept an object: { id: "123", title: "New Name", ... }
      query: ({ id, ...data }) => ({
        url: `/api/products/${id}`,
        method: "PATCH", // Or PUT, depending on your backend
        body: data,
      }),
      invalidatesTags: ["Product"], // Refetches product list & details
    }),

getCategories: builder.query({
  query: () => "/api/products/categories", // You need to add this route to backend
}),

  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation, // ✅ Export this so EditProduct.jsx can use it
} = productsApiSlice;