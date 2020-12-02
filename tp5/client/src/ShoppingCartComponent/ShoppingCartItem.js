import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProductQuantity } from '../foundation/thunks/shopping-cart-thunks';
import { formatPrice } from '../utils';

const ShoppingCartItem = ({
  product: { id, name, price },
  quantity,
  total,
}) => {
  const dispatch = useDispatch();

  const updateQuantity = newQuantity => {
    dispatch(
      updateProductQuantity({ productId: parseInt(id), quantity: newQuantity })
    );
  };

  const addOne = () => updateQuantity(quantity + 1);

  const removeOne = () => updateQuantity(quantity - 1);

  return (
    <tr>
      <td>
        <button className='remove-item-button' title='Supprimer'>
          <i className='fa fa-times'></i>
        </button>
      </td>
      <td>
        <Link to={`./product/${id}`}>{name}</Link>
      </td>
      <td>{formatPrice(price)}</td>
      <td>
        <div className='row'>
          <div className='col'>
            <button
              className='remove-quantity-button'
              title='Retirer'
              disabled={quantity <= 1 ? 'disabled' : ''}
              onClick={removeOne}
            >
              <i className='fa fa-minus'></i>
            </button>
          </div>
          <div className='col quantity'>{quantity}</div>
          <div className='col'>
            <button
              className='add-quantity-button'
              title='Ajouter'
              onClick={addOne}
            >
              <i className='fa fa-plus'></i>
            </button>
          </div>
        </div>
      </td>
      <td className='price'>{formatPrice(total)}</td>
    </tr>
  );
};

export default ShoppingCartItem;
