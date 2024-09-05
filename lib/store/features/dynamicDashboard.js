import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";

export const fetchDashboardData = createAsyncThunk(
  "dynamicDashboard/fetchDashboardData",
  async (brandId, { rejectWithValue }) => {
    try {
      const response = await axiosInterceptorInstance.get(`/brand/${brandId}/dashboards`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const dynamicDashboardSlice = createSlice({
  name: "dynamicDashboard",
  initialState: {
    isLoading: false,
    error: null,
    dashboard: [],
    activeSectionId: null,
    cardCustomizableProps: {}
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
    setActiveSectionId: (state, action) => {
      state.activeSectionId = action.payload;
    },
    setCardCustomizableProps: (state, action) => {
      state.cardCustomizableProps = {
        ...state.cardCustomizableProps,
        ...action.payload
      };
    },
    updateCardProps: (state, action) => {
      const { cardId, partialUpdates } = action.payload;
      state.cardCustomizableProps = {
        ...state.cardCustomizableProps,
        [cardId]: {
          ...state.cardCustomizableProps[cardId],
          ...partialUpdates
        }
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboard = action.payload.data;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const dynamicDashboardActions = dynamicDashboardSlice.actions;
export default dynamicDashboardSlice.reducer;
