import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { setBrand, setBrandsList } from "./brandSlice";
import { GROUP_BY } from "@/lib/utils";
import moment from "moment";

// Thunk to fetch user details
export const fetchUserDetails = createAsyncThunk("user/fetchUserDetails", async (_, { dispatch, rejectWithValue}) => {
  const response = await axiosInterceptorInstance.get("/user/me");
  if (response.data?.status === "success") {
    dispatch(setBrand(response.data?.data?.brands[0]));
    dispatch(setBrandsList(response.data?.data?.brands));
    return response.data;
  }else{
    rejectWithValue(response.data?.errors);
  }
});


// Thunk to handle user update
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      
      const response = await axiosInterceptorInstance.post(`/user/me/update`, userData);
      return { ...response.data, userData };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSettingsOpen: false,
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
    setSettingsOpen: (state, action) => {
      state.isSettingsOpen = action.payload;
    },
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
        state.userDetails = action.payload?.data;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }).addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetails = action.payload?.data;
      }).addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const {setSettingsOpen, setSideBarClose, setHideBanner, setGroupBy, setDateRange, setMainChart } = userSlice.actions;

export default userSlice.reducer;
