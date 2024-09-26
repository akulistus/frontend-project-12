import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  getUsername: () => window.localStorage.getItem('username'),
  getToken: () => window.localStorage.getItem('token'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, { payload: { username, token } }) => {
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('username', username);
    },
    logOut: () => {
      window.localStorage.clear();
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
