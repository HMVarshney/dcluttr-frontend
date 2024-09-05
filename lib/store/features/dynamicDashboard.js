import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { getActiveDashboardSection } from "@/lib/utils/dynamicDashboard.utils";

export const fetchDashboard = createAsyncThunk("dynamicDashboard/fetchDashboard", async (brandId, { rejectWithValue }) => {
  try {
    const response = await axiosInterceptorInstance.get(`/brand/${brandId}/dashboards`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const saveDashboardSection = createAsyncThunk(
  "dynamicDashboard/saveDashboardSection",
  async (section, { rejectWithValue }) => {
    try {
      const response = await axiosInterceptorInstance.post(`/brand/24/dashboards`, section);
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
    activeSection: {
      id: null,
      section: null
    },
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
    setActiveSection: (state, action) => {
      state.activeSection.id = action.payload.id;
      state.activeSection.section = getActiveDashboardSection(state.dashboard, action.payload.id).section;
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
      .addCase(fetchDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboard = action.payload.data;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const dynamicDashboardActions = dynamicDashboardSlice.actions;
export default dynamicDashboardSlice.reducer;
