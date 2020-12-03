import '../css/App.css';
import { Header } from '../_Common/Header.js';
import { Footer } from '../_Common/Footer.js';
import { arrayFindByKey, formatPrice } from '../utils.js';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import ShoppingCartItem from './ShoppingCartItem';
import { clearCart } from '../foundation/thunks/shopping-cart-thunks';
import { Link } from 'react-router-dom';

export function ShoppingCartComponent() {
  document.title = 'OnlineShop - Panier';

  const dispatch = useDispatch();

  const ordersItems = useSelector(state =>
    state.shoppingCart.map(item => {
      const product = arrayFindByKey(state.products, item.productId, 'id');
      return {
        ...item,
        product,
        total: item.quantity * product.price,
      };
    })
  );

  const getTotal = useCallback(
    () => ordersItems.reduce((total, item) => total + item.total, 0),
    [ordersItems]
  );

  const clear = () => {
    dispatch(clearCart());
  }

  return (
    <div>
      <Header />
      <main>
        <article>
          <h1>Panier</h1>
          <div id='shopping-cart-container'>
            {ordersItems.length ? (
              <>
                <table className='table shopping-cart-table'>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Produit</th>
                      <th>Prix unitaire</th>
                      <th>Quantité</th>
                      <th>Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersItems.map(item => (
                      <ShoppingCartItem
                        key={`item-${item.productId}`}
                        {...item}
                      />
                    ))}
                  </tbody>
                </table>
                <p className='shopping-cart-total'>
                  Total:{' '}
                  <strong id='total-amount'>{formatPrice(getTotal())}</strong>
                </p>
                <Link className='btn pull-right' to='/order'>
                  Commander <i className='fa fa-angle-double-right'></i>
                </Link>
                <button className='btn' id='remove-all-items-button' onClick={clear}>
                  <i className='fa fa-trash-o'></i>&nbsp; Vider le panier
                </button>
              </>
            ) : (
              <p>Aucun produit dans le panier.</p>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
