import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.list = payload.channels;
    },
  },
});

export const { setChannels } = channelSlice.actions;

export default channelSlice.reducer;