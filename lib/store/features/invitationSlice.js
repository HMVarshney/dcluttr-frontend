import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendInvitation = createAsyncThunk("invitations/sendInvitation", async (invitationData, { rejectWithValue }) => {
  try {
    const response = await axiosInterceptorInstance.post(`/invitations`, invitationData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getInvitation = createAsyncThunk("invitations/getInvitation", async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInterceptorInstance.get(`/invitations/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const acceptInvitation = createAsyncThunk(
  "invitations/acceptInvitation",
  async ({ invitationId, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInterceptorInstance.post(`/invitations/${invitationId}/accept`, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMyInvitations = createAsyncThunk("invitations/getMyInvitations", async (token, { rejectWithValue }) => {
  try {
    const response = await axiosInterceptorInstance.post(`/invitations/mine`, {});
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const resendInvitation = createAsyncThunk(
  "invitations/resendInvitation",
  async ({ invitationId, orgId, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInterceptorInstance.post(`/invitations/${invitationId}/resend/${orgId}`, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const invitationSlice = createSlice({
  name: "invitations",
  initialState: {
    invitations: [],
    currentInvitation: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendInvitation.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations.push(action.payload);
      })
      .addCase(sendInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvitation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInvitation = action.payload;
      })
      .addCase(getInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(acceptInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptInvitation.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyInvitations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyInvitations.fulfilled, (state, action) => {
        state.loading = false;
        state.invitations = action.payload;
      })
      .addCase(getMyInvitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resendInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendInvitation.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resendInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default invitationSlice.reducer;
