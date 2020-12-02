import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    populate: (_, action) => action.payload,
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice.reducer;
