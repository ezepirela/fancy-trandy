import React from 'react';
import './OrderItem.css';

function OrderItem(props) {
	return (
		<div className='orderitem__card'>
		{props.basket.map(basket => 
			<li className='orderitem__card_item' key={basket._id}>
					<img className='orderitem__image' alt='imagen del producto' src={basket.image} />
					<div className='orderItem__cardMain'>
						<h6 className='orderitem__cardTitle'>{basket.title}</h6>
						<div className='orderitem__cardBody'>
							<p> Precio 
								<strong>
									{`${basket.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0})}`}
								</strong>
							</p>
						</div>
						<div className='orderitem__cardBody'><p id='orderitem__CardBody_description'> {`${basket.description}`}</p>  </div>
						<div className='orderitem__cardBody'><p>{`Comprado el ${props.date.slice(0,10)}`}</p></div>
					</div>
			</li>)}
		</div>
	)
}

export default OrderItem