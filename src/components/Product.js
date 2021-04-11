import React from 'react';
import './Product.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardDeck from 'react-bootstrap/CardDeck';
import {useStateValue} from '../context/ContextProvider';
import CurrencyFormat from 'react-currency-format';
const Product = ({priceId, displayPrice, title, price, image, text, disableText, disableButton}) => {
    const [, dispatch] = useStateValue()
    const addButtonHandler = () => {
        dispatch(
            {
                type: 'ADD_TO_BASKET',
                item: {
                    priceId, 
                    title, 
                    price, 
                    text, 
                    image
                }
            });
    };
    const removeButtonHandler = () => {
        dispatch({
            type: 'REMOVE_ITEM',
            priceId
        })
    }
    return (
        <div className='product'>
           <CardDeck className='product__cardDeck'>
                <Card >
                    <Card.Body className='product__cardContainer'>
                        <div className='product__cardTitle'>
                            <Card.Title className='product__title' >{title}</Card.Title>
                        </div>
                        {!disableText && <Card.Text className='product__description'>
                                                    {text}
                                                </Card.Text>}
                        {displayPrice && <Card.Text>
                                                    <CurrencyFormat 
                                                renderText={(value) => (
                                                        <p> Price: <strong>{`${value}`}</strong></p>
                                                )}
                                                decimalState={2}
                                                value={price}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"$"}
                                            />
                                                </Card.Text>}
                    </Card.Body>
                    <div className='product__cardImage__container'>
                    <Card.Img className='product__cardImage'variant="bottom" src={image} />
                    </div>
                    <Card.Footer className='product__footer'>
                    {!disableButton && <Button onClick={addButtonHandler}variant="outline-danger">Lo Quiero!</Button>}
                    {disableButton && <Button onClick={removeButtonHandler}variant="outline-danger">Retirar</Button>}
                    </Card.Footer>
                </Card>
            </CardDeck> 
        </div>
    )
}
export default Product