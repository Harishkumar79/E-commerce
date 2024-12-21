import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slices"
import adminProductsSlice from "./admin/products-slice"

const store = configureStore({
    reducer : {
        auth : authSlice,
        adminProducts : adminProductsSlice
    }
})

export default store;