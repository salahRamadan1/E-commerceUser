import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

var URL = 'http://localhost:5001/user/'

export const googleLogIn = createAsyncThunk(
    'auth/googleLogIn',
    async (idToken) => {
        const { data } = await axios.post(`${URL}googleLogIn`, idToken)
        return data
    }
)
export const verfiy = createAsyncThunk(
    'auth/numberVerviy',
    async (userData) => {
        const { data } = await axios.post(`${URL}verfiy`, userData)
        return data
    }
)
export const logInUser = createAsyncThunk(
    'auth/logIn',
    async (userData) => {
        const { data } = await axios.post(`${URL}logIn`, userData)
        return data

    }
)
export const chekEmail_SendNumberVerfiy = createAsyncThunk(
    'auth/checkEmail',
    async (userData) => {
        const { data } = await axios.post(`${URL}numberVerfiy`, userData)
        return data

    }
)
export const SendNumberVerfiy = createAsyncThunk(
    'auth/numberVerfiy',
    async (userData) => {
        const { data } = await axios.post(`${URL}numberVerfiy`, userData)
        return data
    }
)


export const resetPassWord = createAsyncThunk(
    'auth/resetPassWord',
    async (userData) => {
        const { data } = await axios.post(`${URL}resetPassWord`, userData)
        return data

    }
)

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData) => {
        const { data } = await axios.post(`${URL}signUp`, userData)
        return data
    }
)








