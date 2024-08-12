import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateCart } from '../../service/cart/actionCart';
import { Alert, Snackbar } from '@mui/material';

export default function PlusCart({ productId }) {
    // 1. State and Utility Variables:
    const [open, setOpen] = useState(false);
    /*****************************************************************************************************************************/

    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingUpdateCart,
        errorUpdateCart,
        errorUpdateCartNetWork,
    } = useSelector((state) => state.cart)
    /***************************************/
    const handleSubmit = async () => {
        const response = await dispatch(updateCart({ productId: productId, plus: 1 }))
        console.log(response);

        if (response.payload?.message === 'success') {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                dispatch(getCart())



            }, 1000);
        }
        console.log('add');

    }

    return (
        <div>
            <AddIcon sx={{ cursor: "pointer" }} onClick={handleSubmit} />




            <Snackbar open={open} autoHideDuration={6000} >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    1 is supplied
                </Alert>
            </Snackbar>



            <Snackbar open={loadingUpdateCart} autoHideDuration={6000} >


                <Alert
                    severity="info"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    loading.....
                </Alert>



            </Snackbar>


            <Snackbar open={errorUpdateCart} autoHideDuration={6000} >


                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorUpdateCart && errorUpdateCart}
                </Alert>



            </Snackbar>

            <Snackbar open={errorUpdateCartNetWork} autoHideDuration={6000} >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorUpdateCartNetWork && errorUpdateCartNetWork}
                </Alert>



            </Snackbar>





        </div>
    )
}
