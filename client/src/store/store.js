import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slices"
import adminProductsSlice from "./admin/products-slice"
import shopProductsSlice from "./shop/product-slice"

const store = configureStore({
    reducer : {
        auth : authSlice,
        adminProducts : adminProductsSlice,
        shopProducts : shopProductsSlice
    }
})

export default store;