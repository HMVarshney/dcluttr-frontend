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

export const connectFacebook = createAsyncThunk(
  "sourceConnect/facebook",
  async ({ brandId, orgId, accountId }, { rejectWithValue }) => {
    try {
      const response = await axiosMetaServiceInstance.post("workflows/facebook", { brandId, orgId, accountId });
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const sourceConnectSlice = createSlice({
  name: "sourceConnect",
  initialState: {
    google: {
      sourceConnectLoading: false
    },
    facebook: {
      sourceConnectLoading: false
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectGoogle.pending, (state) => {
        state.google.sourceConnectLoading = true;
      })
      .addCase(connectGoogle.fulfilled, (state) => {
        state.google.sourceConnectLoading = false;
      })
      .addCase(connectGoogle.rejected, (state) => {
        state.google.sourceConnectLoading = false;
      })
      .addCase(connectFacebook.pending, (state) => {
        state.facebook.sourceConnectLoading = true;
      })
      .addCase(connectFacebook.fulfilled, (state) => {
        state.facebook.sourceConnectLoading = false;
      })
      .addCase(connectFacebook.rejected, (state) => {
        state.facebook.sourceConnectLoading = false;
      });
  }
});

export default sourceConnectSlice.reducer;
