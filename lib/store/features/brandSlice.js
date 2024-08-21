import axiosInstance from "@/lib/axiosInterceptorInstance";
import { getRandomColor } from "@/lib/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const updateBrand = createAsyncThunk('brand/updateBrand', async(data, {rejectWithValue}) => {
  try{
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("monthlyAdSpend", data.monthlyAdSpend);
    formData.append("website", data.website);
    formData.append("orgId", data.orgId);
    if(data.file){
      formData.append('file', data.file);
    }

    const response = await axiosInstance.put('/brand', formData);
    return response.data;
  } catch(err){
    console.log('error', err);
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
      state.brandsList = action.payload?.map(ele=>({...ele, randomColor:getRandomColor()}));
    }
  },
  extraReducers: (builder) => {
    builder
      // submitBrandDetails
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
      // fetchBrandById
      .addCase(fetchBrandById.pending, (state) => {
        state.brandDetails.loading = true;
      })
      .addCase(fetchBrandById.fulfilled, (state, action) => {
        state.brandDetails.brandDetails[action.payload.data.id] = action.payload.data;
        state.brandDetails.loading = false;
      })
      .addCase(fetchBrandById.rejected, (state) => {
        state.brandDetails.loading = false;
      })
      // updateBrand
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.brandDetails.brandDetails[action.payload.data.id] = action.payload.data;
      })
  }
});

export const { resetState, setBrand, setBrandsList } = brandSlice.actions;
export default brandSlice.reducer;
