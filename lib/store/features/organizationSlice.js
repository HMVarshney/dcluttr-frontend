import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to handle users of Organization 
export const getAllUsersOfOrganization = createAsyncThunk('organization/getAllUsersOfOrganization', async (id) => {
    const response = await axiosInterceptorInstance.get(`/organization/${id}/users`);
    return response.data;
});

const organizationSlice = createSlice({
    name: 'organization',
    initialState: {
        status: 'loading',
        usersList: [],
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersOfOrganization.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllUsersOfOrganization.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.usersList = action.payload;
            })
            .addCase(getAllUsersOfOrganization.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { } = organizationSlice.actions;
export default organizationSlice.reducer;
