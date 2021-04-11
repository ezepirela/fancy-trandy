import React from 'react';
import {useStateValue} from '../context/ContextProvider';
import "./CheckoutProduct.css"
function CheckoutProduct({id, title, price, image, rating, hiddenButton}) {
	const [, dispatch] = useStateValue();
	function removeFromBasket () {
		dispatch({
			type: 'REMOVE_ITEM',
			id
		});
	}
	return (
		<div className='checkoutproduct'>
			<img className='checkoutproduct__image'src={image} alt=''/>
			<div className='checkoutproduct__info'>
				<p className='checkoutproduct__title'>{title}</p>
				<p className='checkoutproduct__price'>
				<small>$</small><strong>{price}</strong>
				</p>
				{!hiddenButton && <button onClick={removeFromBasket}>Remove From Basket</button>}
			</div>
		</div>
	)
}

export default CheckoutProduct