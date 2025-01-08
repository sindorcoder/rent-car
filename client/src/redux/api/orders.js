import {api} from "./index";

const carsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => ({
                url: "/orders",
            }),
            providesTags: ["Cars"]
        }),
        deleteOrders: build.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cars"]
        }),
        createOrders: build.mutation({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body
            }),
            invalidatesTags: ["Cars"]
        })
    })
});

export const {useGetOrdersQuery, useDeleteOrdersMutation, useCreateOrdersMutation } = carsApi;