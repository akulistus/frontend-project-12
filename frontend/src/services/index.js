import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware),
})