import '../../css/App.css';
import '../../css/style.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConfirmationComponent } from '../../ConfirmationComponent/ConfirmationComponent';
import { HomeComponent } from '../../HomeComponent/HomeComponent.js';
import { ContactComponent } from '../../ContactComponent/ContactComponent.js';
import { PageNotFoundComponent } from '../../PageNotFoundComponent.js';
import { ProductComponent } from '../../ProductComponent/ProductComponent';
import { ProductsComponent } from '../../ProductsComponent/ProductsComponent';
import { ShoppingCartComponent } from '../../ShoppingCartComponent/ShoppingCartComponent';
import { OrderComponent } from '../../OrderComponent/OrderComponent';
import { fetchProducts } from '../thunks/products-thunks';
import { fetchCart } from '../thunks/shopping-cart-thunks';

const Router = () => {
  const dispatch = useDispatch();

  // Fetch all data once
  // It will then be kept in the redux persistor until next refresh
  // (i.e. next time this useEffect hook will be called)
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <HomeComponent />
        </Route>
        <Route path='/confirmation'>
          <ConfirmationComponent />
        </Route>
        <Route path='/contact'>
          <ContactComponent />
        </Route>
        <Route path='/products'>
          <ProductsComponent />
        </Route>
        <Route path='/product/:id'>
          <ProductComponent />
        </Route>
        <Route path='/shopping-cart'>
          <ShoppingCartComponent />
        </Route>
        <Route path='/order'>
          <OrderComponent />
        </Route>
        <Route>
          <PageNotFoundComponent />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
