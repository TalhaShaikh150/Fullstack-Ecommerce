import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:${import.meta.env.VITE_API_URL}`}),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/api/products",
    }),
    getSingleProduct: builder.query({
        query: (id) => `/api/products/${id}`,
    }),
}),
});

export const { useGetProductsQuery ,useGetSingleProductQuery    } = productApi;
