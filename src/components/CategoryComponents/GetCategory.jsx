import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCategory } from '../../service/Category/actionCategory';
import { Alert, Typography } from '@mui/material';
import CategorySearch from './CategorySearch';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from 'react-router-dom';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 12
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 9
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
export default function GetCategory() {
    // 1. Data Fetching and Error Handling:
    const urlImage = 'http://localhost:5001/category/'
    const dispatch = useDispatch();
    const { dataCategory, error, loading } = useSelector((state) => state.category)
    useEffect(() => {
        dispatch(getCategory())
    }, [])

    return (
        <>
            {dataCategory.result &&
                <Carousel responsive={responsive}>

                    {dataCategory.result.length && dataCategory.result.map((elm, i) => (<div className=' me-2' key={i}>

                        <NavLink to={`/PoductSpecificCategory/${elm._id}`}>
                            <img src={urlImage + elm.image} className=' rounded-2 w-100       ' alt="" />
                        </NavLink>


                    </div>

                    ))}
                </Carousel>

            }

        </>
    )
}
