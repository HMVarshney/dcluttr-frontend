import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { setBrand, setBrandsList } from "./brandSlice";
import { GROUP_BY } from "@/lib/utils";
import moment from "moment";

// Thunk to fetch user details
export const fetchUserDetails = createAsyncThunk("user/fetchUserDetails", async (_, { dispatch }) => {
  const response = await axiosInterceptorInstance.get("/user/me");
  if (response.data?.brands) {
    dispatch(setBrand(response.data?.brands[0]));
    dispatch(setBrandsList(response.data?.brands));
  }
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    hideBanner: false,
    userDetails: {},
    sideBarClose: false,
    status: "idle",
    error: null,
    showMainChart: false,
    groupBy: GROUP_BY[2],
    dateRange: {
      from: "2019-01-01",
      to: "2022-12-23"
    }
  },
  reducers: {
    setSideBarClose: (state, action) => {
      state.sideBarClose = action.payload;
    },
    setHideBanner: (state, action) => {
      state.hideBanner = action.payload;
    },
    setGroupBy: (state, action) => {
      state.groupBy = action.payload;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setMainChart: (state, action) => {
      state.showMainChart = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { setSideBarClose, setHideBanner, setGroupBy, setDateRange, setMainChart } = userSlice.actions;

export default userSlice.reducer;
