import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplyCoupons, getCart } from '../../service/cart/actionCart';
import { Alert, CircularProgress } from '@mui/material';
import { makeStateIsEmpityCoupon } from '../../service/cart/cartSlice';

export default function ApplyCoupon() {
    // 1. Data Fetching and Error Handling:
    const { loadingApllyCoupun,
        errorApllyCoupun,
        errorApllyCoupunNetWork,

    } = useSelector((state) => state.cart)
    /*****************************************************************************************************************************/
    // 2. State and Utility Variables:
    const [success, setSuccess] = useState(false)// Indicates successful registration
    const [coupon, setCoupon] = useState('');// Flag for invalid verification code length
    /*****************************************************************************************************************************/
    const handleValueCoupon = (e) => {
        setCoupon(e.target.value)
    
        dispatch(makeStateIsEmpityCoupon())
    }
    // 3. Data Fetching and Error Handling:
    const dispatch = useDispatch();
    /*****************************************************************************************************************************/

    const handleSubmint = async (e) => {
        e.preventDefault()
        if (!coupon) return
        const response = await dispatch(ApplyCoupons({ name:coupon }))
        if (response.payload?.message === 'success') {

            setSuccess(true)
            setTimeout(() => {
                dispatch(getCart())
                setSuccess(false)
            }, 1000);
        }
    }
    return (
        <form onSubmit={handleSubmint} >
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Coupon Code" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleValueCoupon} />
                <button className="input-group-text bg-primary text-white fw-bolder" style={{ cursor: "pointer" }} id="basic-addon2" type='submit' >
                    {loadingApllyCoupun ? <CircularProgress /> : 'APPLY'}
                </button>

                {success && <Alert severity='success' sx={{ width: "100%", marginTop: "10px" }}>success</Alert>}
                {errorApllyCoupun && <Alert severity='error' sx={{ width: "100%", marginTop: "10px" }}>{errorApllyCoupun}</Alert>}
                {errorApllyCoupunNetWork && <Alert severity='error' sx={{ width: "100%", marginTop: "10px" }}>{errorApllyCoupunNetWork}</Alert>}


            </div>
        </form>
    )
}
