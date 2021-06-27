import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../hooks/http-request';
import Button from 'react-bootstrap/Button';
import { useStateValue } from '../context/ContextProvider';
import Modal from '../components/shared/Modal';
import './Product.css';
import './starability.css';
function Product() {
	const productId = useParams().productId;
	const { isLoading, sendRequest, error, clearError } = useHttpClient();
	const [product, setProduct] = useState();
	const [, dispatch] = useStateValue();
	const addButtonHandler = () => {
        dispatch(
            {
                type: 'ADD_TO_BASKET',
                item: {
                    _id: product._id, 
                    title: product.title, 
                    price: product.price, 
                    description: product.description, 
                    image: product.image
                }
            });
    };
	useEffect(() => {
		const fetchProduct = async () => {
			try{
				const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}products/${productId}`)
				setProduct(response);
			}
			catch(e){
				console.log(e);
			}
		}
		fetchProduct();
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<React.Fragment>
			{!isLoading && error && <Modal showModal={error} message="Un error ha ocurrido. Carge la página nuevamente" clearError={clearError}/>}
			<div className='individualProduct'>
				{!isLoading && product &&<section className='individualProduct__sectionImage'>
					<img alt='product' className='individualProduct__image' src={product.image} />
				</section>} 
				{!isLoading && product && <section className='individualProduct__info' >
					<h4>{product.title}</h4>
					<p>{product.description}</p>
					<p>Price: <strong>{`${product.price.toLocaleString('es-AR', {style: 'currency',currency: 'ARS', minimumFractionDigits: 0})}`}</strong></p>
					<Button variant='outline-danger' className='product__button' onClick={addButtonHandler}>Lo Quiero!</Button>
					<fieldset style={{width: '500px'}}className="starability-heart">
					  <legend className='product__legend'>Califica este producto:</legend>
					  <input type="radio" id="no-rate" class="input-no-rate" name="rating" value="0" checked aria-label="No rating." />
					  <input type="radio" id="first-rate1" name="rating" value="1" />
					  <label htmlFor="first-rate1" title="Terrible">1 star</label>
					  <input type="radio" id="first-rate2" name="rating" value="2" />
					  <label htmlFor="first-rate2" title="Not good">2 stars</label>
					  <input type="radio" id="first-rate3" name="rating" value="3" />
					  <label htmlFor="first-rate3" title="Average">3 stars</label>
					  <input type="radio" id="first-rate4" name="rating" value="4" />
					  <label htmlFor="first-rate4" title="Very good">4 stars</label>
					  <input type="radio" id="first-rate5" name="rating" value="5" />
					  <label htmlFor="first-rate5" title="Amazing">5 stars</label>
					</fieldset>
				</section>}
			</div>
		</React.Fragment>
	)
}

export default Product