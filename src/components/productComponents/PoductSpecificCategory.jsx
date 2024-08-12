import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { getProductSpecificCategory } from '../../service/product/actionProduct'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Alert, CircularProgress, Rating } from '@mui/material';
import { makeStateIsEmpityProduct } from '../../service/product/productSlice'
import AddProductToWashList from './AddProductToWashList'
import RemoveProductFromWashList from './RemoveProductFromWashList'
import AdProductToCart from './AdProductToCart'
import RemoveProductFromCart from './RemoveProductFromCart'
export default function PoductSpecificCategory() {
    const { id } = useParams()
    const urlImage = 'http://localhost:5001/product/'
    const dispatch = useDispatch();
    const {
        idsWashList,
    } = useSelector((state) => state.washList)
    const {
        idsCart
    } = useSelector((state) => state.cart)
    const {
        loadingProductSpecificCategory, errorProductSpecificCategory, errorProductSpecificCategoryApi, dataProductSpecificCategory } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(getProductSpecificCategory(id))


        return () => {
            // dispatch(makeStateIsEmpityProduct())
        }
    }, [])



    return (
        <div className=' mt-3'>

            {errorProductSpecificCategory && <Alert severity='error' sx={{ width: "100%", marginY: "20px" }}>{errorProductSpecificCategory}</Alert>}
            {errorProductSpecificCategoryApi && <Alert severity='error' sx={{ width: "100%", marginY: "20px" }}>{errorProductSpecificCategoryApi}</Alert>}

            {!loadingProductSpecificCategory ?
                <>
                    <h3> {dataProductSpecificCategory.result && dataProductSpecificCategory.result[0].categoryId.name}</h3>
                    <div className=' row g-2'>
                        {dataProductSpecificCategory.result && dataProductSpecificCategory.result.map((elm, i) => (
                            <div className=' col-md-3 ' key={i}>
                                <div className=' itemsProductHome  h-100  border border-1 p-2 shadow-lg'>
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

                    </div>

                </> :
                <div className=' d-flex justify-content-center  my-5'>
                    <CircularProgress />
                </div>

            }


        </div>
    )
}
