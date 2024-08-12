import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/wishList'
export const AddWashList = createAsyncThunk(
    'home/addWishList',
    async (productId) => {
        const { data } = await axios.patch(URL, productId, { headers: { token: localStorage.getItem('userToken') } })
        return data
    }
)
export const removeWashList = createAsyncThunk(
    'home/removeWishList',
    async (productId) => {
        const { data } = await axios.post(URL, productId, { headers: { token: localStorage.getItem('userToken') } })
        return data
    }
)
export const getWashList = createAsyncThunk(
    'home/getWashList',
    async () => {
        const { data } = await axios.get(URL, { headers: { token: localStorage.getItem('userToken') } })
        return data
    }
)
