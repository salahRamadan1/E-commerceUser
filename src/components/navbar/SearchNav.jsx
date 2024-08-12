import React from 'react'

export default function SearchNav() {
    return (
        <div>

            <div className=' searchNav  '>

                <i className="fa-solid fa-xmark iconeSearchNavClose mouseCursor"  > <button className=' d-none'></button></i>
                <form>
                    <input className='   inputSearch   form form-control text-center  m-auto my-3 rounded-5 ' placeholder='Search' />
                    <i className="fa-solid fa-magnifying-glass iconeSearchNav mouseCursor"  > <button type='submit' className=' d-none'></button></i>
                </form>
            </div >
            {/* <div className=' container text-center'>
                <Stack sx={{ width: '100%' }} spacing={2} className=' my-2'>

                   
                    {errorSearchCategoryApi && <Alert severity="error">{errorSearchCategoryApi}</Alert>}
                    
                    {errorSearchCategory && <Alert severity="error">{errorSearchCategory}</Alert>}

                </Stack>
                {loadingSearchCategory && <div className=' loading d-flex justify-content-center  mt-5'>
                    <div className="loader d-flex "></div>
                </div>}
            </div> */}
        </div>
    )
}
