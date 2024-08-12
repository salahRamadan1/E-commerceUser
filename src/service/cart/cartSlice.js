import { createSlice } from '@reduxjs/toolkit';
import { AddCart, ApplyCoupons, getCart, removeCart, updateCart } from './actionCart';


const initialStateCart = {
    loadingAddCart: false,
    errorAddCart: null,
    errorAddCartNetWork: null,


    loadingGetCart: false,
    errorGetCart: null,
    errorGetCartNetWork: null,
    dataCart: [],
    idsCart: [],

    loadingRemoveCart: false,
    errorRemoveCart: null,
    errorRemoveCartNetWork: null,

    loadingUpdateCart: false,
    errorUpdateCart: null,
    errorUpdateCartNetWork: null,

    loadingApllyCoupun: false,
    errorApllyCoupun: null,
    errorApllyCoupunNetWork: null,


}
const cartSlice = createSlice({
    name: 'Cart',
    initialState: initialStateCart,
    reducers: {
        makeStateIsEmpityCoupon: (state) => {
            const fields = [
                // google log in 
                'loadingApllyCoupun', 'errorApllyCoupun', 'errorApllyCoupunNetWork',


            ];

            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            //add
            .addCase(AddCart.pending, (state, action) => {
                // Set loading state to true, clear all error states
                console.log(action);
                state.loadingAddCart = true
                state.errorAddCart = null
                state.errorAddCartNetWork = null
                state.dataCart = []
            })
            .addCase(AddCart.fulfilled, (state, action) => {

                // Set loading state to false

                state.loadingAddCart = false
                // Handle successful response

                if (action.payload.message === 'success') {
                    // Set loading state to false
                }
            })
            .addCase(AddCart.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingAddCart = false
                !action.payload ? state.errorAddCart = action.error.message : state.errorAddCart = null

            })
            ///get
            .addCase(getCart.pending, (state, action) => {
                // Set loading state to true, clear all error states


                state.loadingGetCart = true
                state.errorGetCart = null
                state.errorGetCartNetWork = null
                state.dataCart = []
            })
            .addCase(getCart.fulfilled, (state, action) => {
                console.log(action);

                // Set loading state to false
                state.loadingGetCart = false
                // Handle successful response
                if (action.payload.message === 'success') {
                    state.dataCart = action.payload.cart
                    state.idsCart = action.payload.cart.cartItems.map((elm) => elm.productId._id)

                } else {
                    state.errorGetCart = action.payload.message
                }


            })
            .addCase(getCart.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingGetCart = false
                !action.payload ? state.errorGetCart = action.error.message : state.errorGetCart = null

            })
            // //remove 
            .addCase(removeCart.pending, (state, action) => {
                // Set loading state to true, clear all error states


                state.loadingRemoveCart = true
                state.errorRemoveCart = null
                state.errorRemoveCartNetWork = null

            })
            .addCase(removeCart.fulfilled, (state, action) => {
                console.log(action);
                // Set loading state to false
                state.loadingRemoveCart = false
                // Handle successful response
                if (action.payload.message === 'success') {
                    console.log('hello');



                }


            })
            .addCase(removeCart.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingRemoveCart = false
                !action.payload ? state.errorRemoveCart = action.error.message : state.errorRemoveCart = null

            })
            // update 
            .addCase(updateCart.pending, (state, action) => {
                // Set loading state to true, clear all error states


                state.loadingUpdateCart = true
                state.errorUpdateCart = null
                state.errorUpdateCartNetWork = null

            })
            .addCase(updateCart.fulfilled, (state, action) => {
                console.log(action);
                // Set loading state to false
                state.loadingUpdateCart = false
                // Handle successful response
                if (action.payload.message === 'success') {
                    console.log('hello');



                }


            })
            .addCase(updateCart.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingUpdateCart = false
                !action.payload ? state.errorUpdateCart = action.error.message : state.errorUpdateCart = null

            })
            // applayCoupon
            .addCase(ApplyCoupons.pending, (state, action) => {
                // Set loading state to true, clear all error states
                state.loadingApllyCoupun = true
                state.errorApllyCoupun = null
                state.errorApllyCoupunNetWork = null
            })
            .addCase(ApplyCoupons.fulfilled, (state, action) => {
                console.log(action);
                // Set loading state to false
                state.loadingApllyCoupun = false
                // Handle successful response
                if (action.payload.message === 'success') {
                    // state.dataCart = action.payload.cart
                } else {
                    state.errorApllyCoupun = action.payload.message
                }


            })
            .addCase(ApplyCoupons.rejected, (state, action) => {
                // Set loading state to false and handle network error
                state.loadingApllyCoupun = false
                !action.payload ? state.errorApllyCoupun = action.error.message : state.errorApllyCoupun = null

            })

    }
})
export const { makeStateIsEmpityCoupon } = cartSlice.actions;

export default cartSlice.reducer;
