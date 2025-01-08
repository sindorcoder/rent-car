import { configureStore } from "@reduxjs/toolkit";
import  { reducer as authReducer } from "../slices/authSlice";
import { api } from "../api/index"
const store = configureStore({
     reducer: {
          auth: authReducer,
          [api.reducerPath]:  api.reducer
     },
     middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

export default store