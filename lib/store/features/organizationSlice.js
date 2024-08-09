import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch user details
export const fetchAllOrganization = createAsyncThunk(
  "organization/fetchAllOrganization",
  async (select = "FIRST", { dispatch, rejectWithValue }) => {
    const response = await axiosInterceptorInstance.get("/organization/my");

    if (response.data?.status === "success") {
      const firstOrganizationId = response.data?.data?.[select === "FIRST" ? 0 : response.data?.data?.length - 1]?.id;
      if (firstOrganizationId) {
        dispatch(fetchOrganizationDetails(firstOrganizationId));
      }
    return response.data?.data;
    }else{
      rejectWithValue(response.data?.errors);
    }
  }
);

// Thunk to fetch organization details by ID
export const fetchOrganizationDetails = createAsyncThunk("organization/fetchOrganizationDetails", async (id,{ rejectWithValue }) => {
  try {
    const response = await axiosInterceptorInstance.get(`/organization/${id}`);
    if (response.data?.status === "success") {
      return response.data?.data;
    }else{
      rejectWithValue(response.data?.errors);
    }
  } catch (error) {
    return error;
  }
});

// Thunk to handle all users of organization
export const getAllUsersOfOrganization = createAsyncThunk("organization/getAllUsersOfOrganization", async (id) => {
  const response = await axiosInterceptorInstance.get(`/organization/${id}/users`);
  return response.data;
});

// Thunk to handle organization update
export const updateOrganization = createAsyncThunk(
  "organization/updateOrganization",
  async (organizationData, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append("name", organizationData?.name);
      data.append("email", organizationData?.email);
      data.append("website", organizationData?.website);
      data.append("id", organizationData?.id);
      data.append("organizationType", organizationData?.organizationType);
      const response = await axiosInterceptorInstance.post(`/organization/update`, data);
      return { ...response.data, organizationData };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    status: "loading",
    usersList: [],
    error: null,
    allOrganizationStatus: "loading",
    allOrganization: [],
    organizationDetails: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersOfOrganization.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUsersOfOrganization.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.usersList = action.payload;
      })
      .addCase(getAllUsersOfOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllOrganization.fulfilled, (state, action) => {
        state.allOrganizationStatus = "succeeded";
        state.allOrganization = action.payload;
      })
      .addCase(fetchOrganizationDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrganizationDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.organizationDetails = action.payload;
      })
      .addCase(fetchOrganizationDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOrganization.pending, (state) => {
        state.status = "updating";
        state.error = null;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const organizationData = action.payload.organizationData;
        state.organizationDetails = {
          ...state.organizationDetails,
          email: organizationData.email,
          name: organizationData.name,
          website: organizationData.website
        };
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const {} = organizationSlice.actions;
export default organizationSlice.reducer;
