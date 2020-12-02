import axios from 'axios';
import { tryCatchWrapper } from '../../utils';
import { productsActions } from '../store/products-reducer';

export const fetchProduct = async productID =>
  tryCatchWrapper(async () => {
    const res = await axios.get(`/products/${productID}`);
    return res.data;
  });

export const fetchProducts = () => async dispatch =>
  tryCatchWrapper(async () => {
    const res = await axios.get(`/products`);
    dispatch(productsActions.populate(res.data));
  });
