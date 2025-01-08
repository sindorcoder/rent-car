import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     user: JSON.parse(localStorage.getItem("User")) || null,
     token: localStorage.getItem("token") || null,
}


const authSlice = createSlice({
     name: "auth", 
     initialState,
     reducers: {
          logIn: (state, action) => {
               const user = action.payload.payload.user
               state.user = user
               localStorage.setItem("User", JSON.stringify(user))
               localStorage.setItem("token", action.payload.payload.accessToken)
          },
          signOut: (state) => {
               state.token = null
               localStorage.removeItem("token")
               state.user = null
               localStorage.removeItem("User")
          },
          // likeCars: (state, action) => {
          //      state.likes = action.payload._id
          //      localStorage.setItem("likes", JSON.stringify((action.payload._id)))
          // }
     }
})

export const { signOut, logIn, likeCars } = authSlice.actions
export const reducer =  authSlice.reducer