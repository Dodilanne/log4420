import axios from 'axios';
import { tryCatchWrapper } from '../../utils';
import { productsActions } from '../store/products-reducer';

export const fetchProducts = () => async dispatch =>
  tryCatchWrapper(async () => {
    const res = await axios.get(`/products`);
    dispatch(productsActions.populate(res.data));
  });
