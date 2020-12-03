import '../css/App.css';
import { useForm, FormProvider } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Header } from '../_Common/Header.js';
import { Footer } from '../_Common/Footer.js';
import Input from './Input';
import { validationSchema } from './form-utils';

export function OrderComponent() {
  document.title = 'OnlineShop - Commande';

  const formMethods = useForm({
    resolver: joiResolver(validationSchema),
  });

  const onSubmit = data => {
    console.log('Submit!');
  };

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
