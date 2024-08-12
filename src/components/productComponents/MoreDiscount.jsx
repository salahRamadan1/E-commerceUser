import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductMoreDiscount } from '../../service/product/actionProduct'
import { NavLink } from 'react-router-dom'
import { Alert, CircularProgress } from '@mui/material'

export default function MoreDiscount() {
    const urlImage = 'http://localhost:5001/product/'
    const dispatch = useDispatch();

    const { loadingMoreProductdDiscount,
        errorMoreProductdDiscount,
        errorMoreProductdDiscountApi,
        dataProductMorDiscount } = useSelector((state) => state.product)

    useEffect(() => {

        dispatch(getProductMoreDiscount())

    }, [])
    return (
        <div className=' row g-3 shadow-lg border '>


            {errorMoreProductdDiscount && <Alert severity='error' sx={{ width: "80%", marginY: "20px" }}>{errorMoreProductdDiscount}</Alert>}
            {errorMoreProductdDiscountApi && <Alert severity='error' sx={{ width: "80%", marginY: "20px" }}>{errorMoreProductdDiscountApi}</Alert>}

            {!loadingMoreProductdDiscount ?
                <>

                    <h5 className='  text-center'>More Discount  </h5>
                    <div className=' col-md-3'>
                        {dataProductMorDiscount.result && dataProductMorDiscount.result.slice(9).map((elm, i) => (
                            < div key={i} className='itemMore shadow-lg  '>
                                <NavLink to={`/productDetails/${elm._id}`}>

                                    <img src={urlImage + elm.image} className=' w-100 mb-1' alt="" />
                                </NavLink>

                                <p className='pMore dic'>{elm.discount} EG  </p>
                            </div>

                        )).reverse()}
                    </div>

                    <div className=' col-md-3' >
                        {dataProductMorDiscount.result && dataProductMorDiscount.result.slice(0, 3).map((elm, i) => (
                            < div key={i} className='itemMore shadow-lg'>
                                <NavLink to={`/productDetails/${elm._id}`}>

                                    <img src={urlImage + elm.image} className=' w-100 mb-1' alt="" />
                                </NavLink>

                                <p className='pMore dic'>{elm.discount} EG</p>
                            </div>

                        )).reverse()}
                    </div>
                    <div className=' col-md-3'>
                        {dataProductMorDiscount.result && dataProductMorDiscount.result.slice(6, 9).map((elm, i) => (
                            < div key={i} className='itemMore shadow-lg'>
                                <NavLink to={`/productDetails/${elm._id}`}>

                                    <img src={urlImage + elm.image} className=' w-100 mb-1 ' alt="" />
                                </NavLink>

                                <p className='pMore dic'>{elm.discount} EG</p>
                            </div>
                        )).reverse()}
                    </div>

                    <div className=' col-md-3'>
                        {dataProductMorDiscount.result && dataProductMorDiscount.result.slice(3, 6).map((elm, i) => (
                            < div key={i} className='itemMore shadow-lg'>
                                <NavLink to={`/productDetails/${elm._id}`}>

                                    <img src={urlImage + elm.image} className=' w-100 mb-1' alt="" />
                                </NavLink>

                                <p className='pMore dic'>{elm.discount} EG</p>
                            </div>

                        )).reverse()}
                    </div>
                </> :

                <div className=' d-flex justify-content-center  my-5'>
                    <CircularProgress />
                </div>



            }

        </div>
    )
}
