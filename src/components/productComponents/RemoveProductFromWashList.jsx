import React, { useState } from 'react'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import Tooltip from '@mui/material/Tooltip';
import { Alert, Snackbar } from '@mui/material';
import { getWashList, removeWashList } from '../../service/washList/actionWashList';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../service/product/actionProduct';
export default function RemoveProductFromWashList({ productId }) {
    // 1. State and Utility Variables:
    const [open, setOpen] = useState(false);
    /*****************************************************************************************************************************/

    // 2. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    const {
        loadingRemoveWashList,
        errorRemoveWashList,
        errorRemoveWashListNetWork,
    } = useSelector((state) => state.washList)
    /*****************************************************************************************************************************/
    // 4. Main Registration Function:
    const handleSubmit = async () => {
        const response = await dispatch(removeWashList({ productId: productId }))
        if (response.payload?.message === 'success') {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                dispatch(getWashList())
                dispatch(getProduct())

            }, 1000);
        }
    }
    return (
        <>

            <Tooltip title="Remove from washList">

                < RemoveShoppingCartIcon sx={{ cursor: "pointer", color: 'red' }} onClick={handleSubmit} />

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


            <Snackbar open={loadingRemoveWashList} autoHideDuration={6000} >


                <Alert
                    severity="info"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    loading.....
                </Alert>



            </Snackbar>


            <Snackbar open={errorRemoveWashList} autoHideDuration={6000} >


                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorRemoveWashList && errorRemoveWashList}
                </Alert>



            </Snackbar>

            <Snackbar open={errorRemoveWashListNetWork} autoHideDuration={6000} >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {errorRemoveWashListNetWork && errorRemoveWashListNetWork}
                </Alert>



            </Snackbar>
        </>
    )
}
