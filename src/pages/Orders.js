import React, {useEffect, useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useHttpClient} from '../hooks/http-request';
import {UserContext} from '../context/ContextProvider';
import OrderList from '../components/OrderList';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../sass/title.scss'  
import './Orders.css';  

const Orders = () => {
	const { isLoading, sendRequest} = useHttpClient()
	const authUser = useContext(UserContext);
	const userId = useParams().userId
	const [OrdersDB, setOrdersDB] = useState();
	useEffect(() => {
		let response;
		const fetchOrders = async () => {
			try{
				response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}payments/orders/${userId}`)
			}catch(e){
				console.log(e);
			}
			setOrdersDB(response.orders);
		};
		fetchOrders();


	}, [sendRequest, authUser, userId])

	return (
		<div className='orders'>
			<div className='orders__loadingSpinner'>
                {isLoading && <CircularProgress />}
            </div>
            <div className='orders__titleContainer'>
				{!isLoading && OrdersDB && <p className='stripe-text'></p>}
			</div>
			{!isLoading && OrdersDB && <OrderList loadedOrders={OrdersDB}/>}
			
		</div>
	);
};
export default Orders;