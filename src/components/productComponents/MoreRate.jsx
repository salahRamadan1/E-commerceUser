import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductMoreRate } from '../../service/product/actionProduct'
import { NavLink } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import { Alert, CircularProgress } from '@mui/material'
export default function MoreRate() {
    const urlImage = 'http://localhost:5001/product/'
    const dispatch = useDispatch();

    const { loadingMoreProductRate,
        errorMoreProductRate,
        errorMoreProductRateApi,
        dataProductMorRate } = useSelector((state) => state.product)

    useEffect(() => {

        dispatch(getProductMoreRate())

    }, [])
    return (
        <div className=' row g-3 shadow-lg border '>
            {errorMoreProductRate && <Alert severity='error' sx={{ width: "80%", marginY: "20px" }}>{errorMoreProductRate}</Alert>}
            {errorMoreProductRateApi && <Alert severity='error' sx={{ width: "80%", marginY: "20px" }}>{errorMoreProductRateApi}</Alert>}
            {!loadingMoreProductRate ? <>

                <h5 className='  text-center'>More Rate  </h5>




                <div className=' col-md-3'>
                    {dataProductMorRate.result && dataProductMorRate.result.slice(9).map((elm, i) => (
                        < div key={i} className='itemMore shadow-lg '>
                            <NavLink to={`/productDetails/${elm._id}`}>

                                <img src={urlImage + elm.image} className=' w-100 mb-1' alt="" />
                            </NavLink>

                            <p className='pMore d-flex align-items-center'> <StarIcon sx={{ fontSize: "13px", color: "rgb(250, 175, 0)" }} />{elm.rateCount} </p>
                        </div>

                    )).reverse()}
                </div>

                <div className=' col-md-3' >
                    {dataProductMorRate.result && dataProductMorRate.result.slice(0, 3).map((elm, i) => (
                        < div key={i} className='itemMore shadow-lg '>
                            <NavLink to={`/productDetails/${elm._id}`}>

                                <img src={urlImage + elm.image} className=' w-100 mb-1' alt="" />
                            </NavLink>

                            <p className='pMore d-flex align-items-center'> <StarIcon sx={{ fontSize: "13px", color: "rgb(250, 175, 0)" }} />{elm.rateCount} </p>

                        </div>

                    )).reverse()}
                </div>


                <div className=' col-md-3'>
                    {dataProductMorRate.result && dataProductMorRate.result.slice(3, 6).map((elm, i) => (
                        < div key={i} className='itemMore shadow-lg '>
                            <NavLink to={`/productDetails/${elm._id}`}>

                                <img src={urlImage + elm.image} className=' w-100 mb-1' alt="" />
                            </NavLink>

                            <p className='pMore d-flex align-items-center'> <StarIcon sx={{ fontSize: "13px", color: "rgb(250, 175, 0)" }} />{elm.rateCount} </p>

                        </div>

                    )).reverse()}
                </div>
                <div className=' col-md-3'>
                    {dataProductMorRate.result && dataProductMorRate.result.slice(6, 9).map((elm, i) => (
                        < div key={i} className='itemMore shadow-lg '>
                            <NavLink to={`/productDetails/${elm._id}`}>

                                <img src={urlImage + elm.image} className=' w-100 mb-1' alt="" />
                            </NavLink>

                            <p className='pMore d-flex align-items-center'> <StarIcon sx={{ fontSize: "13px", color: "rgb(250, 175, 0)" }} />{elm.rateCount} </p>

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
