import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCartAPI, removeCartItemAPI } from '../../services/shoppingCart';
import { updateCartItemAPI } from '../../services/shoppingCart';



export const removeCartItem = createAsyncThunk(
    'cart/removeCartItem',
    async ({ token, productID }) => {
        const responseData = await removeCartItemAPI(token, productID);
        return responseData;
    }
)

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ token, productID, quantity }) => {
        const responseData = await updateCartItemAPI(token, productID, quantity);
        return responseData;
    }
)

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (token) => {
        const responseData = await fetchCartAPI(token);
        return responseData
    }
);

const initialState = {
    cart: {
        items: []
    },
    loading: false,
    error: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loading = false;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(removeCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default cartSlice.reducer;