import { api } from "./index"

const userApi = api.injectEndpoints({
     endpoints: (build) => ({
         
          loginIn : build.mutation({
               query: (body) => ({
                    url: "/auth/sign-in",
                    method: "POST",
                    body
               }), 
               providesTags: ["User"],
          }),
          signUp : build.mutation({
               query: (body) => ({
                    url: "/auth/sign-up",
                    method: "POST",
                    body
               }), 
               providesTags: ["User"],
          }),
          verifyOtp : build.mutation({
               query: (body) => ({
                    url: "auth/send-otp",
                    method: "POST",
                    body
               }), 
               providesTags: ["User"],
          }),
          
     })
})

export const { useLoginInMutation , useSignUpMutation, useVerifyOtpMutation} = userApi