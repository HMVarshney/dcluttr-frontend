import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import authReducer from "./features/authSlice";
import brandReducer from "./features/brandSlice";
import organizationReducer from "./features/organizationSlice";
import invitationReducer from "./features/invitationSlice";
import metaAdsReducer from "./features/metaAdsSlice";
import googleAdsReducer from "./features/googleAdsSlice";
import creativeReducer from "./features/creativeSlice";
import sourceConnectReducer from "./features/sourceConnectSlice";
import dynamicDashboardReducer from "./features/dynamicDashboard";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    brand: brandReducer,
    organization: organizationReducer,
    invitations: invitationReducer,
    metaAds: metaAdsReducer,
    googleAds: googleAdsReducer,
    creative: creativeReducer,
    sourceConnect: sourceConnectReducer,
    dynamicDashboard: dynamicDashboardReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["dynamicDashboard/setGridstackInstance"],
        ignoredPaths: ["dynamicDashboard.gridstackInstance"]
      }
    })
});
