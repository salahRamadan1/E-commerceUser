import React, { useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar, Tooltip } from '@mui/material';
import { AddCart, getCart } from '../../service/cart/actionCart';
import { getProduct } from '../../service/product/actionProduct';
import { getWashList } from '../../service/washList/actionWashList';

export default function AdProductToCart({ productId }) {
    // 1. State and Utility Variables:
    const [open, setOpen] = useState(false);
    /*****************************************************************************************************************************/

    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingAddCart,
        errorAddCart,
        errorAddCartNetWork,
    } = useSelector((state) => state.cart)
    /***************************************/
    const handleSubmit = async () => {
        const response = await dispatch(AddCart({ productId: productId }))
        console.log(response);

        if (response.payload?.message === 'success') {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                dispatch(getCart())
                dispatch(getProduct())
                dispatch(getWashList())

            }, 1000);
        }
        console.log('add');

    }
    return (
        <div>



            <Tooltip title=" Add To Cart">

                < FavoriteBorderIcon sx={{ cursor: "pointer", }} onClick={handleSubmit} />

            </Tooltip>


            <Snackbar open={open} autoHideDuration={6000} >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Added To Cart
                </Alert>
            </Snackbar>



            <Snackbar open={loadingAddCart} autoHideDuration={6000} >


                <Alert
                    severity="info"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    loading.....
                </Alert>



            </Snackbar>


            <Snackbar open={errorAddCart} autoHideDuration={6000} >


                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorAddCart && errorAddCart}
                </Alert>



            </Snackbar>

            <Snackbar open={errorAddCartNetWork} autoHideDuration={6000} >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorAddCartNetWork && errorAddCartNetWork}
                </Alert>



            </Snackbar>
        </div>
    )
}
