import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    approvalURL : null,
    isLoading : null,
    orderId : null,
    orderList : [],
    orderDetails : null
}

// TO Create order
export const createNewOrder = createAsyncThunk('/order/createNewOrder', async(orderData)=>{
    // console.log('Received Order Data:',orderData);
    const response = await axios.post('http://localhost:5000/api/shop/order/create' , orderData);
    return response.data;
})


// TO capturePayment
export const capturePayment = createAsyncThunk('/order/capturePayment', async({paymentId , payerId , orderId})=>{
    const response = await axios.post('http://localhost:5000/api/shop/order/capture' , {paymentId , payerId , orderId});
    return response.data;
})


// TO getAllOrderByUser
export const getAllOrderByUser = createAsyncThunk('/order/getAllOrderByUser', async(userId)=>{
    const response = await axios.get(`http://localhost:5000/api/shop/order/list/${userId}`);
    return response.data;
})


//  TO getOrderDetails
export const getOrderDetails = createAsyncThunk('/order/getOrderDetails', async(id)=>{
    const response = await axios.get(`http://localhost:5000/api/shop/order/details/${id}`);
    return response.data;
})


const shoppingOrderSlice = createSlice({
    name : 'shoppingOrderSlice',
    initialState,
    reducers : {
        resetOrderDetails: (state )=>{
            state.orderDetails = null;
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(createNewOrder.pending , (state)=>{
            state.isLoading = true;
        }).addCase(createNewOrder.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.approvalURL = action.payload.approvalURL;
            state.orderId = action.payload.orderId;
            sessionStorage.setItem("currentOrderId", JSON.stringify(action.payload.orderId));
        }).addCase(createNewOrder.rejected , (state)=>{
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null;
        })  
        .addCase(getAllOrderByUser.pending , (state)=>{
            state.isLoading = true;
        }).addCase(getAllOrderByUser.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getAllOrderByUser.rejected , (state)=>{
            state.isLoading = false;
            state.orderList = [];
        })
        .addCase(getOrderDetails.pending , (state)=>{
            state.isLoading = true;
        }).addCase(getOrderDetails.fulfilled , (state , action)=>{
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(getOrderDetails.rejected , (state)=>{
            state.isLoading = false;
            state.orderDetails = null;
        })
    }
})

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;