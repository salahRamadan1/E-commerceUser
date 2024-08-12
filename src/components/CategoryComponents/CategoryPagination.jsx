import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../service/Category/actionCategory';
export default function CategoryPagination() {
    // Selects the dataCategory slice from the Redux state
    const { dataCategory } = useSelector((state) => state.category)
    // Gets the dispatch function to dispatch actions
    const dispatch = useDispatch();
    // Handles pagination events, fetching data for the specified page
    const handlePagination = async (event, pageNumber) => {
        event.preventDefault();
        dispatch(getCategory(pageNumber))
    };
    return (
        <div className='  pagination mt-3'>
            {dataCategory.result &&
                <Stack spacing={2}   >
                    <Pagination color='primary' sx={{ color: "green" }} variant="outlined" shape="rounded" count={dataCategory.numberOfPage} onChange={handlePagination} />
                </Stack>
            }
        </div>
    )
}
