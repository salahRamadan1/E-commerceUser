import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/category'
export const getCategory = createAsyncThunk(
    'home/category',
    async (pageNumber = 1) => {
        const { data } = await axios.get(URL + `?page=${pageNumber}`)
        return data
    }

)
export const searchCategory = createAsyncThunk(
    'home/searchCategory/category',
    async (value) => {
        const { data } = await axios.get(URL + `?keyword=${value}`)
        return data
    })