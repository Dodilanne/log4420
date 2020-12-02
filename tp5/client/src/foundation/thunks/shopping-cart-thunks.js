import axios from 'axios';
import { deepParseInt, tryCatchWrapper } from '../../utils';

export const fetchCart = async () =>
  tryCatchWrapper(async () => {
    const res = await axios.get('/shopping-cart');
    return res.data;
  });

export const updateProductQuantity = async ({ productId, quantity }) =>
  tryCatchWrapper(async () =>
    axios.put(`/shopping-cart/${productId}`, { quantity })
  );

export const addProductToCart = async data =>
  tryCatchWrapper(async () => {
    const payload = deepParseInt(data);
    const cart = (await fetchCart()).data;
    if (!cart) throw new Error('Cart not found');
    const itemFound = cart.find(item => item.productId === payload.productId);
    if (!itemFound) {
      return axios.post('/shopping-cart', payload);
    }

    return updateProductQuantity({
      ...payload,
      quantity: itemFound.quantity + payload.quantity,
    });
  });
