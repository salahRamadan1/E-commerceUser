import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Pagination, Stack } from '@mui/material';
import { getProduct } from '../../service/product/actionProduct';
import { useEffect } from 'react';

export default function PaginationProduct() {
  //1. Access state from the Product slice of the Redux store
  const {

    dataProduct
  } = useSelector((state) => state.product)
  const dispatch = useDispatch();
  /*****************************************************************************************************************************/

  //2.Main Function to handle  page product
  const handlePagination = async (event, pageNumber) => {
    event.preventDefault();
    await dispatch(getProduct(pageNumber))
  };
  useEffect(() => {




  }, [])

  return (
    <>

      {dataProduct && <div className='pagination my-1 d-flex justify-content-center'>
        <Stack spacing={2} >
          <Pagination color='primary' sx={{ color: "green" }} variant="outlined" shape="rounded" count={dataProduct.numberOfPage} onChange={handlePagination} />
        </Stack>
      </div>}
    </>
  )
}
