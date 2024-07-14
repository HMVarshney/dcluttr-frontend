import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { setBrandsList, setBrandsListStatus } from './brandSlice';

// Thunk to fetch user details
export const fetchUserDetails = createAsyncThunk('user/fetchUserDetails', async (_, { dispatch }) => {
    const response = await axiosInterceptorInstance.get('/user/me');
    const brands = response.data?.brands
    dispatch(setBrandsList(brands))
    dispatch(setBrandsListStatus("success"));
    return response.data;
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: {},
        sideBarClose: false,
        status: 'idle',
        error: null
    },
    reducers: {
        setSideBarClose: (state, action) => {
            state.sideBarClose = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userDetails = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setSideBarClose } = userSlice.actions;

export default userSlice.reducer;
