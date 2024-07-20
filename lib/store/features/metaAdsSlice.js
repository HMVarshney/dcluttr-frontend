// lib/metaAdsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cubeJsInterceptorInstance from '@/lib/cubejsInterceptorInstance';
import { replaceDotWithUnderscore, shortenKeyNames } from '@/lib/utils';

// Thunk to handle Campaign
export const getCampaignData = createAsyncThunk('metaAds/getCampaignData', async (_, { rejectWithValue }) => {
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
        return shortenKeyNames(res?.loadResponse)
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


// Thunk to handle Ad sets
export const getAdSets = createAsyncThunk('metaAds/getAdSets', async (_, { rejectWithValue }) => {
    try {
        const res = await cubeJsInterceptorInstance
            .load({
                "measures": [
                    "google_ad_group_stream.purchase_value_sum",
                    "google_ad_group_stream.ad_spend_sum",
                    "google_ad_group_stream.purchase_sum",
                    "google_ad_group_stream.count",
                    "google_ad_group_stream.impressions_sum",
                    "google_ad_group_stream.clicks_sum",
                    "google_ad_group_stream.vtc_sum",
                    "google_ad_group_stream.ctr",
                    "google_ad_group_stream.cpc",
                    "google_ad_group_stream.cpm",
                    "google_ad_group_stream.roas",
                    "google_ad_group_stream.aov",
                    "google_ad_group_stream.cpa"
                ],
                "dimensions": [
                    "google_ad_group.name",
                    "google_ad_group_stream.ad_group_id"
                ],
                "order": {
                    "google_ad_group_stream.purchase_value_sum": "desc"
                },
                "timeDimensions": [
                    {
                        "dimension": "google_ad_group_stream.date",
                        "granularity": "day"
                    }
                ]
            })
        return shortenKeyNames(res?.loadResponse)
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


// Thunk to handle Ads 
export const getAds = createAsyncThunk('metaAds/getAds', async (_, { rejectWithValue }) => {
    try {
        const res = await cubeJsInterceptorInstance
            .load({
                "measures": [
                    "google_ads_stream.count",
                    "google_ads_stream.purchase_value_sum",
                    "google_ads_stream.ad_spend_sum",
                    "google_ads_stream.purchase_sum",
                    "google_ads_stream.impressions_sum",
                    "google_ads_stream.clicks_sum",
                    "google_ads_stream.vtc_sum",
                    "google_ads_stream.ctr",
                    "google_ads_stream.cpc",
                    "google_ads_stream.cpm",
                    "google_ads_stream.roas",
                    "google_ads_stream.aov",
                    "google_ads_stream.cpa"
                ],
                "order": {
                    "google_ads_stream.count": "desc"
                },
                "dimensions": [
                    "google_ads_stream.id",
                    "google_ads.name"
                ],
                "timeDimensions": [
                    {
                        "dimension": "google_ads_stream.date",
                        "granularity": "week"
                    }
                ]
            })
        return shortenKeyNames(res?.loadResponse)
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
        return replaceDotWithUnderscore(res?.loadResponse)
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const metaAdsSlice = createSlice({
    name: 'metaAds',
    initialState: {
        campaignData: {
            loading: true,
            error: null,
            data: {}
        },
        adSetsData: {
            loading: true,
            error: null,
            data: {}
        },
        adsData: {
            loading: true,
            error: null,
            data: {}
        },
        loading: false,
        error: null,
        biddingStrategy: {
            loading: true,
            error: null,
            data: {}
        }
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCampaignData.pending, (state) => {
                state.campaignData.loading = true;
                state.campaignData.error = null;
            })
            .addCase(getCampaignData.fulfilled, (state, action) => {
                state.campaignData.loading = false;
                state.campaignData.error = null;
                state.campaignData.data = action.payload;
            })
            .addCase(getCampaignData.rejected, (state, action) => {
                state.campaignData.loading = false;
                state.campaignData.error = action.payload;
            })
            //getAdSets
            .addCase(getAdSets.pending, (state) => {
                state.adSetsData.loading = true;
                state.adSetsData.error = null;
            })
            .addCase(getAdSets.fulfilled, (state, action) => {
                state.adSetsData.loading = false;
                state.adSetsData.error = null;
                state.adSetsData.data = action.payload;
            })
            .addCase(getAdSets.rejected, (state, action) => {
                state.adSetsData.loading = false;
                state.adSetsData.error = action.payload;
            })
            //getAds
            .addCase(getAds.pending, (state) => {
                state.adsData.loading = true;
                state.adsData.error = null;
            })
            .addCase(getAds.fulfilled, (state, action) => {
                state.adsData.loading = false;
                state.adsData.error = null;
                state.adsData.data = action.payload;
            })
            .addCase(getAds.rejected, (state, action) => {
                state.adsData.loading = false;
                state.adsData.error = action.payload;
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

export const { } = metaAdsSlice.actions;
export default metaAdsSlice.reducer;
