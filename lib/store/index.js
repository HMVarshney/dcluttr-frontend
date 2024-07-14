import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './features/dashboardSlice';
import authReducer from './features/authSlice';
import brandReducer from './features/brandSlice';
import organizationReducer from './features/organizationSlice';
import invitationReducer from './features/invitationSlice';


export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        auth: authReducer,
        brand: brandReducer,
        organization: organizationReducer,
        invitations: invitationReducer,
    }
});