import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import authReducer from './features/authSlice';
import brandReducer from './features/brandSlice';
import organizationReducer from './features/organizationSlice';
import invitationReducer from './features/invitationSlice';
import metaAdsReducer from './features/metaAdsSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        brand: brandReducer,
        organization: organizationReducer,
        invitations: invitationReducer,
        metaAds: metaAdsReducer,
    }
});