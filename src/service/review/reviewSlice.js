import { createSlice } from '@reduxjs/toolkit';
import { getReview } from './actionReview';

const initialStateReview = {
    loading: false,
    error: '',
    dataReview: [],

}
const ReviewSlice = createSlice({
    name: 'review',
    initialState: initialStateReview,

    extraReducers: (builder) => {
        builder
            .addCase(getReview.pending, (state) => {
                state.loading = true
            })
            .addCase(getReview.fulfilled, (state, action) => {
              
                state.loading = false

                if (action.payload.message == 'success') {

                    state.loading = false
                    state.dataReview = action.payload.review
                }
              

            })
            .addCase(getReview.rejected, (state, action) => {
                state.loading = false
                !action.payload ? state.error = action.error.message : state.error = null

            })



    }
})
export default ReviewSlice.reducer;
