import { createSlice } from '@reduxjs/toolkit';

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: [],
  reducers: {
    populate: (_, action) => action.payload,
  },
});

export const shoppingCartActions = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
