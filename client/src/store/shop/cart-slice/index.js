import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems: [],
    isLoading: false
}

// add To Cart
export const addToCart = createAsyncThunk(
    "/cart/addToCart",
    async({userId , productId , quantity})=>{
        const response = await axios.post("http://localhost:5000/api/shop/cart/add" , {userId , productId , quantity});
        return response.data;
    }
);

// Fetch cart items
export const fetchCartItems = createAsyncThunk(
    "/cart/fetchCardItems",
    async (userId) => {
        const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
        return response.data;
    }
);

// delete cart items
export const deleteCartItems = createAsyncThunk(
    "/cart/deleteCartItems",
    async({userId , productId })=>{
        const response = await axios.delete(`http://localhost:5000/api/shop/cart/delete/${userId}/${productId}` , {userId , productId});
        return response.data;
    }
);

// update cart items
export const updateCartQuantity = createAsyncThunk(
    "/cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(`http://localhost:5000/api/shop/cart/update-cart`, { userId, productId, quantity });
        return response.data;
    }
);

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //addToCart
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            }).addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            }).addCase(addToCart.rejected, (state,action) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            //fetchCartItems
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(fetchCartItems.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            //deleteCartItems
            .addCase(deleteCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(deleteCartItems.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            //updateCartQuantity
            .addCase(updateCartQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data;
            })
            .addCase(updateCartQuantity.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            });
    }
})

export default shoppingCartSlice.reducer;