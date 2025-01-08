import {api} from "./index";

const carsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCars: build.query({
            query: (params) => ({
                url: "/cars",
                params: {
                    categories: params?.categories,
                    model: params?.model,
                    ...params,
                }
            }),
            providesTags: ["Cars"]
        }),
        getDetailsCar: build.mutation({
            query: (id) => ({
                url: `cars/${id}`
            })
        }),
        sendCarForm: build.mutation({
            query: (body) => ({
                url: "/cars/create",
                method: "POST",
                body
            }),
            invalidatesTags: ["Cars"]
        }),
        
        deleteCars: build.mutation({
            query: (id) => ({
                url: `/cars/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cars"],
        }),
        
        UpdateCars: build.mutation({
            query: ({ body, id }) => ({
                url: `/cars/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Cars"],
        }),
        searchCars: build.query({
            query: (params) => ({
                url: "/cars/search",
                params
            }),
            providesTags: ["Cars"]
        }),
    })
});

export const { useGetCarsQuery, useGetDetailsCarMutation, useSendCarFormMutation, useDeleteCarsMutation, useUpdateCarsMutation, useSearchCarsQuery } = carsApi;