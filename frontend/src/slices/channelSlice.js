import { createSlice } from '@reduxjs/toolkit';

const defaultSelected = { id: '1', name: 'general', removable: false };

const initialState = {
  selected: defaultSelected,
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
      selected: defaultSelected,
    }),
  },
});

export const { setSelected, setDefault } = channelSlice.actions;

export default channelSlice.reducer;
