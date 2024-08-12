import { createSlice } from '@reduxjs/toolkit';
import { getBrands, searchBrands } from './actionBrand';

const initialStateBrands = {
    loading: false,
    error: '',
    dataBrands: [],
    loadingSearchBrands: false,
    errorSearchBrands: null,
    errorSearchBrandsApi: null
}
const BrandsSlice = createSlice({
    name: 'brand',
    initialState: initialStateBrands,

    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.loading = true
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.massage == 'success') {
                    state.loading = false
                    state.dataBrands = action.payload
                }
            })
            .addCase(getBrands.rejected, (state, action) => {
                state.loading = false
                !action.payload ? state.error = action.error.message : state.error = null

            })
            // searchvalue
            .addCase(searchBrands.pending, (state) => {
                state.loadingSearchBrands = true
                state.dataBrands = []
            })
            .addCase(searchBrands.fulfilled, (state, action) => {
                state.loadingSearchBrands = false
                if (action.payload.massage == 'success') {
                    state.errorSearchBrands = false
                    state.dataBrands = action.payload
                    state.error = null
                }
                else {

                    state.errorGetBrands = action.payload.message
                }

            })
            .addCase(searchBrands.rejected, (state, action) => {
                !action.payload ? state.errorSearchBrandsApi = action.error.message : state.errorSearchBrandsApi = null
                state.loadingSearchBrands = false
            })

    }
})
export default BrandsSlice.reducer;
