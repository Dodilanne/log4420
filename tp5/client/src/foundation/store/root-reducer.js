import { combineReducers } from 'redux';
import shoppingCartReducer from './shopping-cart-reducer';
import productsReducer from './products-reducer';

const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer,
  products: productsReducer,
});

export default rootReducer;
