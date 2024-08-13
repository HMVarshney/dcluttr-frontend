import axiosInstance from "@/lib/axiosInterceptorInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to handle brand details submission
export const submitBrandDetails = createAsyncThunk("brand/submitBrandDetails", async (data, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("name", data.name);
    formData.append("monthlyAdSpend", data.monthlyAdSpend);
    formData.append("website", data.website);
    formData.append("orgId", data.orgId);

    const response = await axiosInstance.post("/brand", formData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

export const fetchBrandById = createAsyncThunk("brand/brandById", async (brandId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/brand/${brandId}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    isLoadingBrandsList: true,
    brandsList: [],
    selectedBrand: {},
    loading: false,
    error: null,
    brandDetails: {
      brandDetails: {},
      loading: false
    }
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
    }
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
        state.error = action.payload.data.message;
      })
      .addCase(fetchBrandById.pending, (state) => {
        state.brandDetails.loading = true;
      })
      .addCase(fetchBrandById.fulfilled, (state, action) => {
        state.brandDetails.brandDetails[action.payload.data.id] = action.payload.data;
        state.brandDetails.loading = false;
      })
      .addCase(fetchBrandById.rejected, (state) => {
        state.brandDetails.loading = false;
      });
  }
});

export const { resetState, setBrand, setBrandsList } = brandSlice.actions;
export default brandSlice.reducer;
