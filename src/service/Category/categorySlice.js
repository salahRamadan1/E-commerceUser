import { createSlice } from '@reduxjs/toolkit';
import { getCategory, searchCategory } from './actionCategory';

const initialStateCategory = {
    loading: false,
    error: '',
    dataCategory: [],
    loadingSearchCategory: false,
    errorSearchCategory: null,
    errorSearchCategoryApi: null
}
const categorySlice = createSlice({
    name: 'category',
    initialState: initialStateCategory,

    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false
        
                if (action.payload.massage == 'success') {
                    state.loading = false
                    state.dataCategory = action.payload
                }
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loading = false
                !action.payload ? state.error = action.error.message : state.error = null

            })
            // searchvalue
            .addCase(searchCategory.pending, (state) => {
                state.loadingSearchCategory = true
                state.dataCategory = []
            })
            .addCase(searchCategory.fulfilled, (state, action) => {
                state.loadingSearchCategory = false
                if (action.payload.massage == 'success') {
                    state.errorSearchCategory = false
                    state.dataCategory = action.payload
                    state.error = null
                }
                else {

                    state.errorGetCategory = action.payload.message
                }

            })
            .addCase(searchCategory.rejected, (state, action) => {
                !action.payload ? state.errorSearchCategoryApi = action.error.message : state.errorSearchCategoryApi = null
                state.loadingSearchCategory = false
            })

    }
})
export default categorySlice.reducer;
