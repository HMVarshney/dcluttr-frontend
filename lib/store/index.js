import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './features/dashboardSlice';
import authReducer from './features/authSlice';
import brandReducer from './features/brandSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        auth: authReducer,
        brand: brandReducer,
    }
});