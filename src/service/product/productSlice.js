import { createSlice } from '@reduxjs/toolkit';
import { getOneProduct, getProduct, getProductMoreDiscount, getProductMoreRate, getProductMoreSold, getProductSpecificCategory, searchProduct } from './actionProduct';

const initialStateProduct = {
    // get product
    loading: false, error: '', dataProduct: [],
    // search
    loadingSearchProduct: false, errorSearchProduct: null, errorSearchProductApi: null,
    // one product
    loadingOneProduct: false, errorOneProduct: null, errorOneProductApi: null, oneProduct: {},
    //   product more sold 
    loadingMoreProductSold: false, errorMoreProductSold: null, errorMoreProductSoldApi: null, dataProductMorSold: [],
    //   product more discount 
    loadingMoreProductDiscount: false, errorMoreProductDiscount: null, errorMoreProductDiscountApi: null, dataProductMorDiscount: [],
    //   product more rate
    loadingMoreProductRate: false, errorMoreProductRate: null, errorMoreProductRateApi: null, dataProductMorRate: [],
    //  ProductSpecificCategory
    loadingProductSpecificCategory: false, errorProductSpecificCategory: null, errorProductSpecificCategoryApi: null, dataProductSpecificCategory: []
}
const productSlice = createSlice({
    name: 'product',
    initialState: initialStateProduct,
    makeStateIsEmpityProduct: (state) => {
        const fields = [
            //get product
            'loading', 'error', 'dataProduct',
            // search
            'loadingSearchProduct', 'errorSearchProduct', 'errorSearchProductApi',
            // one product
            'loadingOneProduct', 'errorOneProduct', 'errorOneProductApi',
            //  product more sold 
            'loadingMoreProductSold', 'errorMoreProductSold', 'errorMoreProductSoldApi',
            //   product more discount 
            'loadingMoreProductDiscount', 'errorMoreProductDiscount', 'errorMoreProductDiscountApi',
            //   product more rate
            'loadingMoreProductRate', 'errorMoreProductRate', 'errorMoreProductRateApi',
            //   ProductSpecificCategory
            'loadingProductSpecificCategory', 'errorProductSpecificCategory', 'errorProductSpecificCategoryApi',
        ];

        fields.forEach(field => {
            state[field] = field.startsWith('loading') ? false : null;
        });

    },

    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {

                state.loading = false

                if (action.payload.massage === 'success') {
                    state.loading = false
                    state.dataProduct = action.payload
                }
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false
                !action.payload ? state.error = action.error.message : state.error = null

            })
            // searchvalue
            .addCase(searchProduct.pending, (state) => {
                state.loadingSearchProduct = true
                state.dataProduct = []
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.loadingSearchProduct = false
                if (action.payload.massage == 'success') {
                    state.errorSearchProduct = false
                    state.dataProduct = action.payload
                    state.error = null
                }
                else {

                    state.errorSearchProduct = action.payload.message
                }

            })
            .addCase(searchProduct.rejected, (state, action) => {
                !action.payload ? state.errorSearchProductApi = action.error.message : state.errorSearchProductApi = null
                state.loadingSearchProduct = false
            })
            // get one product
            .addCase(getOneProduct.pending, (state) => {
                state.loadingOneProduct = true
                state.dataProduct = []
            })
            .addCase(getOneProduct.fulfilled, (state, action) => {
                state.loadingOneProduct = false

                if (action.payload.message == 'success') {
                    state.errorSearchProduct = false
                    state.oneProduct = action.payload.result
                    state.error = null
                }
                else {

                    state.errorOneProduct = action.payload.message
                }

            })
            .addCase(getOneProduct.rejected, (state, action) => {
                !action.payload ? state.errorOneProductApi = action.error.message : state.errorOneProductApi = null
                state.loadingOneProduct = false
            })
            //more sold 
            .addCase(getProductMoreSold.pending, (state) => {
                state.loadingMoreProductSold = true
            })
            .addCase(getProductMoreSold.fulfilled, (state, action) => {
                state.loadingMoreProductSold = false

                if (action.payload.massage === 'success') {
                    state.loadingMoreProductSold = false
                    state.dataProductMorSold = action.payload
                } else {
                    state.errorMoreProductSold = action.payload.message
                }
            })
            .addCase(getProductMoreSold.rejected, (state, action) => {
                state.loadingMoreProductSold = false
                !action.payload ? state.errorMoreProductSoldApi = action.error.message : state.errorMoreProductSoldApi = null

            })
            //more discount 
            .addCase(getProductMoreDiscount.pending, (state) => {
                state.loadingMoreProductDiscount = true
            })
            .addCase(getProductMoreDiscount.fulfilled, (state, action) => {
                state.loadingMoreProductDiscount = false

                if (action.payload.massage === 'success') {
                    state.loadingMoreProductDiscount = false
                    state.dataProductMorDiscount = action.payload
                } else {
                    state.errorMoreProductDiscount = action.payload.message
                }
            })
            .addCase(getProductMoreDiscount.rejected, (state, action) => {
                state.loadingMoreProductDiscount = false
                !action.payload ? state.errorMoreProductDiscountApi = action.error.message : state.errorMoreProductDiscountApi = null

            })
            //more rate 
            .addCase(getProductMoreRate.pending, (state) => {
                state.loadingMoreProductRate = true
            })
            .addCase(getProductMoreRate.fulfilled, (state, action) => {
                state.loadingMoreProductRate = false

                if (action.payload.massage === 'success') {
                    state.loadingMoreProductRate = false
                    state.dataProductMorRate = action.payload
                } else {
                    state.errorMoreProductRate = action.payload.message
                }
            })
            .addCase(getProductMoreRate.rejected, (state, action) => {
                state.errorMoreProductRateApi = false
                !action.payload ? state.errorMoreProductRateApi = action.error.message : state.errorMoreProductDiscountApi = null

            })

            //ProductSpecificCategory
            .addCase(getProductSpecificCategory.pending, (state) => {
                state.loadingProductSpecificCategory = true
            })
            .addCase(getProductSpecificCategory.fulfilled, (state, action) => {
                state.loadingProductSpecificCategory = false

                if (action.payload.message === 'success') {
                    state.loadingProductSpecificCategory = false
                    state.dataProductSpecificCategory = action.payload

                    state.errorProductSpecificCategory = null
                    state.errorProductSpecificCategoryApi = null
                } else {
                    state.errorProductSpecificCategory = action.payload.message
                    state.dataProductSpecificCategory = []
                }
            })
            .addCase(getProductSpecificCategory.rejected, (state, action) => {
                state.loadingProductSpecificCategory = false
                !action.payload ? state.errorProductSpecificCategoryApi = action.error.message : state.errorProductSpecificCategoryApi = null

            })
    }
})
export const { makeStateIsEmpityProduct } = productSlice.actions;

export default productSlice.reducer;
