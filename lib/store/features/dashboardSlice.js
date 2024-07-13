import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";

export const fetchUserDetails = createAsyncThunk('dashboard/fetchUserDetails', async () => {
    const response = await axiosInterceptorInstance.get('/user/me');
    return response.data;
});

const dashboardSlice = createSlice({
    name: 'dashboard',
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

export const { setSideBarClose } = dashboardSlice.actions;

export default dashboardSlice.reducer;
