// lib/metaAdsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cubeJsInterceptorInstance from '@/lib/cubejsInterceptorInstance';


// Thunk to handle getData
export const getData = createAsyncThunk('metaAds/getData', async (_, { rejectWithValue }) => {
    try {
        const res = await cubeJsInterceptorInstance
            .load({
                "measures": [
                    "google_campaign_stream.purchase_value_sum",
                    "google_campaign_stream.ad_spend_sum",
                    "google_campaign_stream.purchase_sum",
                    "google_campaign_stream.impressions_sum",
                    "google_campaign_stream.clicks_sum",
                    "google_campaign_stream.vtc_sum",
                    "google_campaign_stream.ctr",
                    "google_campaign_stream.cpc",
                    "google_campaign_stream.cpm",
                    "google_campaign_stream.cpm",
                    "google_campaign_stream.roas",
                    "google_campaign_stream.aov",
                    "google_campaign_stream.cpa"
                ],
                "dimensions": [
                    "google_campaign.id",
                    "google_campaign.name",
                ],
                "order": {
                    "google_campaign_stream.purchase_value_sum": "desc"
                },
                "timeDimensions": [
                    {
                        "dimension": "google_campaign_stream.date",
                        "granularity": "week"
                    }
                ]
            })
        return res
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


// Thunk to handle Bidding strategy
export const getBiddingStrategy = createAsyncThunk('metaAds/getBiddingStrategy', async (_, { rejectWithValue }) => {
    try {
        const res = await cubeJsInterceptorInstance
            .load({
                "measures": [
                    "google_bidding_strategy.count",
                    "google_bidding_strategy.purchase_value_sum",
                    "google_bidding_strategy.ad_spend_sum",
                    "google_bidding_strategy.purchase_sum",
                    "google_bidding_strategy.impressions_sum",
                    "google_bidding_strategy.clicks_sum",
                    "google_bidding_strategy.vtc_sum",
                    "google_bidding_strategy.ctr",
                    "google_bidding_strategy.cpc",
                    "google_bidding_strategy.cpm",
                    "google_bidding_strategy.roas",
                    "google_bidding_strategy.aov",
                    "google_bidding_strategy.cpa"
                ],
                "timeDimensions": [
                    {
                        "dimension": "google_bidding_strategy.date",
                        "granularity": "week"
                    }
                ],
                "order": {
                    "google_bidding_strategy.count": "desc"
                },
                "dimensions": [
                    "google_bidding_strategy.bidding_strategy"
                ]
            })
        return res
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const metaAdsSlice = createSlice({
    name: 'metaAds',
    initialState: {
        loading: false,
        error: null,
        biddingStrategy: {
            loading: true,
            error: null,
            data: {}
        }
    },
    reducers: {
        setStep(state, action) {
            state.step = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getData.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(getData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getBiddingStrategy.pending, (state) => {
                state.biddingStrategy.loading = true;
                state.biddingStrategy.error = null;
            })
            .addCase(getBiddingStrategy.fulfilled, (state, action) => {
                state.biddingStrategy.loading = false;
                state.biddingStrategy.error = null;
                state.biddingStrategy.data = action.payload;
            })
            .addCase(getBiddingStrategy.rejected, (state, action) => {
                state.biddingStrategy.loading = false;
                state.biddingStrategy.error = action.payload;
            })
    },
});

export const { setStep, } = metaAdsSlice.actions;
export default metaAdsSlice.reducer;
