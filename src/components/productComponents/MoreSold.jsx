import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductMoreSold } from '../../service/product/actionProduct'
import { NavLink } from 'react-router-dom'

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Alert, CircularProgress } from '@mui/material'
import PaginationProduct from './PaginationProduct'
export default function MoreSold() {
    const urlImage = 'http://localhost:5001/product/'
    const dispatch = useDispatch();
    const asd = []
    const { loadingMoreProductSold,
        errorMoreProductSold,
        errorMoreProductSoldApi,
        dataProductMorSold } = useSelector((state) => state.product)

    useEffect(() => {

        dispatch(getProductMoreSold())

    }, [])
    return (
        <>

            <div className=' row g-3 shadow-lg border justify-content-center align-items-center '>


                {errorMoreProductSold && <Alert severity='error' sx={{ width: "80%", marginY: "20px" }}>{errorMoreProductSold}</Alert>}
                {errorMoreProductSoldApi && <Alert severity='error' sx={{ width: "80%", marginY: "20px" }}>{errorMoreProductSoldApi}</Alert>}
                {!loadingMoreProductSold ?
                    <>

                        <h5 className='  text-center'>More reasons to shop</h5>

                        <div className=' col-md-3'>
                            {dataProductMorSold.result && dataProductMorSold.result.slice(9).map((elm, i) => (
                                < div key={i} className='itemMore shadow-lg  '>
                                    <NavLink to={`/productDetails/${elm._id}`}>

                                        <img src={urlImage + elm.image} className=' w-100 mb-1' alt="" />
                                    </NavLink>
                                    <p className='pMore'> <FavoriteIcon sx={{ fontSize: "13px", color: "red" }} />{elm.sold}</p>


                                </div>

                            )).reverse()}
                        </div>
                        <div className=' col-md-3'>
                            {dataProductMorSold.result && dataProductMorSold.result.slice(6, 9).map((elm, i) => (
                                < div key={i} className='itemMore shadow-lg  '>
                                    <NavLink to={`/productDetails/${elm._id}`}>

                                        <img src={urlImage + elm.image} className=' w-100 mb-1' alt="" />
                                    </NavLink>
                                    <p className='pMore'><FavoriteIcon sx={{ fontSize: "13px", color: "red" }} /> {elm.sold}</p>


                                </div>

                            )).reverse()}
                        </div>
                        <div className=' col-md-3'>
                            {dataProductMorSold.result && dataProductMorSold.result.slice(3, 6).map((elm, i) => (
                                < div key={i} className='itemMore shadow-lg  '>
                                    <NavLink to={`/productDetails/${elm._id}`}>

                                        <img src={urlImage + elm.image} className=' w-100 mb-1' alt="" />
                                    </NavLink>
                                    <p className='pMore'><FavoriteIcon sx={{ fontSize: "13px", color: "red" }} /> {elm.sold}</p>


                                </div>

                            )).reverse()}
                        </div>
                        <div className=' col-md-3' >
                            {dataProductMorSold.result && dataProductMorSold.result.slice(0, 3).map((elm, i) => (
                                < div key={i} className='itemMore shadow-lg  '>
                                    <NavLink to={`/productDetails/${elm._id}`}>

                                        <img src={urlImage + elm.image} className=' w-100 mb-1  ' alt="" />
                                    </NavLink>
                                    <p className='pMore'><FavoriteIcon sx={{ fontSize: "13px", color: "red" }} /> {elm.sold}</p>


                                </div>

                            )).reverse()}
                        </div>

                    </>
                    :

                    <div className=' d-flex justify-content-center  my-5'>
                        <CircularProgress />
                    </div>


                }








            </div>

        </>
    )
}
