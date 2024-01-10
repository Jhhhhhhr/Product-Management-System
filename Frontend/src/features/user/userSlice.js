import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserInfoAPI } from '../../services/signin';


const removeLocalStorage = () => {
    localStorage.removeItem('user');
}

const saveToLocalStorage = (state) => {
    localStorage.setItem('user', JSON.stringify(state));
};

export const fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async (userData) => {
        const responseData = await fetchUserInfoAPI(userData);
        return responseData;
    }
);

const initialState = {
    info: {
        token: null,
        username: "",
        isAdmin: false
    },
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.info = {
                token: null,
                username: "",
                isAdmin: false
            }
            state.loading = false;
            state.error = null;
            removeLocalStorage();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.info = action.payload;
                state.loading = false;
                saveToLocalStorage(state);
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                //console.log(`action: ${action.error.message}`);
                state.error = action.error.message || 'Failed to fetch user token';
                state.loading = false;
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
