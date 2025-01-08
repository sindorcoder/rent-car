import { api } from "./index";

const userInfoApi = api.injectEndpoints({
     endpoints: (build) => ({
          getUserInfo: build.query({
               query: () => ({
                    url: "auth/profile",
                    method: "GET"
               }),
               providesTags: ["User"]
          }),
          getPeople: build.query({
               query: () => ({
                    url: "users",
                    method: "GET"
               }),
               providesTags: ["User"]
          }),
          deleteUser: build.mutation({
               query: (id) => ({
                    url: `users/${id}`,
                    method: "DELETE"
               }),
               invalidatesTags: ["User"]
          }),
          updateUser: build.mutation({
               query: ({body, id}) => ({
                    url: `users/${id}`,
                    method: "PUT",
                    body
          }),
               invalidatesTags: ["User"]
          }),
          promoteUser: build.mutation({
               query: (id) => ({
                    url: `users/promote/${id}`,
                    method: "POST"
               }),
               invalidatesTags: ["User"]
          }),
     })
})

export const { useGetUserInfoQuery, useGetPeopleQuery, useDeleteUserMutation, useUpdateUserMutation, usePromoteUserMutation } = userInfoApi 