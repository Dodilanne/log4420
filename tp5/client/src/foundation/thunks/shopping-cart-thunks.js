import axios from 'axios';
import { arrayFindByKey, deepParseInt, tryCatchWrapper } from '../../utils';
import { shoppingCartActions } from '../store/shopping-cart-reducer';

export const fetchCart = () => async dispatch =>
  tryCatchWrapper(async () => {
    const res = await axios.get('/shopping-cart');
    dispatch(shoppingCartActions.populate(res.data));
  });

export const updateProductQuantity = data => async dispatch =>
  tryCatchWrapper(async () => {
    const payload = deepParseInt(data);
    const { productId, quantity } = payload;
    await axios.put(`/shopping-cart/${productId}`, { quantity });
    dispatch(shoppingCartActions.updateItem(payload));
  });

export const addProductToCart = data => async (dispatch, getState) =>
  tryCatchWrapper(async () => {
    const payload = deepParseInt(data);
    const { shoppingCart } = getState();

    const itemFound = arrayFindByKey(shoppingCart, payload.productId);
    if (itemFound) {
      return dispatch(
        updateProductQuantity({
          ...payload,
          quantity: itemFound.quantity + payload.quantity,
        })
      );
    }

    await axios.post('/shopping-cart', payload);
    dispatch(shoppingCartActions.addItem(payload));
  });

export const removeProductFromCart = productId => async dispatch =>
  tryCatchWrapper(async () => {
    await axios.delete(`/shopping-cart/${productId}`);
    dispatch(shoppingCartActions.removeItem(productId));
  });

export const clearCart = () => async dispatch =>
  tryCatchWrapper(async () => {
    await axios.delete('/shopping-cart');
    dispatch(shoppingCartActions.clear());
  });
