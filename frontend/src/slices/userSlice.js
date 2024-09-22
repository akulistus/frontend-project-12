import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
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

export const getToken = () => window.localStorage.getItem('token');
export const getUsername = () => window.localStorage.getItem('username');

export default userSlice.reducer;
