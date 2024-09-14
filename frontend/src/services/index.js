import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authReducer from '../slices/authSlice';
import channelReducer from '../slices/channelSlice';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    channels: channelReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(api.middleware)
});