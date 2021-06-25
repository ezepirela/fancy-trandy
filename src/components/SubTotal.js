import React, { useContext } from 'react';
import './SubTotal.css';
import { getBasketTotalPrice } from '../hooks/reducer';
import { useStateValue, UserContext } from '../context/ContextProvider';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const SubTotal = ({ payment }) => {
    const [{ basket }] = useStateValue();
    const authUser = useContext(UserContext);
    return (
        <div className='subtotal'>
            <Card>
                <Card.Body>
                    <Card.Title className="subtotal__title">This is Your Shopping Basket:</Card.Title>
                    <Card.Subtitle className="subtotal__subtitle text-muted"> You have {basket?.length} picked products</Card.Subtitle>
                    <Card.Text>
                        <p className='subtotal__value'> SubTotal: <strong>{`${getBasketTotalPrice(basket)}`}</strong></p>
                    </Card.Text>
                        <Card.Link className='subtotal__cardButton'>{authUser.token === false || authUser.token === null ? 
                            (<p >You need to be sign in before continue</p>) :
                            (<Button className='subtotal__button' 
                                onClick={payment}>Pay: {`${getBasketTotalPrice(basket)}`}</Button>) }
                        </Card.Link>
                </Card.Body>
            </Card>

        </div>
    )
};
export default SubTotal;