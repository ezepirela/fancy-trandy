import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../sass/Home.scss';
import './Home.css';  
import { useHttpClient } from '../hooks/http-request';
import Modal from '../components/shared/Modal';
import ProductList from '../components/ProductList';
const Home = () => {
    const { isLoading, sendRequest, error, clearError } = useHttpClient();
    const [products, setProducts] = useState();
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    useEffect(() => {
        let response;
        const fetchProducts = async () => {
            try{
                response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}products`);
                setProducts(response.products);
            }catch(e){
                console.log(e);
            }
            
        };
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sendRequest])
  
    return (
        <React.Fragment>
        {!isLoading && error && <Modal showModal={error} clearError={clearError} message='Un error ha ocurrido. Carge la página nuevamente'/>}
       <div className='home'>
            <div className='orders__Home'>
                <p className='stripe-textHome'></p>
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
                {!isLoading && products &&  <ProductList products={products}/> }
            </div> 
        </div>
        </React.Fragment>
    )
}
export default Home;