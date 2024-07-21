// lib/googleAdsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cubeJsInterceptorInstance from '@/lib/cubejsInterceptorInstance';
import { replaceDotWithUnderscore, shortenKeyNames } from '@/lib/utils';

// Thunk to handle Campaign
export const getCampaignDataGoogle = createAsyncThunk('googleAds/getCampaignDataGoogle', async (_, { rejectWithValue }) => {
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
export const getAdSetsGoogle = createAsyncThunk('googleAds/getAdSetsGoogle', async (_, { rejectWithValue }) => {
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
export const getAdsGoogle = createAsyncThunk('googleAds/getAdsGoogle', async (_, { rejectWithValue }) => {
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
export const getBiddingStrategyGoogle = createAsyncThunk('googleAds/getBiddingStrategyGoogle', async (_, { rejectWithValue }) => {
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


// Thunk to handle Ads Type
export const getAdsTypeGoogle = createAsyncThunk('googleAds/getAdsTypeGoogle', async (_, { rejectWithValue }) => {
    try {
        const res = await cubeJsInterceptorInstance
            .load({
                "measures": [
                    "google_campaign_type.count",
                    "google_campaign_type.purchase_value_sum",
                    "google_campaign_type.ad_spend_sum",
                    "google_campaign_type.purchase_sum",
                    "google_campaign_type.impressions_sum",
                    "google_campaign_type.clicks_sum",
                    "google_campaign_type.vtc_sum",
                    "google_campaign_type.ctr",
                    "google_campaign_type.cpc",
                    "google_campaign_type.cpm",
                    "google_campaign_type.roas",
                    "google_campaign_type.aov",
                    "google_campaign_type.cpa"
                ],
                "dimensions": [
                    "google_campaign_type.campaign_type"
                ],
                "timeDimensions": [],
                "order": {
                    "google_campaign_type.count": "desc"
                }
            })
        return replaceDotWithUnderscore(res?.loadResponse)
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
const googleAdsSlice = createSlice({
    name: 'googleAds',
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
        adsType: {
            loading: true,
            error: null,
            data: {}
        },
        loading: false,
        error: null,
        biddingStrategyGoogleData: {},
        biddingStrategyGoogleLoading: true,
        biddingStrategyGoogleError: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCampaignDataGoogle.pending, (state) => {
                state.campaignData.loading = true;
                state.campaignData.error = null;
            })
            .addCase(getCampaignDataGoogle.fulfilled, (state, action) => {
                state.campaignData.loading = false;
                state.campaignData.error = null;
                state.campaignData.data = action.payload;
            })
            .addCase(getCampaignDataGoogle.rejected, (state, action) => {
                state.campaignData.loading = false;
                state.campaignData.error = action.payload;
            })
            //getAdSetsGoogle
            .addCase(getAdSetsGoogle.pending, (state) => {
                state.adSetsData.loading = true;
                state.adSetsData.error = null;
            })
            .addCase(getAdSetsGoogle.fulfilled, (state, action) => {
                state.adSetsData.loading = false;
                state.adSetsData.error = null;
                state.adSetsData.data = action.payload;
            })
            .addCase(getAdSetsGoogle.rejected, (state, action) => {
                state.adSetsData.loading = false;
                state.adSetsData.error = action.payload;
            })
            //getAdsGoogle
            .addCase(getAdsGoogle.pending, (state) => {
                state.adsData.loading = true;
                state.adsData.error = null;
            })
            .addCase(getAdsGoogle.fulfilled, (state, action) => {
                state.adsData.loading = false;
                state.adsData.error = null;
                state.adsData.data = action.payload;
            })
            .addCase(getAdsGoogle.rejected, (state, action) => {
                state.adsData.loading = false;
                state.adsData.error = action.payload;
            })
            //getBiddingStrategyGoogle
            .addCase(getBiddingStrategyGoogle.pending, (state) => {
                state.biddingStrategyGoogleLoading = true;
                state.biddingStrategyGoogleError = null;
            })
            .addCase(getBiddingStrategyGoogle.fulfilled, (state, action) => {
                state.biddingStrategyGoogleLoading = false;
                state.biddingStrategyGoogleError = null;
                state.biddingStrategyGoogleData = action.payload;
            })
            .addCase(getBiddingStrategyGoogle.rejected, (state, action) => {
                state.biddingStrategyGoogleLoading = false;
                state.biddingStrategyGoogleError = action.payload;
            })
            //getAdsTypeGoogle
            .addCase(getAdsTypeGoogle.pending, (state) => {
                state.adsType.loading = true;
                state.adsType.error = null;
            })
            .addCase(getAdsTypeGoogle.fulfilled, (state, action) => {
                state.adsType.loading = false;
                state.adsType.error = null;
                state.adsType.data = action.payload;
            })
            .addCase(getAdsTypeGoogle.rejected, (state, action) => {
                state.adsType.loading = false;
                state.adsType.error = action.payload;
            })
    },
});

export const { } = googleAdsSlice.actions;
export default googleAdsSlice.reducer;
