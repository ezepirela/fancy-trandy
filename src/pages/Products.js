import React, { useEffect, useState } from 'react';
import './Products.css';
import Modal from '../components/shared/Modal';
import { useHttpClient } from '../hooks/http-request';
import ProductList from '../components/ProductList';
import '../sass/products.scss'
const Products =  () => {
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [products, setProducts] = useState();
    useEffect(() => {
        let response;
        const fetchProducts = async () => {
            try{
                response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}products`);
            }catch(e){
                console.log(e);
            }
            setProducts(response.products);
        };
        fetchProducts();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <React.Fragment>
        {!isLoading && error && <Modal showModal={error} message="Un error ha ocurrido. Carge la página nuevamente" clearError={clearError}/>}
        <div className='products'>
        <div className='orders__titleContainer'>
            <p className='stripe-textProducts'></p>
        </div>
            { !isLoading && products && <ProductList products={products}/>}
        </div>
        </React.Fragment>
    )
};
export default Products