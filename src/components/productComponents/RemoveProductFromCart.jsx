import React, { useState } from 'react'

import FavoriteIcon from '@mui/icons-material/Favorite';

import Tooltip from '@mui/material/Tooltip';
import { Alert, Snackbar } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../service/product/actionProduct';
import { getCart, removeCart } from '../../service/cart/actionCart';
export default function RemoveProductFromCart({ productId }) {
    // 1. State and Utility Variables:
    const [open, setOpen] = useState(false);
    /*****************************************************************************************************************************/

    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingRemoveCart,
        errorRemoveCart,
        errorRemoveCartNetWork,

    } = useSelector((state) => state.cart)
    /*****************************************************************************************************************************/
    // 4. Main Registration Function:
    const handleSubmit = async () => {
        const response = await dispatch(removeCart({ productId: productId }))
        console.log(response);
        if (response.payload?.message === 'success') {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                dispatch(getCart())
                dispatch(getProduct())

            }, 1000);
        }
    }
    return (
        <>

            <Tooltip title="Remove from Cart">

                < FavoriteIcon sx={{ cursor: "pointer", color: 'red' }} onClick={handleSubmit} />

            </Tooltip>


            <Snackbar open={open} autoHideDuration={6000} >
                <Alert

                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Removed From washList
                </Alert>
            </Snackbar>


            <Snackbar open={loadingRemoveCart} autoHideDuration={6000} >


                <Alert
                    severity="info"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    loading.....
                </Alert>



            </Snackbar>


            <Snackbar open={errorRemoveCart} autoHideDuration={6000} >


                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorRemoveCart && errorRemoveCart}
                </Alert>



            </Snackbar>

            <Snackbar open={errorRemoveCartNetWork} autoHideDuration={6000} >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorRemoveCartNetWork && errorRemoveCartNetWork}
                </Alert>



            </Snackbar>

        </>



    )
}
