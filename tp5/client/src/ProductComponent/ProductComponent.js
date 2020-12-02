import '../css/App.css';
import { Header } from '../_Common/Header.js';
import { Footer } from '../_Common/Footer.js';
import { useParams } from 'react-router-dom';
import { imageMap } from '../ProductsComponent/ProductImageLoader';
import { useState } from 'react';
import { addProductToCart } from '../foundation/thunks/shopping-cart-thunks';
import { formatPrice, arrayFindByID } from '../utils';
import useDialog from '../foundation/hooks/useDialog';
import { useSelector } from 'react-redux';

export function ProductComponent() {
  document.title = 'OnlineShop - Produit';
  const { id } = useParams();

  const product = useSelector(state => arrayFindByID(state.products, id));
  const [quantity, setQuantity] = useState(1);
  const dialog = useDialog();

  const onQuantityChangeEvent = ({ target: { value } }) => setQuantity(value);

  const addItem = async () => {
    const res = await addProductToCart({ productId: id, quantity });
    if (res.success) dialog.show();
  };

  let content;
  if (product) {
    content = (
      <article>
        <h1 id='product-name'>{product.name}</h1>
        <div className='row'>
          <div className='col'>
            <img
              alt='product'
              src={imageMap[product.image]}
              id='product-image'
            />
          </div>
          <div className='col'>
            <section>
              <h2>Description</h2>
              <p id='product-desc'>{product.description}</p>
            </section>
            <section>
              <h2>Caractéristiques</h2>
              <ul id='product-features'>
                {product.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
            <hr />
            <form className='pull-right' id='add-to-cart-form'>
              <label htmlFor='product-quantity'>Quantité:</label>
              <input
                className='form-control'
                type='number'
                min='1'
                id='product-quantity'
                value={quantity}
                onChange={onQuantityChangeEvent}
              />
              <button
                className='btn'
                title='Ajouter au panier'
                type='button'
                onClick={addItem}
              >
                <i className='fa fa-cart-plus'></i>&nbsp; Ajouter
              </button>
            </form>
            <p>
              Prix:{' '}
              <strong id='product-price'>{formatPrice(product.price)}</strong>
            </p>
          </div>
        </div>
        {dialog.isVisible && (
          <div className='dialog' id='dialog'>
            Le produit a été ajouté au panier.
          </div>
        )}
      </article>
    );
  } else {
    console.error('Invalid ID specified');
    content = (
      <article>
        <h1>Produit non trouvée!</h1>
      </article>
    );
  }
  return (
    <div>
      <Header currentActive='product' />
      <main>{content}</main>
      <Footer />
    </div>
  );
}
