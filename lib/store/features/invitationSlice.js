// how to use this 
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { sendInvitation, getInvitation, acceptInvitation, getMyInvitations, resendInvitation } from '@/lib/invitationSlice';

// export default function Invitations() {
//   const dispatch = useDispatch();
//   const { invitations, currentInvitation, loading, error } = useSelector((state) => state.invitations);

//   useEffect(() => {
//     // Example usage: Send an invitation
//     dispatch(sendInvitation({
//       email: "hey3@yopmail.com",
//       roleId: "2",
//       brandIds: ["1"],
//       orgId: "3",
//     }));

//     // Example usage: Get an invitation
//     dispatch(getInvitation("3"));

//     // Example usage: Accept an invitation
//     dispatch(acceptInvitation({ invitationId: "invitationId", token: "your-token-here" }));

//     // Example usage: Get my invitations
//     dispatch(getMyInvitations("your-token-here"));

//     // Example usage: Resend an invitation
//     dispatch(resendInvitation({ invitationId: "invitationId", orgId: "orgId", token: "your-token-here" }));
//   }, [dispatch]);

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       <pre>{JSON.stringify(invitations, null, 2)}</pre>
//       <pre>{JSON.stringify(currentInvitation, null, 2)}</pre>
//     </div>
//   );
// }





import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Thunks for each API call
export const sendInvitation = createAsyncThunk(
    'invitations/sendInvitation',
    async (invitationData, { rejectWithValue }) => {
        try {
            const response = await axiosInterceptorInstance.post(`/invitations`, invitationData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getInvitation = createAsyncThunk(
    'invitations/getInvitation',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInterceptorInstance.get(`/invitations/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const acceptInvitation = createAsyncThunk(
    'invitations/acceptInvitation',
    async ({ invitationId, token }, { rejectWithValue }) => {
        try {
            const response = await axiosInterceptorInstance.post(`/invitations/${invitationId}/accept`, {});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getMyInvitations = createAsyncThunk(
    'invitations/getMyInvitations',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axiosInterceptorInstance.post(`/invitations/mine`, {});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const resendInvitation = createAsyncThunk(
    'invitations/resendInvitation',
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
    name: 'invitations',
    initialState: {
        invitations: [],
        currentInvitation: null,
        loading: false,
        error: null,
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
    },
});

export default invitationSlice.reducer;
