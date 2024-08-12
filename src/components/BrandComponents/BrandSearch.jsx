import React, { useState } from 'react'
import { getBrands, searchBrands } from '../../service/brand/actionBrand'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Stack } from '@mui/material';
export default function BrandSearch() {
    const {
        loadingSearchBrands,
        errorSearchBrands,
        errorSearchBrandsApi,
        dataBrands
    } = useSelector((state) => state.brand)
    const [valueSearch, setValueSearch] = useState('')
    const dispatch = useDispatch();
    async function handleSearch(event) {
        event.preventDefault();

        dispatch(searchBrands(valueSearch))
    }
    const handleNameChange = (event) => {

        setValueSearch(event.target.value);

    };
    function clearInputsearch() {
        setValueSearch('')
        dispatch(getBrands())
    }
    return (
        <div>

            {dataBrands.result && <>
                <div className=' search  '>
                    {valueSearch && <i className="fa-solid fa-xmark iconeSearchClose mouseCursor" onClick={clearInputsearch}> <button className=' d-none'></button></i>}
                    <form onSubmit={handleSearch}>

                        <input value={valueSearch} onChange={handleNameChange} className='  w-75   form form-control text-center  m-auto my-3 rounded-5 ' placeholder='Search' />
                        <i className="fa-solid fa-magnifying-glass iconeSearch mouseCursor" onClick={handleSearch}> <button type='submit' className=' d-none'></button></i>
                    </form>
                </div >
                <div className=' container text-center'>
                    <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                        {/* error api search Brands */}
                        {errorSearchBrandsApi && <Alert severity="error">{errorSearchBrandsApi}</Alert>}
                        {/* error search Brands */}
                        {errorSearchBrands && <Alert severity="error">{errorSearchBrands}</Alert>}

                    </Stack>
                    {loadingSearchBrands && <div className=' loading d-flex justify-content-center  mt-5'>
                        <div className="loader d-flex "></div>
                    </div>}
                </div>
            </>

            }
        </div>
    )
}
