import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { channelApi } from "./channelApi";
import { messageApi } from "./messageApi";
import authReducer from '../slices/authSlice';
import channelReducer from '../slices/channelSlice';

export default configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,

    [channelApi.reducerPath]: channelApi.reducer,
    channels: channelReducer,

    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(channelApi.middleware)
      .concat(messageApi.middleware),
});