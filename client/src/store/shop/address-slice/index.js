import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    addressList: [],
    isLoading: false
}

// add To Cart
export const addNewAddress = createAsyncThunk(
    "/addresses/addNewAddress",
    async(formData)=>{
        const response = await axios.post("http://localhost:5000/api/shop/address/add" , formData);
        return response.data;
    }
);

// Fetch cart items
export const fetchAddress = createAsyncThunk(
    "/addresses/fetchAddress",
    async(userId)=>{
        const response = await axios.get(`http://localhost:5000/api/shop/address/get/${userId}`);
        return response.data;
    }
);

// delete cart items
export const deleteAddress = createAsyncThunk(
    "/addresses/deleteAddress",
    async({userId , addressId })=>{
        const response = await axios.delete(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}`);
        return response.data;
    }
);

// update cart items
export const editAddress = createAsyncThunk(
    "/addresses/editAddress",
    async({userId , addressId ,formData})=>{
        const response = await axios.put(`http://localhost:5000/api/shop/address/update/${userId}/${addressId}` , formData);
        return response.data;
    }
);

const addressSlice = createSlice({
    name: "addressSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //addToCart
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true;
            }).addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            }).addCase(addNewAddress.rejected, (state,action) => {
                state.isLoading = false;
                state.addressList = [];
            })
            //fetchCartItems
            .addCase(fetchAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(fetchAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
            //deleteCartItems
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(deleteAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
            //updateCartQuantity
            .addCase(editAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            })
            .addCase(editAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            });
    }
})

export default addressSlice.reducer;