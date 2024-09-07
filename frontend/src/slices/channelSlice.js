import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selected: null,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.list = payload;
    },
    setSelected: (state, { payload }) => {
      state.selected = payload;
    },
  },
});

export const { setChannels, setSelected } = channelSlice.actions;

export default channelSlice.reducer;