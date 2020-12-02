import axios from 'axios';
import { tryCatchWrapper } from '../../utils';

export const fetchProduct = async productID =>
  tryCatchWrapper(async () => {
    const res = await axios.get(`/products/${productID}`);
    return res.data;
  });

export const fetchProducts = async () =>
  tryCatchWrapper(async () => {
    const res = await axios.get(`/products`);
    return res.data;
  });
