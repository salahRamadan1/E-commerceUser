import React, { useEffect } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import image from '../../images/1.avif'
import { Alert, CircularProgress, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './cart.css'
import { useDispatch, useSelector } from 'react-redux';
import AddProductToWashList from '../productComponents/AddProductToWashList';
import PlusCart from './PlusCart';
import Minus from './Minus';
import ApplyCoupon from './ApplyCoupon';
import RemoveProductFromCart from '../productComponents/RemoveProductFromCart';
import Location from './Location';
export default function Cart() {
    // 1. Data Fetching and Error Handling:
    const urlImage = 'http://localhost:5001/product/' // URL Image
    const dipatch = useDispatch()
    const {
        loadingGetCart,
        errorGetCart,
        errorGetCartNetWork,
        dataCart,
    } = useSelector((state) => state.cart)

    return (

        <div className=' mt-3'>
            {/* Error Handling */}


            {loadingGetCart ?
                <CircularProgress sx={{ display: 'flex', marginX: "auto" }} /> :
                <>
                    {/* Cart details and order summary are displayed here if data is loaded  */}
                    <p className=' fw-bolder fs-5'>Cart <span className=' fw-light fs-6'>( {dataCart.cartItems && dataCart.cartItems.length} items)</span>  </p>
                    {dataCart.cartItems && !dataCart.cartItems.length &&
                        <Alert sx={{ width: "90%", marginX: "auto", marginTop: "5px" }} severity='warning'>not found any items</Alert>

                    }
                    <div className='  row align-items-start g-5'>
                        <div className=' col-md-8  align-items-start   '>

                            {dataCart.cartItems && dataCart.cartItems.map((elm, i) => (


                                <div className=' row     mb-3  ' key={i}>
                                    <div className=' col-md-4'>

                                        <img src={urlImage + elm.productId.image} className='  w-100  me-3      imagCart ' alt="" />


                                    </div>
                                    <div className=' col-md-4'>
                                        <span className=' fw-bolder'>{elm.productId.name}</span>


                                        <br />
                                        <span className=' text-secondary'>{elm.productId.description}</span>
                                        <br />
                                        <span className=' text-black fw-bolder'>Order in the next 46 m</span>
                                        <br />
                                        <span className=' text-black fw-bolder'>Get it Tomorrow</span>
                                        <br />
                                        <span className=' text-black fw-bolder'>Sold by noon</span>
                                        <p style={{ fontSize: "13px" }}>This item cannot be exchanged or returned.</p>
                                    </div>
                                    {/* ... other product details ... */}
                                    <div className=' col-md-4 d-flex text-center  justify-content-center '>
                                        <div>
                                            <p>EGP <span className=' fw-bolder fs-6'>{elm.productId.price}</span>   <span className='dic'>{elm.productId.discount}</span> <span className=' fw-bolder text-primary'>{((elm.productId.discount / elm.productId.price) * 100).toFixed()}%</span></p>
                                            <p>Price <span className=' fw-bolder fs-6'>{elm.productId.priceAfterDiscount}</span> </p>
                                            <p>total {(elm.price * elm.qountity).toFixed(2)} </p>
                                            <p className=' car' style={{ fontSize: "10px" }}><LocalShippingIcon sx={{ fontSize: "16px", color: "blue" }} /> free delivery</p>

                                            <div className=' d-flex justify-content-between'>
                                                <PlusCart productId={elm.productId._id} />
                                                <p>{elm.qountity}</p>
                                                {elm.qountity !== 1 &&

                                                    <Minus productId={elm.productId._id} />
                                                }
                                            </div>
                                            <div className=' d-flex align-items-center justify-content-between'>
                                                <AddProductToWashList productId={elm.productId._id} />

                                                <RemoveProductFromCart productId={elm.productId._id} />


                                            </div>
                                        </div>
                                    </div>
                                    <hr className=' my-2' />
                                </div>
                            ))}
                        </div>
                        {dataCart.cartItems && dataCart.cartItems.length !== 0 &&
                            <div className='col-md-4 shadow-lg border border-1 p-3 mt-3  h-100 mt-5 '>
                                <h4>Order Summary</h4>
                                {dataCart.discount === 0 ?
                                    <ApplyCoupon />
                                    :
                                    <>
                                        {
                                            dataCart.usedCoupon &&
                                            <p className=' fw-bolder text-success  text-center'> You used a coupon</p>

                                        }

                                    </>
                                }
                                <div className=' d-flex justify-content-between'>
                                    <p className=' text-secondary'>Subtotal  ({dataCart.cartItems.length} items)</p>
                                    <p>{(dataCart.totalPrice).toFixed(2)}</p>
                                </div>
                                <div className=' d-flex justify-content-between'>
                                    <p className=' text-secondary'>Shipping Fee
                                    </p>
                                    <p className=' text-success-emphasis fw-bolder'>FREE</p>
                                </div>
                                <hr />
                                {dataCart.discount !== 0 && <div className=' d-flex justify-content-between'>
                                    <p>EGP <span className=' fw-bolder fs-6 dic'>{dataCart.totalPrice}</span> </p>
                                    <p className=' text-success fw-bolder '>{dataCart.discount}% off</p>
                                </div>}

                                <div className=' d-flex justify-content-between'>
                                    <p className=' fw-bolder'>  Total   <span className=' fw-light'>(Inclusive of VAT)</span>  </p>
                                    <p className=' fw-bolder text-end'>EGP {(dataCart.discount !== 0 ? dataCart.totalPriceAfterDiscount : dataCart.totalPrice).toFixed(2)}
                                        <br />



                                    </p>
                                </div>

                                <div className=' d-flex justify-content-evenly'>
                                    <button className=' btn btn-primary'> Cash</button>
                                    <button className=' btn btn-primary'> Payment</button>
                                    <Location />

                                </div>
                                <button className=' btn btn-success my-2   w-100'>Buy</button>
                            </div>

                        }


                    </div>

                </>



            }
            {errorGetCart && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{(errorGetCart).toUpperCase()}</Alert>}
            {errorGetCartNetWork && <Alert sx={{ width: "90%", marginX: "auto" }} severity='error'>{errorGetCartNetWork}</Alert>}
        </div>
    )
}

