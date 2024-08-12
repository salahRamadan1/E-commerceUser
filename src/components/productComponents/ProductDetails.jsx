import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { getOneProduct } from '../../service/product/actionProduct';
import { Alert, CircularProgress } from '@mui/material';
import GetReview from './reviewComponent/GetReview';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
export default function ProductDetails() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { loadingOneProduct,
        errorOneProduct,
        errorOneProductApi, oneProduct } = useSelector((state) => state.product)
    const urlImage = 'http://localhost:5001/product/'

    useEffect(() => {

        dispatch(getOneProduct(id))
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className=' mt-2 p-2'>



            {oneProduct &&

                <div className=' row justify-content-center shadow-lg align-items-center py-2'>

                    {/* item image */}
                    <div className=' col-md-4  '>
                        <div className=' d-flex align-items-center'>
                            <div>
                                {oneProduct.images ? oneProduct.images.map((elm, i) => (
                                    <div className='   me-1' key={i}>
                                        <img src={urlImage + elm} className=' imagesOneProduct  ' alt="" />

                                    </div>
                                )) : ""}

                            </div>
                            <img src={urlImage + oneProduct.image} className='imageOneProduct       ' alt="" />
                        </div>
                        <div className=' d-flex align-items-center justify-content-center'>
                            <button className=' btn btn-primary w-75' > Add To Cart</button>
                            <span className='   border border-2 rounded-3 p-1 ms-3 mb-1' style={{ cursor: "pointer" }} >
                                <FavoriteBorderIcon />
                            </span>
                        </div>
                    </div>
                    {/* info */}
                    <div className=' col-md-4'>
                        <div>
                            <h4 className=' text-secondary  mb-3'>   {oneProduct.name}</h4>
                            <h5>{oneProduct.description}</h5>
                            <p >WS: <span className=' dic'>{oneProduct.price}</span> </p>
                            <p>Now:     <span className=' fw-bolder fs-4 mx-3'>EGP{oneProduct.priceAfterDiscount}</span>        Inclusive of VAT</p>
                            <p>Saving: <span className=' fw-bolder fs-6'>EGP{oneProduct.price}</span>    <span className=' fw-bolder text-success'>{((oneProduct.discount / oneProduct.price) * 100).toFixed()}% Off</span></p>
                            <p> <ShoppingCartIcon sx={{ color: "green" }} /> <span   > {oneProduct.sold}+ sold recently</span> </p>

                        </div>


                    </div>
                    {/* third */}
                    <div className=' col-md-4'>
                        <p><CheckCircleOutlineIcon /> No warranty</p>
                        <hr className=' w-75 mx-auto' />
                        <p><TextSnippetIcon /> Free delivery on Lockers & Pickup Points</p>
                        <hr className=' w-75 mx-auto' />
                        <p><KeyboardReturnIcon />This item cannot be exchanged or returned</p>
                        <hr />
                        {/* brand */}
                        <h6 >Brand</h6>
                        {/* <p className=' fw-bolder'>{oneProduct.brandId.name}</p> */}
                        <NavLink>

                            <img src={oneProduct.brandId && `http://localhost:5001/brand/${oneProduct.brandId.image}`} className=' w-100' alt="" />
                        </NavLink>
                    </div>


                </div>
            }


            <GetReview id={id} />
        </div>









    )
}
