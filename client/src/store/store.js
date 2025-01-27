import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slices"
import adminProductsSlice from "./admin/products-slice"
import adminOrderSlice from "./admin/orders-slice"
import shopProductsSlice from "./shop/product-slice"
import shopCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';
import shopSearchSlice from './shop/search-slice';
import shopReviewSlice from './shop/review-slice'


const store = configureStore({
    reducer : {
        auth : authSlice, 

        adminProducts : adminProductsSlice,
        adminOrder : adminOrderSlice,
        
        shopProducts : shopProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : shopOrderSlice,
        shopSearch : shopSearchSlice,
        shopReview : shopReviewSlice
    }
})

export default store;