import { API_URL, SUPPLIERS } from "@/utils/endpoints";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DATA } from "@/data";

type supplierProps = {
  id?: number;
  name: string;
};

const suppliers = createApi({
  reducerPath: "suppliersApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["suppliers"],
  endpoints: (builder) => ({
    getSuppliers: builder.query<any[], void>({
      query: () => SUPPLIERS.getAll,
      providesTags: [{ type: "suppliers", id: "LIST" }],
    }),
    getSupplier: builder.query<{ id: number | string }, (typeof DATA)[0]>({
      query: ({ id }: { id: number | string }) => ({
        url: SUPPLIERS.getById,
        headers: {},
        method: "get",
      }),

      // invalidatesTags: [{ type: "suppliers", id: "LIST" }],
    }),
    addSupplier: builder.mutation<supplierProps, supplierProps>({
      query: (supplier: supplierProps) => ({
        url: SUPPLIERS.add,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: supplier.name }),
      }),
      invalidatesTags: [{ type: "suppliers", id: "LIST" }],
    }),
    updateSupplier: builder.mutation<supplierProps, supplierProps>({
      query: (supplier: supplierProps) => ({
        url: SUPPLIERS.update + supplier.id,
        body: supplier,
        method: "PUT",
      }),
    }),
  }),
});
export default suppliers;
export const {
  useGetSuppliersQuery,
  useAddSupplierMutation,
  useUpdateSupplierMutation,
  useGetSupplierQuery,
} = suppliers;
