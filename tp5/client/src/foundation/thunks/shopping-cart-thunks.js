import axios from 'axios';
import { deepParseInt, tryCatchWrapper } from '../../utils';
import { shoppingCartActions } from '../store/shopping-cart-reducer';

export const fetchCart = () => async dispatch =>
  tryCatchWrapper(async () => {
    const res = await axios.get('/shopping-cart');
    dispatch(shoppingCartActions.populate(res.data));
  });

export const updateProductQuantity = ({
  productId,
  quantity,
}) => async dispatch =>
  tryCatchWrapper(async () => {
    await axios.put(`/shopping-cart/${productId}`, { quantity });
    dispatch(shoppingCartActions.updateItem({ productId, quantity }));
    return true;
  });

export const addProductToCart = data => async (dispatch, getState) =>
  tryCatchWrapper(async () => {
    const payload = deepParseInt(data);
    const { shoppingCart } = getState();
    const itemFound = shoppingCart.find(
      ({ productId }) => productId === payload.productId
    );
    if (!itemFound) {
      await axios.post('/shopping-cart', payload);
      dispatch(shoppingCartActions.addItem(payload));
      return true;
    }

    return dispatch(
      updateProductQuantity({
        ...payload,
        quantity: itemFound.quantity + payload.quantity,
      })
    );
  });

export const removeProductFromCart = productId => async dispatch =>
  tryCatchWrapper(async () => {
    await axios.delete(`/shopping-cart/${productId}`);
    dispatch(shoppingCartActions.removeItem(productId));
    return true;
  });

export const clearCart = () => async dispatch =>
  tryCatchWrapper(async () => {
    await axios.delete('/shopping-cart');
    dispatch(shoppingCartActions.clear());
    return true;
  });
