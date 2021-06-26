import React from 'react';
import './Product.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useStateValue} from '../context/ContextProvider';


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
            {/*<img className='product__image' src={image}/>
            <div className='product__body'>
                <h5 className='product__title'>{title}</h5>
                <p className='product__price'> Price: <strong>{`${price.toLocaleString('es-AR', {style: 'currency',currency: 'ARS', minimumFractionDigits: 0})}`}</strong></p>
                {!disableButton && <Button variant='outline-danger' className='product__button' onClick={addButtonHandler}>Lo Quiero!</Button>}
                {disableButton && <Button variant='outline-danger' className='product__button' onClick={removeButtonHandler}>Retirar</Button>}
            </div>*/}
            <Card style={{ width: '18rem', alignItems: 'center', color: '#0A1D37', boxShadow: '0.5px 0.5px 0.5px 1px #FFBD9B' }}>
              <Card.Img className='product__image' variant="top" src={image} />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Title><p className='product__price'> Price: <strong>{`${price.toLocaleString('es-AR', {style: 'currency',currency: 'ARS', minimumFractionDigits: 0})}`}</strong></p></Card.Title>
                {!disableButton && <Button variant='outline-danger' className='product__button' onClick={addButtonHandler}>Lo Quiero!</Button>}
                {disableButton && <Button variant='outline-danger' className='product__button' onClick={removeButtonHandler}>Retirar</Button>}
              </Card.Body>
            </Card>
        </div>
    )
}
export default Product