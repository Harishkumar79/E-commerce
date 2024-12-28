import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading : false,
    productList : [],
    productDetails : null
}

// Fetch All Products
export const fetchAllFilteredProduct = createAsyncThunk(
    "/products/fetchAllFilteredProduct",
    async ({filterParams , sortParams}) => {

        const query = new URLSearchParams({
            ...filterParams,
            sortBy : sortParams
        })

        const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`);
        return result?.data;
    }
);

export const fetchProductDetails = createAsyncThunk(
    "/products/fetchProductDetails",
    async (id) => {

        const result = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`);
        return result?.data;
    }
);

const shoppingProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers : {
        setProductDetails: (state)=>{
            state.productDetails = null;
        }
    },
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
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload)
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state) => {
                state.isLoading = false;
                state.productDetails = null;
            });
    }
})

export const {setProductDetails} = shoppingProductSlice.actions

export default shoppingProductSlice.reducer;