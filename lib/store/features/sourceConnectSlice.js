import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosMetaServiceInstance } from "@/lib/axiosInterceptorInstance";

export const connectGoogle = createAsyncThunk(
  "sourceConnect/google",
  async ({ brandId, orgId, customerId }, { rejectWithValue }) => {
    try {
      const response = await axiosMetaServiceInstance.post("workflows/google", { brandId, orgId, customerId });
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const sourceConnectSlice = createSlice({
  name: "sourceConnect",
  initialState: {
    googleConnectLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectGoogle.pending, (state) => {
        state.googleConnectLoading = true;
      })
      .addCase(connectGoogle.fulfilled, (state) => {
        state.googleConnectLoading = false;
      })
      .addCase(connectGoogle.rejected, (state) => {
        state.googleConnectLoading = false;
      });
  }
});

export default sourceConnectSlice.reducer;
