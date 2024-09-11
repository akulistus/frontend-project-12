import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload: { username, token } }) => {
      state.token = token;
      state.username = username;
    },
    logOut: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { setToken, logOut } = authSlice.actions;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;