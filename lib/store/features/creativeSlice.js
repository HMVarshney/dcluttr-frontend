import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { replaceDotWithUnderscore } from '@/lib/utils';
import cubeJsApi from '@/lib/cubeJsApi';

// Thunk to fetch creative details
export const fetchCreativeDetails = createAsyncThunk('creative/fetchCreativeDetails', async (_, { dispatch }) => {
    try {
        const api = cubeJsApi();
        const res = await api
            .load({
                "measures": [
                    "meta_ad_stream.count",
                    "meta_ad_stream.purchase_value_sum",
                    "meta_ad_stream.ad_spend_sum",
                    "meta_ad_stream.purchase_sum",
                    "meta_ad_stream.impressions_sum",
                    "meta_ad_stream.link_clicks_sum",
                    "meta_ad_stream.landing_page_views_sum",
                    "meta_ad_stream.add_to_carts_sum",
                    "meta_ad_stream.checkount_initiated_sum",
                    "meta_ad_stream.ctr",
                    "meta_ad_stream.cpc",
                    "meta_ad_stream.cpm",
                    "meta_ad_stream.roas",
                    "meta_ad_stream.aov",
                    "meta_ad_stream.cpa"
                ],
                "order": {
                    "meta_ad_stream.count": "desc"
                },
                "dimensions": [
                    "meta_ads.id",
                    "meta_ads.name",
                    "meta_ads.status",
                    "meta_ads.effective_status",
                    "meta_ads.creative_type",
                    "meta_ads.creative_link",
                    "meta_ads.link",
                    "meta_ads.ad_set_id",
                    "meta_ads.campaign_id"
                ],
                "timeDimensions": [
                    {
                        "dimension": "meta_ad_stream.date",
                        "granularity": "day"
                    }
                ]
            })
        return replaceDotWithUnderscore(res?.loadResponse)
    } catch (error) {
        return rejectWithValue(error.response.error);
    }
});


const creativeSlice = createSlice({
    name: 'creative',
    initialState: {
        creativeDetails: {},
        status: 'idle',
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreativeDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCreativeDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.creativeDetails = action.payload;
            })
            .addCase(fetchCreativeDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const {
} = creativeSlice.actions;

export default creativeSlice.reducer;
