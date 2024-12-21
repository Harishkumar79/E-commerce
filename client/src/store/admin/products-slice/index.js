import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: []
};

// Add Product
export const addNewProduct = createAsyncThunk(
    "/products/addnewproduct",
    async (formData) => {
        const result = await axios.post(
            "http://localhost:5000/api/admin/products/add",
            formData,
            {
                withCredentials : true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return result?.data;
    }
);

// Fetch All Products
export const fetchAllProduct = createAsyncThunk(
    "/products/fetchAllProduct",
    async () => {
        const result = await axios.get("http://localhost:5000/api/admin/products/get");
        return result?.data;
    }
);

// Edit Product
export const editProduct = createAsyncThunk(
    "/products/editProduct",
    async ({ id, formData }) => {
        const result = await axios.put(
            `http://localhost:5000/api/admin/products/edit/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return result?.data;
    }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
    "/products/deleteProduct",
    async (id) => {
        const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
        return result?.data;
    }
);

const AdminProductsSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload?.data
            })
            .addCase(fetchAllProduct.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            });
    }
});

export default AdminProductsSlice.reducer;
