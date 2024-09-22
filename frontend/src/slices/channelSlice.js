import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selected: { id: '1', name: 'general', removable: false },
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setSelected: (state, { payload }) => ({
      ...state,
      selected: payload,
    }),
    setDefault: (state) => ({
      ...state,
      selected: { id: '1', name: 'general', removable: false },
    }),
  },
});

export const { setSelected, setDefault } = channelSlice.actions;

export default channelSlice.reducer;
