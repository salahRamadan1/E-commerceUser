import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/review'
export const getReview = createAsyncThunk(
    'home/Review',
    async (id) => {
        const { data } = await axios.get(URL + `/${id}`)
        return data
    }
)
