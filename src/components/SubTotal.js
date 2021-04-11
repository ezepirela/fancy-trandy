import React from 'react';
import './SubTotal.css';
import {getBasketTotalPrice} from '../hooks/reducer';
import {useStateValue} from '../context/ContextProvider';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CurrencyFormat from 'react-currency-format';
const SubTotal = ({payment}) => {
    const [{basket}] = useStateValue();
    return (
        <div className='subtotal'>
            <Card>
                <Card.Body>
                    <Card.Title className="subtotal__title">Your Shopping Basket</Card.Title>
                    <Card.Subtitle className="subtotal__subtitle text-muted">You have {basket?.length} picked products</Card.Subtitle>
                    <Card.Text>
                    <CurrencyFormat 
				        renderText={(value) => (
                                <p className='subtotal__value'> SubTotal: <strong>{`${value}`}</strong></p>
				        )}
                        decimalState={2}
                        value={getBasketTotalPrice(basket)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
			        />
                    </Card.Text>
                    <Card.Link><Button className='subtotal__button' onClick={payment}><p>Pay</p></Button></Card.Link>
                </Card.Body>
            </Card>

        </div>
    )
};
export default SubTotal;