import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Thunk to handle fetching brands
export const fetchBrands = createAsyncThunk(
    'brand/fetchBrands',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInterceptorInstance.get('/brand/my');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
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
    },
    reducers: {
        resetState(state) {
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitBrandDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitBrandDetails.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(submitBrandDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brandsList = action.payload;
                state.status = 'success';
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            });
    },
});

export const { resetState } = brandSlice.actions;
export default brandSlice.reducer;
