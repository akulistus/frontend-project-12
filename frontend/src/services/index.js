import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authReducer from '../slices/authSlice'

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware),
})