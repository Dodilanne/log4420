import '../css/App.css';
import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from '../_Common/Header.js';
import { Footer } from '../_Common/Footer.js';
import { useEffect } from 'react';
import { pad } from '../utils';

export function ConfirmationComponent() {
  document.title = 'OnlineShop - Commande';

  const location = useLocation();
  const history = useHistory();

  const orders = useSelector(state => state.orders);
  const [orderInfo, setOrderInfo] = useState();

  const backToHome = () => history.replace('/');

  useEffect(() => {
    const { orderID } = location.state || {};
    if (!orderID) return backToHome();
    const order = orders.find(({ id }) => id === orderID);
    if (!order) return backToHome();
    const { firstName, lastName } = order;
    setOrderInfo({ orderID, name: `${firstName} ${lastName}` });
  }, []);

  return (
    <div>
      <Header />
      <main>
        {orderInfo && (
          <article>
            <h1>
              Votre commande est confirmée{' '}
              <span id='name'>{orderInfo.name}</span>!
            </h1>
            <p>
              Votre numéro de confirmation est le{' '}
              <strong id='confirmation-number'>{pad(orderInfo.orderID, 5)}</strong>.
            </p>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}
