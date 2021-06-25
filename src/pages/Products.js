import React from 'react';
import './Products.css';
import Product from '../components/Product'; 
import { v4 as uuidv4 } from 'uuid';
import '../sass/products.scss'
const Products =  () => {
    const product = [
        {
            title: 'Set de Labiales',
            priceId: 'price_1IcYTkFsyfu7OQPBhBJaritZ',
            price: 22,
            image: 'https://janireviguri.com/wp-content/uploads/2019/03/labialesHuda.png',
            text: "hermoso set de labiales de Huda Beauty colores pastel"
        },
        {
            title: 'Sombra de Ojos',
            price: 30,
            priceId: 'price_1Icdj1Fsyfu7OQPBPmiBxaL5',
            text: 'Perfecto conjunto de sombra para cada ocasion',
            image: 'https://images-na.ssl-images-amazon.com/images/I/71l76Jc7efL._SL1500_.jpg'
        },
        {
            title: 'Base de Maquillaje',
            price: 6,
            priceId: 'price_1IcdlHFsyfu7OQPBZz79hpYm',
            image: 'https://basesdemaquillaje.com/wp-content/uploads/base-faux-filter.jpg',
            text: 'Preciosa base perfecta para salidas nocturnas',
        },
        {
            title: 'Kit Labiales Nude',
            price: 30,
            priceId: 'price_1IcdnlFsyfu7OQPBHKkYTmC2',
            image: 'https://http2.mlstatic.com/D_NQ_NP_879670-MLV41815246161_052020-W.jpg',
            text: 'Set completo de labiales con colores seductores linea Nude'
        },
        {
            title: 'Corrector',
            price: 4,
            priceId: 'price_1IcdomFsyfu7OQPBDZz7qhaR',
            image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ma-scara-huda-beauty-1590049277.jpg',
            text: 'Gran corrector para el mejor delineado'
        },
        {
            title: 'Set de Labiales',
            priceId: 'price_1IcYTkFsyfu7OQPBhBJaritZ',
            price: 22,
            image: 'https://janireviguri.com/wp-content/uploads/2019/03/labialesHuda.png',
            text: "hermoso set de labiales de Huda Beauty colores pastel"
        },
        {
            title: 'Sombra de Ojos',
            price: 30,
            priceId: 'price_1Icdj1Fsyfu7OQPBPmiBxaL5',
            text: 'Perfecto conjunto de sombra para cada ocasion',
            image: 'https://images-na.ssl-images-amazon.com/images/I/71l76Jc7efL._SL1500_.jpg'
        },
        {
            title: 'Base de Maquillaje',
            price: 6,
            priceId: 'price_1IcdlHFsyfu7OQPBZz79hpYm',
            image: 'https://basesdemaquillaje.com/wp-content/uploads/base-faux-filter.jpg',
            text: 'Preciosa base perfecta para salidas nocturnas',
        },
        {
            title: 'Kit Labiales Nude',
            price: 30,
            priceId: 'price_1IcdnlFsyfu7OQPBHKkYTmC2',
            image: 'https://http2.mlstatic.com/D_NQ_NP_879670-MLV41815246161_052020-W.jpg',
            text: 'Set completo de labiales con colores seductores linea Nude'
        },
        {
            title: 'Corrector',
            price: 4,
            priceId: 'price_1IcdomFsyfu7OQPBDZz7qhaR',
            image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ma-scara-huda-beauty-1590049277.jpg',
            text: 'Gran corrector para el mejor delineado'
        }
    ]
    return (
        <div className='products'>
        <div className='orders__titleContainer'>
            <h4 className='stripe-textProducts'></h4>
        </div>
            {product.map(item => (
                <Product key={uuidv4()} displayPrice={true} className='products__item'{...item}/>
            ))}
        </div>
    )
};
export default Products