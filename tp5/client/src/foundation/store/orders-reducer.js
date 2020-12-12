import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    populate: (_state, action) => action.payload,
    addItem: (state, action) => [...state, action.payload],
    clear: () => initialState,
  },
});

export const ordersActions = ordersSlice.actions;

export default ordersSlice.reducer;
