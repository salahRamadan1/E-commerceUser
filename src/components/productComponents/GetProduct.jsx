import React, { useEffect } from 'react'
import image from '../../images/Screenshot 2024-06-16 193441.png'

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { Alert, CircularProgress, Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../service/product/actionProduct';
import { NavLink } from 'react-router-dom';
import AddProductToWashList from './AddProductToWashList';
import RemoveProductFromWashList from './RemoveProductFromWashList';


import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveProductFromCart from './RemoveProductFromCart';
import AdProductToCart from './AdProductToCart';
export default function GetProduct() {
    const urlImage = 'http://localhost:5001/product/'
    const dispatch = useDispatch();
    const {
        idsWashList,
    } = useSelector((state) => state.washList)

    const {
        idsCart
    } = useSelector((state) => state.cart)
    const { loading,
        error,
        dataProduct } = useSelector((state) => state.product)

    useEffect(() => {


        dispatch(getProduct())

    }, [])

    return (
        <div className=' my-5'>
            <h3 className=' fw-bolder'>Products</h3>


            <div className=' row g-2'>

                {error && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{error}</Alert>}



                {loading ?
                    <CircularProgress /> :
                    <>


                        {dataProduct.result && dataProduct.result.map((elm, i) => (
                            <div className=' col-md-3     ' key={elm._id}>
                                <div className=' itemsProduc tHome  h-100 border border-1   p-2  '>
                                    <div className=' d-flex justify-content-between mx-1'>

                                        {!idsCart.includes(elm._id) && !idsWashList.includes(elm._id) ?
                                            <>
                                                {!idsCart.includes(elm._id) ? < AdProductToCart productId={elm._id} /> : <RemoveProductFromCart productId={elm._id} />}
                                                {!idsWashList.includes(elm._id) ? < AddProductToWashList productId={elm._id} /> : <RemoveProductFromWashList productId={elm._id} />}

                                            </>
                                            :
                                            <>
                                                {idsCart.includes(elm._id) && <> {!idsCart.includes(elm._id) ? < AdProductToCart productId={elm._id} /> : <RemoveProductFromCart productId={elm._id} />}</>}

                                                {idsWashList.includes(elm._id) && <>  {!idsWashList.includes(elm._id) ? < AddProductToWashList productId={elm._id} /> : <RemoveProductFromWashList productId={elm._id} />}</>}
                                            </>


                                        }

                                    </div>
                                    <NavLink to={`/productDetails/${elm._id}`}>

                                        <img src={urlImage + elm.image} className=' text-center mx-auto d-flex   imageHomeProducts' alt="" />
                                    </NavLink>

                                    <br />
                                    <span className=' fw-bolder'>{elm.name}</span>
                                    <p className=' fw-bolder   text-secondary w-75' style={{ fontSize: "13px" }}>{elm.description}</p>
                                    <div className=' d-flex justify-content-between align-items-center'>
                                        <p>EGP <span className=' fw-bolder fs-5'>{elm.price}</span>   <span className='dic'>{elm.discount}</span> <span className=' fw-bolder text-primary'>{((elm.discount / elm.price) * 100).toFixed()}%</span></p>
                                        <p className=' car' style={{ fontSize: "10px" }}><LocalShippingIcon sx={{ fontSize: "16px", color: "blue" }} /> free delivery</p>
                                    </div>
                                    <div className=' d-flex justify-content-between  align-content-center' >
                                        <p> <ShoppingCartIcon sx={{ fontSize: "13px", color: "green" }} /> <span style={{ fontSize: "10px" }}> {elm.sold}+ sold recently</span> </p>
                                        <Rating name="read-only" sx={{ fontSize: "16px" }} value={elm.ratingAverage} readOnly />
                                    </div>

                                </div>


                            </div>
                        ))




                        }
                    </>
                }




            </div>
        </div >
    )
}
