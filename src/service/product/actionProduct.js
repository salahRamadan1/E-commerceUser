import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
var URL = 'http://localhost:5001/product'

export const searchProduct = createAsyncThunk(
    'home/searchProduct/Product',
    async (value) => {
        const { data } = await axios.get(URL + `?keyword=${value}`)
        return data
    })
export const getOneProduct = createAsyncThunk(
    'home/oneProduct/Product',
    async (id) => {
        const { data } = await axios.post(URL + `/${id}`)
        return data
    })
// more sold

export const getProductSpecificCategory = createAsyncThunk(
    'home/getProductSpecificCategory/Product',
    async (id) => {
        const { data } = await axios.get(URL + `/${id}`)
        return data
    })


let factoryProdyct = (typePrefix, query = '') => {
    return createAsyncThunk(
        typePrefix,
        async (pageNumber = 1) => {
            const { data } = await axios.get(URL + `?page=${pageNumber}${query}`)

            return data
        }

    )

}
export const getProduct = factoryProdyct('home/GetProduct')
export const getProductMoreSold = factoryProdyct('home/getProductMoreSold', '&sort=sold')
export const getProductMoreDiscount = factoryProdyct('home/getProductMoreDiscount', '&sort=discount')
export const getProductMoreRate = factoryProdyct('home/getProductMoreRate', '&sort=rateCount')




