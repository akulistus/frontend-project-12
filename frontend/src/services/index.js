import { configureStore } from '@reduxjs/toolkit';
import api from './api';
import channelReducer from '../slices/channelSlice';
import userReducer from '../slices/userSlice';
import modalReducer from '../slices/modalSlice';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    channels: channelReducer,
    user: userReducer,
    modals: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(api.middleware),
});
