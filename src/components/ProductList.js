import React from 'react';
import Product from './Product';
import './ProductList.css';
function ProductList({products}) {
	return (
		<div className='productList'>
			{products.map(item => (
                <Product key={item._id} displayPrice={true} className='products__item' {...item}/>
            ))}		
        </div>
	)
}

export default ProductList