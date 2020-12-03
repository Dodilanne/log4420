import axios from 'axios';
import { tryCatchWrapper } from '../../utils';
import { ordersActions } from '../store/orders-reducer';

export const fetchOrders = () => async dispatch =>
  tryCatchWrapper(async () => {
    const res = await axios.get('/orders');
    dispatch(ordersActions.populate(res.data));
  });

export const sendOrder = formData => async (dispatch, getState) =>
  tryCatchWrapper(async () => {
    const { firstName, lastName, email, phone } = formData;
    const { shoppingCart: products, orders } = getState();
    const id = orders.length + 1;
    const payload = {
      id,
      firstName,
      lastName,
      email,
      phone,
      products: products.map(({ productId, quantity }) => ({
        id: productId,
        quantity,
      })),
    };
    await axios.post('/orders', payload);
    dispatch(ordersActions.addItem(payload));
    return { orderID: id };
  });
