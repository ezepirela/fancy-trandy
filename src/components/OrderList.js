import React from 'react';
import OrderItem from './OrderItem';
import './OrderList.css';
function OrderList({loadedOrders}) {
	if(loadedOrders.length === 0){
		return <h1>The users hasnt orders</h1>
	}
	return (
		<ul className='orderlist__list'>
				{loadedOrders.map(order => <OrderItem key={order.id} {...order}/>)}
		</ul>
	);
};

export default OrderList;