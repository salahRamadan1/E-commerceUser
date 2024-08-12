import React, { useState } from 'react'
import { getCategory, searchCategory } from '../../service/Category/actionCategory'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Stack, Typography } from '@mui/material';

export default function CategorySearch() {
    // 1. Data Fetching and Error Handling:
    const {
        loadingSearchCategory,
        errorSearchCategory,
        errorSearchCategoryApi,
        dataCategory
    } = useSelector((state) => state.category)
    /*****************************************************************************************************************************/
    // 2. State and Utility Variables:
    const [valueSearch, setValueSearch] = useState('')
    const dispatch = useDispatch();
    async function handleSearch(event) {
        event.preventDefault();

        dispatch(searchCategory(valueSearch))
    }
    const handleNameChange = (event) => {

        setValueSearch(event.target.value);

    };
    function clearInputsearch() {
        setValueSearch('')
        dispatch(getCategory())
    }
    return (
        <>

            {dataCategory.result && <>


                <div className=' search  '>

                    {valueSearch && <i className="fa-solid fa-xmark iconeSearchClose mouseCursor" onClick={clearInputsearch}> <button className=' d-none'></button></i>}
                    <form onSubmit={handleSearch}>

                        <input value={valueSearch} onChange={handleNameChange} className='  w-75   form form-control text-center  m-auto my-3 rounded-5 ' placeholder='Search' />
                        <i className="fa-solid fa-magnifying-glass iconeSearch mouseCursor" onClick={handleSearch}> <button type='submit' className=' d-none'></button></i>
                    </form>
                </div >
                <div className=' container text-center'>
                    <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                        {/* error api search category */}
                        {errorSearchCategoryApi && <Alert severity="error">{errorSearchCategoryApi}</Alert>}
                        {/* error search category */}
                        {errorSearchCategory && <Alert severity="error">{errorSearchCategory}</Alert>}

                    </Stack>
                    {loadingSearchCategory && <div className=' loading d-flex justify-content-center  mt-5'>
                        <div className="loader d-flex "></div>
                    </div>}
                </div>
            </>

            }
        </>
    )
}
