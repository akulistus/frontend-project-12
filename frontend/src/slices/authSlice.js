import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload: { token } }) => {
      state.token = token;
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;