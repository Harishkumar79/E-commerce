import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slices"
import adminProductsSlice from "./admin/products-slice"
import shopProductsSlice from "./shop/product-slice"
import shopCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';


const store = configureStore({
    reducer : {
        auth : authSlice,
        adminProducts : adminProductsSlice,
        shopProducts : shopProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : shopOrderSlice
    }
})

export default store;