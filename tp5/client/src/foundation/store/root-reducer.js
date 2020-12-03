import { combineReducers } from 'redux';
import shoppingCartReducer from './shopping-cart-reducer';
import productsReducer from './products-reducer';
import ordersReducer from './orders-reducer';

const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer,
  products: productsReducer,
  orders: ordersReducer,
});

export default rootReducer;
