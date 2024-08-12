import { createSlice } from '@reduxjs/toolkit';
import { AddWashList, getWashList, removeWashList } from './actionWashList';


const initialStateWashList = {
    loadingAddWashList: false,
    errorAddWashList: null,
    errorAddWashListNetWork: null,


    loadingGetWashList: false,
    errorGetWashList: null,
    errorGetWashListNetWork: null,
    datWashList: [],
    idsWashList: [],

    loadingRemoveWashList: false,
    errorRemoveWashList: null,
    errorRemoveWashListNetWork: null,



}
const washListSlice = createSlice({
    name: 'washList',
    initialState: initialStateWashList,

    extraReducers: (builder) => {
        builder
            //add
            .addCase(AddWashList.pending, (state, action) => {
                // Set loading state to true, clear all error states


                state.loadingAddWashList = true
                state.errorAddWashList = null
                state.errorAddWashListNetWork = null
                state.datWashList = []
            })
            .addCase(AddWashList.fulfilled, (state, action) => {
                console.log(action);

                // Set loading state to false

                state.loadingAddWashList = false
                // Handle successful response

                if (action.payload.message !== 'success') {
                    // Set loading state to false

                    state.errorAddWashList = action.payload.message

                } else {
                    state.errorAddWashList = null
                }


            })
            .addCase(AddWashList.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingAddWashList = false
                !action.payload ? state.errorAddWashListNetWork = action.error.message : state.errorAddWashListNetWork = null

            })
            ///get
            .addCase(getWashList.pending, (state, action) => {
                // Set loading state to true, clear all error states


                state.loadingGetWashList = true
                state.errorGetWashList = null
                state.errorGetWashListNetWork = null
                state.datWashList = []
            })
            .addCase(getWashList.fulfilled, (state, action) => {
          

                // Set loading state to false
                state.loadingGetWashList = false
                // Handle successful response
                if (action.payload.message === 'success') {
                    state.datWashList = action.payload.wishList

                    state.idsWashList = action.payload.wishList.map((elm) => elm._id)


                }


            })
            .addCase(getWashList.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingGetWashList = false
                !action.payload ? state.errorGetWashList = action.error.message : state.errorGetWashList = null

            })
            //remove 
            .addCase(removeWashList.pending, (state, action) => {
                // Set loading state to true, clear all error states


                state.loadingRemoveWashList = true
                state.errorRemoveWashList = null
                state.errorRemoveWashListNetWork = null

            })
            .addCase(removeWashList.fulfilled, (state, action) => {

                // Set loading state to false
                state.loadingRemoveWashList = false
                // Handle successful response
                if (action.payload.message !== 'success') {

                    state.errorRemoveWashList = action.payload.message



                } else {
                    state.errorRemoveWashList = null

                }


            })
            .addCase(removeWashList.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingRemoveWashList = false
                !action.payload ? state.errorRemoveWashListNetWork = action.error.message : state.errorRemoveWashListNetWork = null

            })

    }
})
export default washListSlice.reducer;
