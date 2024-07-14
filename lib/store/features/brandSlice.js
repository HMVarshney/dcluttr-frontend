import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to handle brand details submission
export const submitBrandDetails = createAsyncThunk('brand/submitBrandDetails', async (data, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('file', data.file);
        formData.append('name', data.name);
        formData.append('monthlyAdSpend', data.monthlyAdSpend);
        formData.append('website', data.website);
        formData.append('orgId', data.orgId);

        const response = await axiosInterceptorInstance.post('/brand', formData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const brandSlice = createSlice({
    name: 'brand',
    initialState: {
        status: 'idle',
        brandsList: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        setBrandsList(state, action) {
            state.brandsList = action.payload;
        },
        setBrandsListStatus(state, action) {
            state.status = action.payload;
        },
        resetState(state) {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitBrandDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(submitBrandDetails.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.success = true;
            })
            .addCase(submitBrandDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { setBrandsListStatus, setBrandsList, resetState } = brandSlice.actions;
export default brandSlice.reducer;
