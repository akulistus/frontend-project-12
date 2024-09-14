import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setDefault: (state) => {
      state.selected = { id: '1', name: 'general', removable: false };
    },
  },
});

export const { setChannels, setSelected, setDefault } = channelSlice.actions;

export default channelSlice.reducer;
