import { configureStore } from '@reduxjs/toolkit';
import api from './api';
import channelReducer from '../slices/channelSlice';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    channels: channelReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(api.middleware),
});
