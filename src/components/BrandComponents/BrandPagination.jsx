import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../service/brand/actionBrand';
export default function BrandPagination() {
    const { dataBrands } = useSelector((state) => state.brand)
    const dispatch = useDispatch();

    const handlePagination = async (event, pageNumber) => {
        event.preventDefault();

        dispatch(getBrands(pageNumber))
    };
    return (
        <div className='  pagination'>
            {dataBrands.result &&
                <Stack spacing={2} borderRadius={2} sx={{ backgroundColor: "#495057", padding: "10px" }}>
                    <Pagination color="primary" count={dataBrands.numberOfPage} onChange={handlePagination} />
                </Stack>
            }
        </div>
    )
}
