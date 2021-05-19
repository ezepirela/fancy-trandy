import React, {useContext} from 'react';
import './Pricing.css';
import {useHttpClient} from '../hooks/http-request';
import Product from '../components/Product';
import {useStateValue, UserContext} from '../context/ContextProvider';
import {getBasketTotalPrice} from '../hooks/reducer';
import SubTotal from '../components/SubTotal';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../components/shared/Modal';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IQkB1Fsyfu7OQPBzMqFTLhg5WFNws1E1aM9MRxhdC2V1OpjysYbfbxi54JDKVmIYSx7GRviosUw9ckkQ7jKJOdE00YdYKTob7'
);
const Pricing2 = () => {
    const authUser = useContext(UserContext);
    const [{basket}, dispatch] = useStateValue();
    const {sendRequest, error, clearError} = useHttpClient();
    let arrayProp= [];
    basket?.forEach(objecto => {for(const property in objecto){
        if(property === 'priceId'){
            arrayProp.push({price: objecto[property], quantity: 1})
        }
    }})
    const createOrder = async () => {
        let orderResponse;
        try{
        orderResponse = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}payments/orders`, 'POST',
            JSON.stringify({amount: getBasketTotalPrice(basket), basket: basket, user: authUser.userId}),
             {'Content-Type': 'application/json', "Authorization": 'Bearer ' + authUser.token})  
        }catch(e){
            console.log(e)
        }
        console.log(orderResponse);
        dispatch({type: 'CLEAN_BASKET'})
    }
    const handleClick = async (e) => {
        const stripe = await stripePromise;
        let response;
        try{
            response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}create-checkout-session`, 'POST',
            JSON.stringify({arrayProp}), {'Content-Type': 'application/json', "Authorization": 'Bearer ' + authUser.token})
        }catch(e){
            
        }
        console.log(response) 
        try {
            createOrder();
            await stripe.redirectToCheckout({sessionId: response.sessionId})
        }catch(e){
           
        }
    }
    const defaultMessage = <h1 className='pricing__defaultMessage'>Sorry, you not have products selected.</h1>
    return (
        <div className='pricing'>
            <Modal showModal={error} authMessage={error} clearError={clearError}/>
            <section className='pricing__productsContainer'>
                {basket?.length === 0 ? defaultMessage : (
                    <div className='pricing__resume'>
                        <h2 className='pricing__productsTitle'>{authUser.token === false || authUser.token === null ? 'SignUp to continue before payment ' : `welcome ${authUser.firstname} ${authUser.lastname}` }</h2>
                        <div className='pricing__products'>
                        {basket?.map(product => (
                            <Product key={uuidv4()} {...product} displayPrice={true} disableText={true} disableButton={true}/>
                         ))}
                         </div>
                    </div>  
                )}   
                </section>  
                <aside className='pricing__subtotal'>
                    <SubTotal payment={handleClick}/>
                </aside>  
        </div>
        
    )
}
export default Pricing2;