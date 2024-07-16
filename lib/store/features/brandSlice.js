import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// // Thunk to handle fetching brands
// export const fetchBrands = createAsyncThunk(
//     'brand/fetchBrands',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axiosInterceptorInstance.get('/brand/my');
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data.message);
//         }
//     }
// );
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
        isLoadingBrandsList: true,
        brandsList: [],
        selectedBrand: {},
        loading: false,
        error: null,
    },
    reducers: {
        resetState(state) {
            state.loading = false;
            state.error = null;
            state.isLoadingBrandsList = true;
        },
        setBrand(state, action) {
            state.selectedBrand = action.payload;
        },
        setBrandsList(state, action) {
            state.isLoadingBrandsList = false;
            state.brandsList = action.payload;
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
    },
});

export const { resetState, setBrand, setBrandsList } = brandSlice.actions;
export default brandSlice.reducer;
