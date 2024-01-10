import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';

const preloadedState = {
    user: JSON.parse(localStorage.getItem('user')) || {
        info: {
            token: null,
            username: "",
            isAdmin: false
        },
        loading: false,
        error: null,
    },
};


export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState
});