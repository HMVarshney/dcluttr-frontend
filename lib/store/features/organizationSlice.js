import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to handle all users of organization 
export const getAllUsersOfOrganization = createAsyncThunk(
    'organization/getAllUsersOfOrganization',
    async (id) => {
        const response = await axiosInterceptorInstance.get(`/organization/${id}/users`);
        return response.data;
    });

// Thunk to handle organization update
export const updateOrganization = createAsyncThunk(
    'organization/updateOrganization',
    async (organizationData, { rejectWithValue }) => {
        try {
            const data = new FormData();
            data.append('name', organizationData?.name);
            data.append('email', organizationData?.email);
            data.append('website', organizationData?.website);
            data.append('id', organizationData?.id);
            data.append('organizationType', organizationData?.organizationType);
            const response = await axiosInterceptorInstance.post(`/organization/update`, data);
            return { ...response.data, organizationData };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

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
            })
            .addCase(updateOrganization.pending, (state) => {
                state.status = 'updating';
                state.error = null;
            })
            .addCase(updateOrganization.fulfilled, (state, action) => {
                const organizationData = action.payload.organizationData;
                state.status = 'succeeded';
                state.error = null;

            })
            .addCase(updateOrganization.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { } = organizationSlice.actions;
export default organizationSlice.reducer;
