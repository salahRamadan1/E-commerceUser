import React, { useEffect } from 'react'
import screanImage from '../../images/Screenshot 2024-06-16 193441.png'
import image1 from '../../images/1.avif'
import image2 from '../../images/2.avif'
import image3 from '../../images/3.avif'
import image4 from '../../images/4.avif'
import image5 from '../../images/5.avif'
import image6 from '../../images/6.avif'
import './home.css'
import { Box } from '@mui/material'
import SearchNav from '../navbar/SearchNav'

export default function SliderHome() {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <>
            
            <div className='px-3  mt-1'>
                <img src={screanImage} alt="" className='w-100' />
                <div id="carouselExampleIndicators" className="carousel slide mb-2 mt-1">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active " aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={image1} className="d-block w-100 " alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={image2} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={image3} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={image4} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={image5} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src={image6} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon prevSlider bg-black rounded-5 text-white " aria-hidden="true" ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon nextSlider bg-black rounded-5 text-white" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


            </div >


        </>
    )
}
