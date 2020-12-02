import { createSlice } from '@reduxjs/toolkit';

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: [],
  reducers: {
    populate: (_state, action) => action.payload,
    addItem: (state, action) => [...state, action.payload],
    updateItem: (state, { payload }) => {
      const itemIndex = state.findIndex(
        ({ productId }) => productId === payload.productId
      );
      if (itemIndex > -1) state[itemIndex] = payload;
      return state;
    },
  },
});

export const shoppingCartActions = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
