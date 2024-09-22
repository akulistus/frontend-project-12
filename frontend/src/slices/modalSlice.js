import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: null,
  selectedChannel: null,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    closeModal: () => ({
      ...initialState,
    }),
  },
});

export const {
  setModal,
  closeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
