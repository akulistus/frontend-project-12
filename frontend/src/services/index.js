import { configureStore } from '@reduxjs/toolkit';
import api from './api';
import channelReducer from '../slices/channelSlice';
import userReducer from '../slices/userSlice';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    channels: channelReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(api.middleware),
});
