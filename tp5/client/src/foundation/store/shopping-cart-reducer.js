import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const getItemIndex = (state, productId) =>
  state.findIndex(product => product.productId === productId);

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    populate: (_state, action) => action.payload,
    addItem: (state, action) => [...state, action.payload],
    updateItem: (state, { payload }) => {
      const itemIndex = getItemIndex(state, payload.productId);
      if (itemIndex > -1) state[itemIndex] = payload;
      return state;
    },
    removeItem: (state, { payload }) => {
      const itemIndex = getItemIndex(state, payload);
      if (itemIndex > -1) state.splice(itemIndex, 1);
      return state;
    },
    clear: () => initialState,
  },
});

export const shoppingCartActions = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
