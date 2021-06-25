import React, {useState} from 'react';
import Product from '../components/Product';
import Carousel from 'react-bootstrap/Carousel';
import '../sass/Home.scss';
import './Home.css';  
const Home = () => {
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
            text: 'Set completo de labiales con colores seductores de la linea Nude'
        },
        {
            title: 'Corrector Huda Beauty',
            price: 4,
            priceId: 'price_1IcdomFsyfu7OQPBDZz7qhaR',
            image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ma-scara-huda-beauty-1590049277.jpg',
            text: 'Gran corrector para el mejor delineado'
        }
    ]
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className='home'>
            <div className='orders__Home'>
                <h4 className='stripe-textHome'></h4>
            </div>
        <Carousel style={{marginTop: '20px'}} className='home__carousel' activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item className='home__carouselItem'>
                    <img
                    className='home__carousel_img'
                      src="https://images.unsplash.com/photo-1575686717697-f43bd36e74c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
                      alt="First slide"
                    />
                </Carousel.Item >
                <Carousel.Item className='home__carouselItem' >
                    <img
                        className='home__carousel_img'
                      src="https://d3ugyf2ht6aenh.cloudfront.net/stores/938/709/products/d9f64b75-60af-4806-8f0d-9bf76caefb77_nube-eedbbf3c4f03bec83216017634669535-1024-1024.jpg"
                      alt="Second slide"
                    />
                </Carousel.Item>
                 <Carousel.Item className='home__carouselItem' >
                    <img
                        className='home__carousel_img'
                      src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                      alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item className='home__carouselItem'>
                    <img
                      className='home__carousel_img'
                      src="https://images.unsplash.com/photo-1583241800698-e8ab01830a07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
                      alt="4th slide"
                    />
                   
                </Carousel.Item>
            </Carousel>
            <div className='home__products'>
                {product.map(item => (
                    <Product key={item.priceId} {...item} />
                ))}
            </div> 
        </div>
    )
}
export default Home;