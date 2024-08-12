
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getBrands } from '../../service/brand/actionBrand';
import { Alert, Typography } from '@mui/material';
import BrandSearch from './BrandSearch';
export default function GetBrand() {
    const urlImage = 'http://localhost:5001/brand/'
    const dispatch = useDispatch();
    const { dataBrands, error, loading } = useSelector((state) => state.brand)
    useEffect(() => {
        dispatch(getBrands())

    }, [])
    return (
        <div>

            <Typography sx={{ paddingLeft: "20px", color: "white", marginBottom: "10px", textAlign: "center" }} variant='h4' >Brands</Typography>
            <BrandSearch />
            {/* <CategorySearch /> */}
            {error && <Alert severity='error' >{error}</Alert>}
            <div className='text-center'>
                {loading && <div className="spinner-border text-primary    text-center   fw-bold  " role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
            </div>
            <div className=' row g-4 justify-content-evenly mb-2 mouseCursor'>
                {dataBrands.result && dataBrands.result.map((elm, i) => (
                    <div className=' col-md-3   pt-3 ' key={i}>
                        <img src={urlImage + elm.image} className=' rounded-2 w-100 imgBrands pb-1 ' alt="" />
                      

                    </div>
                ))}

            </div>



        </div>
    )
}
