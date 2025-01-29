import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    addressList: [],
    isLoading: false
}

// add address
export const addNewAddress = createAsyncThunk(
    "/addresses/addNewAddress",
    async(formData)=>{
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/address/add` , formData);
        return response.data;
    }
);

// Fetch address
export const fetchAddress = createAsyncThunk(
    "/addresses/fetchAddress",
    async(userId)=>{
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`);
        return response.data;
    }
);

// delete address
export const deleteAddress = createAsyncThunk(
    "/addresses/deleteAddress",
    async({userId , addressId })=>{
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`);
        return response.data;
    }
);

// update address
export const editAddress = createAsyncThunk(
    "/addresses/editAddress",
    async({userId , addressId ,formData})=>{
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/address/update/${userId}/${addressId}` , formData);
        return response.data;
    }
);

const addressSlice = createSlice({
    name: "addressSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //add address
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true;
            }).addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false;
            }).addCase(addNewAddress.rejected, (state,action) => {
                state.isLoading = false;
            })
            //fetchAddress
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
    }
})

export default addressSlice.reducer;