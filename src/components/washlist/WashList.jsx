import React, { useEffect } from 'react'
import './washList.css'
import LockIcon from '@mui/icons-material/Lock';
import image from '../../images/1.avif'
import { Alert, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { getWashList } from '../../service/washList/actionWashList';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RemoveProductFromWashList from '../productComponents/RemoveProductFromWashList';
import AdProductToCart from '../productComponents/AdProductToCart';

export default function WashList() {
    const urlImage = 'http://localhost:5001/product/'

    const dipatch = useDispatch()
    const {
        datWashList,
        errorAddWashList,
        errorAddWashListNetWork } = useSelector((state) => state.washList)
    useEffect(() => {
        dipatch(getWashList())
    }, [])

    return (
        <div className=' mt-1'>
            <h4>WashList</h4>
            <hr />
            <div className='  d-flex  py-2  bg-secondary  h-50 rounded-2 w-25 justify-content-center  m-auto'>
                <p>default</p>
                <p className=' bg-primary text-white ms-2  px-2 me-1 rounded-5'>Default </p>
                <p>( {datWashList && datWashList.length}<LockIcon />)</p>

            </div>
            {errorAddWashList && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{errorAddWashList}</Alert>}
            {errorAddWashListNetWork && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{errorAddWashListNetWork}</Alert>}

            {!datWashList.length &&
                <Alert sx={{ width: "90%", marginX: "auto" , marginTop:"5px" }} severity='warning'>not found any items</Alert>

            }

            <div className=' row g-2'>

                {datWashList && datWashList.map((elm, i) => (

                    <div className='col-md-3 mb-2' key={i}>
                        <div className=' itemsProductHome  h-100  border border-1 p-2 shadow-lg'>
                            <img src={urlImage + elm.image} className=' text-center mx-auto d-flex   imageHomeProducts' alt="" />

                            <br />
                            <span className=' fw-bolder'>{elm.name}</span>
                            <p className=' fw-bolder   text-secondary w-75' style={{ fontSize: "13px" }}> {elm.description} </p>
                            <div className=' d-flex justify-content-between align-items-center'>
                                <p>EGP <span className=' fw-bolder fs-6'>{elm.price}</span>   <span className='dic'>{elm.discount}</span> <span className=' fw-bolder text-primary'>{((elm.discount / elm.price) * 100).toFixed()}%</span></p>

                                <p className=' car' style={{ fontSize: "10px" }}><LocalShippingIcon sx={{ fontSize: "16px", color: "blue" }} /> free delivery</p>
                            </div>
                            <div className=' d-flex justify-content-between  align-content-center' >

                                <Rating name="read-only" sx={{ fontSize: "16px", marginX: "auto", marginBottom: "5px" }} value={elm.ratingAverage} readOnly />
                            </div>
                            <div className=' d-flex align-items-center justify-content-center'>
                                <button className=' btn btn-primary w-75 me-2 d-flex justify-content-evenly' > Add To Cart --{'>'}

                                    <AdProductToCart productId={elm._id} />
                                </button>

                                <RemoveProductFromWashList productId={elm._id} />

                            </div>
                        </div>




                    </div>

                ))}
            </div>


        </div>
    )
}
