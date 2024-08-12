import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/cart'
export const AddCart = createAsyncThunk(
    'home/addCart',
    async (productId) => {
        const { data } = await axios.post(URL, productId, { headers: { token: localStorage.getItem('userToken') } })
        return data
    }
)

export const removeCart = createAsyncThunk(
    'home/removeCart',
    async (productId) => {
        const { data } = await axios.delete(URL, { data: productId, headers: { token: localStorage.getItem('userToken') } })
        return data
    }
)
export const getCart = createAsyncThunk(
    'home/getCart',
    async () => {
        const { data } = await axios.get(URL, { headers: { token: localStorage.getItem('userToken') } })
        return data
    }
)

export const updateCart = createAsyncThunk(
    'home/updateCart',
    async (num) => {
        const { data } = await axios.patch(URL, num, { headers: { token: localStorage.getItem('userToken') } })
        return data
    }
)

export const ApplyCoupons = createAsyncThunk(
    'home/ApplyCoupon',
    async (coupon) => {
        const { data } = await axios.post(`${URL}/applyCoupon`, coupon, { headers: { token: localStorage.getItem('userToken') } })
        return data
    }
)


