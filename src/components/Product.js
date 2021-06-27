import React from 'react';
import './Product.css';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {useStateValue} from '../context/ContextProvider';


const Product = ({_id, title, price, description, image, disableButton, displayPrice, priceId}) => {
    const [, dispatch] = useStateValue()
    const addButtonHandler = () => {
        dispatch(
            {
                type: 'ADD_TO_BASKET',
                item: {
                    _id, 
                    title, 
                    price, 
                    description, 
                    image,
                    priceId
                }
            });
    };
    const removeButtonHandler = () => {
        dispatch({
            type: 'REMOVE_ITEM',
            _id
        })
    }
    return (
        <div className='product'> 
            <Card style={{ width: '18rem', alignItems: 'center', color: '#0A1D37', boxShadow: '0.5px 0.5px 0.5px 1px #FFBD9B' }}>
              <Link to={`/products/${_id}`}><Card.Img className='product__image' variant="top" src={image} /></Link>
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