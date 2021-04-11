import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CurrencyFormat from 'react-currency-format';
import './OrderItem.css';

function OrderItem(props) {
	return (
		<div className='orderitem__card'>
		{props.basket.map(basket =>
			<li key={basket.id}>
			 	<Card style={{ width: '15rem' }}>
				 	<Card.Img variant="top" src={basket.image} className='orderitem__image' />
					<Card.Body>
						<Card.Title className='orderitem__cardTitle'>{basket.title}</Card.Title>
					</Card.Body>
					<ListGroup className="list-group-flush">
					    <ListGroup.Item>
					    	<CurrencyFormat 
						        renderText={(value) => (
		                                <p> Product Price: <strong>{`${value}`}</strong></p>
						        )}
		                        decimalState={2}
		                        value={basket.price}
		                        displayType={"text"}
		                        thousandSeparator={true}
		                        prefix={"$"}
			        		/>
					    </ListGroup.Item>
					    <ListGroup.Item>{`Purchased: ${props.date.slice(0,10)} at ${props.date.slice(11,19)}`}</ListGroup.Item>
					</ListGroup>
				</Card>
			</li>)}
		</div>
	)
}

export default OrderItem