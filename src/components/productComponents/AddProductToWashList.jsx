import React, { useEffect, useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { AddWashList, getWashList } from '../../service/washList/actionWashList';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import { getProduct } from '../../service/product/actionProduct';
import Tooltip from '@mui/material/Tooltip';
import { Alert, CircularProgress } from '@mui/material';
import { getCart } from '../../service/cart/actionCart';

export default function AddProductToWashList({ productId }) {
  // 1. State and Utility Variables:
  const [open, setOpen] = useState(false);
  /*****************************************************************************************************************************/

  // 2. Data Fetching and Error Handling:
  const dispatch = useDispatch();
  const {
    loadingAddWashList,
    errorAddWashList,
    errorAddWashListNetWork,
  } = useSelector((state) => state.washList)
  /*****************************************************************************************************************************/
  // 4. Main Registration Function:
  const handleSubmit = async () => {
    const response = await dispatch(AddWashList({ productId: productId }))
    if (response.payload?.message === 'success') {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        dispatch(getWashList())
        dispatch(getProduct())
        dispatch(getCart())
      }, 1000);
    }

  }




  return (
    <div>




      <Tooltip title="add to washList">
        < AddShoppingCartIcon sx={{ cursor: "pointer", color: 'green' }} onClick={handleSubmit} />
      </Tooltip>



      <Snackbar open={open} autoHideDuration={6000} >


        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Added To WashList
        </Alert>



      </Snackbar>


      <Snackbar open={loadingAddWashList} autoHideDuration={6000} >


        <Alert
          severity="info"
          variant="filled"
          sx={{ width: '100%' }}
        >
          loading.....
        </Alert>



      </Snackbar>


      <Snackbar open={errorAddWashList} autoHideDuration={6000} >


        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorAddWashList && errorAddWashList}
        </Alert>



      </Snackbar>

      <Snackbar open={errorAddWashListNetWork} autoHideDuration={6000} >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorAddWashListNetWork && errorAddWashListNetWork}
        </Alert>



      </Snackbar>

    </div >

  )
}
