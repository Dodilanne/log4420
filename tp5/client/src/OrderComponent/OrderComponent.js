import '../css/App.css';
import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Header } from '../_Common/Header.js';
import { Footer } from '../_Common/Footer.js';
import Input from './Input';
import { validationSchema } from './form-utils';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder } from '../foundation/thunks/orders-thunks';
import { clearCart } from '../foundation/thunks/shopping-cart-thunks';
import { useEffect } from 'react';

export function OrderComponent() {
  document.title = 'OnlineShop - Commande';

  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector(state => state.shoppingCart);
  const formMethods = useForm({
    resolver: joiResolver(validationSchema),
  });

  const onSubmit = async formData => {
    const { success, data } = await dispatch(sendOrder(formData));
    if (success) {
      const { orderID } = data;
      dispatch(clearCart());
      history.push({ pathname: '/confirmation', state: { orderID } });
    } else {
      alert(
        'Une erreur est survenue lors de la sauvegarde de votre commande. \nVeuillez vérifier vos informations ou nous contacter.'
      );
    }
  };

  useEffect(() => {
    if (!cart.length) {
      history.replace('/shopping-cart');
    }
  }, []);

  return (
    <div>
      <Header />
      <main>
        <FormProvider {...formMethods}>
          <article>
            <h1>Commande</h1>
            <form id='order-form' onSubmit={formMethods.handleSubmit(onSubmit)}>
              <section>
                <h2>Contact</h2>
                <div className='row'>
                  <Input name='firstName' label='Prénom' />
                  <Input name='lastName' label='Nom' />
                </div>
                <div className='row'>
                  <Input name='email' label='Adresse courriel' type='email' />
                  <Input
                    name='phone'
                    label='Téléphone'
                    type='tel'
                    placeholder='###-###-####'
                  />
                </div>
              </section>
              <section>
                <h2>Paiement</h2>
                <div className='row'>
                  <Input
                    name='creditCard'
                    label='Numéro de carte de crédit'
                    placeholder='•••• •••• •••• ••••'
                  />
                  <Input
                    name='expiry'
                    label='Expiration (mm/aa)'
                    placeholder='mm/aa'
                  />
                </div>
              </section>
              <button className='btn pull-right' type='submit'>
                Payer <i className='fa fa-angle-double-right'></i>
              </button>
            </form>
          </article>
        </FormProvider>
      </main>
      <Footer />
    </div>
  );
}
