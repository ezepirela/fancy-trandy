import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './OrderItem.css';

function OrderItem(props) {
	return (
		<div className='orderitem__card'>
		{props.basket.map(basket => 
			<li key={basket.id}>
			 	<Card className='orderitem__cardList' style={{ maxWidth: '217px', alignItems: 'center', color: '#0A1D37', boxShadow: '0.5px 0.5px 0.5px 1px #FFBD9B'}}>
				 	<Card.Img variant="center" src={basket.image} className='orderitem__image' />
					<Card.Body style={{padding: '0'}} >
						<Card.Title style={{margin: '0', paddingTop: '10px'}} id='orderitem__cardTitle'>{basket.title}</Card.Title>
					</Card.Body>
					<ListGroup  className="list-group-flush orderitem__info">
					    <ListGroup.Item style={{padding: '0'}} >
                            <p> Price: <strong>{`${basket.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0})}`}</strong></p>  
					    </ListGroup.Item>
					    <ListGroup.Item style={{padding: '0'}} >{`Purchased: ${props.date.slice(0,10)}`}</ListGroup.Item>
					</ListGroup>
				</Card>
			</li>)}
		</div>
	)
}

export default OrderItem