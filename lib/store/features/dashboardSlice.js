import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";

// Thunk to fetch user details
export const fetchUserDetails = createAsyncThunk('dashboard/fetchUserDetails', async (_, { dispatch }) => {
    const response = await axiosInterceptorInstance.get('/user/me');

    const firstOrganizationId = response.data?.organizationAuthorities?.organizationAuthorities?.[0]?.organizationId;
    if (firstOrganizationId) {
        dispatch(fetchOrganizationDetails(firstOrganizationId));
    }

    return response.data;
});

// Thunk to fetch organization details by ID
export const fetchOrganizationDetails = createAsyncThunk('dashboard/fetchOrganizationDetails', async (id) => {
    const response = await axiosInterceptorInstance.get(`/organization/${id}`);
    return response.data;
});

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        userDetails: {},
        organizationDetails: {},
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
            })
            .addCase(fetchOrganizationDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrganizationDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.organizationDetails = action.payload;
            })
            .addCase(fetchOrganizationDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });;
    }
});

export const { setSideBarClose } = dashboardSlice.actions;

export default dashboardSlice.reducer;
