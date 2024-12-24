import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    productList : []
}

// Fetch All Products
export const fetchAllFilteredProduct = createAsyncThunk(
    "/products/fetchAllFilteredProduct",
    async () => {
        const result = await axios.get("http://localhost:5000/api/shop/products/get");
        return result?.data;
    }
);

const shoppingProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
            .addCase(fetchAllFilteredProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload)
                state.productList = action.payload.data;
            })
            .addCase(fetchAllFilteredProduct.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            });
    }
})

export default shoppingProductSlice.reducer;