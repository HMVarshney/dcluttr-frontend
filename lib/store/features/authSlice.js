import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { setCookie } from "@/lib/utils";
import { acceptInvitation } from "./invitationSlice";

// Thunk to handle login
export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axiosInterceptorInstance.post("/auth/login", { email, password });
    const { data } = response;
    if (data?.status === "success") {
      setCookie("accessToken", data?.data?.accessToken);
      return { email, data: data?.data };
    } else {
      return rejectWithValue({ email, data: data?.errors });
    }
  } catch (error) {
    return rejectWithValue({ email, data: error.response.data });
  }
});

// Thunk to handle signup and OTP generation
export const signUp = createAsyncThunk("auth/signUp", async (data, { dispatch, rejectWithValue }) => {
  try {
    const signUpRequest = JSON.stringify({ ...data, mobile: data.mobile ? data.mobile : null });
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("signUpRequest", signUpRequest);

    const response = await axiosInterceptorInstance.post("/auth/signup", formData);
    const signUpResponseData = response.data;
    if (signUpResponseData?.status === "success") {
      dispatch(setEmail(data.email));
      await axiosInterceptorInstance.post("/auth/otp/generate", { email: data.email });
      dispatch(setStep(2));
    }
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Thunk to handle OTP verification
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp, invitationId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInterceptorInstance.post("/auth/otp/verify", {
        email,
        otp
      });
      const { data } = response;
      if (data?.status === "success") {
        setCookie("accessToken", data?.data?.accessToken);
        setCookie("refreshToken", data?.data?.refreshToken);
      } else {
        return rejectWithValue({ email, data: data?.errors });
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }

    if (invitationId) {
      await dispatch(acceptInvitation({ invitationId }));
    } else {
      dispatch(setStep(3));
    }
  }
);

// Thunk to handle OTP resend
export const resendOTP = createAsyncThunk("auth/resendOTP", async (email, { rejectWithValue }) => {
  try {
    await axiosInterceptorInstance.post("/auth/otp/resend", { email });
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Thunk to handle organization details submission
export const submitOrganizationDetails = createAsyncThunk("auth/submitOrganizationDetails", async (data, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("name", data.name);
    formData.append("organizationType", data.organizationType);
    formData.append("website", data.website);

    const response = await axiosInterceptorInstance.post("/organization/add", formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    step: 1,
    email: "",
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.step = 1;
      state.email = "";
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
        state.email = action.payload.email;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitOrganizationDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrganizationDetails.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitOrganizationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setStep, setEmail, logout } = authSlice.actions;
export default authSlice.reducer;
