import React, { useEffect, useState } from 'react';
import './Products.css';
import Product from '../components/Product'; 
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
    }, [])
    console.log(products);
    return (
        <div className='products'>
        <div className='orders__titleContainer'>
            <p className='stripe-textProducts'></p>
        </div>
            { !isLoading && products && <ProductList products={products}/>}
        </div>
    )
};
export default Products