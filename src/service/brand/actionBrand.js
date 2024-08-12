import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/brand'
export const getBrands = createAsyncThunk(
    'home/Brands',
    async (pageNumber = 1) => {
        const { data } = await axios.get(URL + `?page=${pageNumber}`)
        return data
    }

)
export const searchBrands = createAsyncThunk(
    'home/searchBrands/Brands',
    async (value) => {
        const { data } = await axios.get(URL + `?keyword=${value}`)
        return data
    })