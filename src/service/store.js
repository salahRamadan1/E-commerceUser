import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import categorySlice from './Category/categorySlice'
import brandSlice from './brand/brandSlice'
import productSlice from './product/productSlice'
import reviewSlice from './review/reviewSlice'
import washListSlice from './washList/washList.Slice'
import cartSlice from './cart/cartSlice'

export const store = configureStore({
    reducer: {

        auth: authSlice,
        category: categorySlice,
        brand: brandSlice,
        product: productSlice,
        review: reviewSlice,
        washList: washListSlice,
        cart: cartSlice,

    },
})