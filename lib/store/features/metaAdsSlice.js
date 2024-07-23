// lib/metaAdsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cubeJsApi from '@/lib/cubeJsApi';
import { replaceDotWithUnderscore, shortenKeyNames } from '@/lib/utils';

// Thunk to handle Campaign
export const getCampaignDataMeta = createAsyncThunk('metaAds/getCampaignDataMeta', async (_, { rejectWithValue }) => {
    try {
        const api = cubeJsApi();
        const res = await api
            .load({
                "measures": [
                    "meta_campaign_stream.count",
                    "meta_campaign_stream.purchase_value_sum",
                    "meta_campaign_stream.ad_spend_sum",
                    "meta_campaign_stream.purchase_sum",
                    "meta_campaign_stream.impressions_sum",
                    "meta_campaign_stream.link_clicks_sum",
                    "meta_campaign_stream.landing_page_views_sum",
                    "meta_campaign_stream.add_to_carts_sum",
                    "meta_campaign_stream.checkount_initiated_sum",
                    "meta_campaign_stream.ctr",
                    "meta_campaign_stream.cpc",
                    "meta_campaign_stream.cpm",
                    "meta_campaign_stream.roas",
                    "meta_campaign_stream.aov",
                    "meta_campaign_stream.cpa"
                ],
                "dimensions": [
                    "meta_campaign_stream.campaign_id",
                    "meta_campaign.name",
                    "meta_campaign.bidding_strategy",
                    "meta_campaign.daily_budget",
                    "meta_campaign.lifetime_budget",
                    "meta_campaign.status",
                    "meta_campaign.effective_status",
                    "meta_campaign.link",
                    "meta_campaign.objective"
                ],
                "order": {
                    "meta_campaign_stream.count": "desc"
                },
                "timeDimensions": [
                    {
                        "dimension": "meta_campaign_stream.date",
                        "granularity": "day"
                    }
                ]
            })
        return shortenKeyNames(res?.loadResponse)
    } catch (error) {
        return rejectWithValue(error.response.error);
    }
});


// Thunk to handle Ad sets
export const getAdSetsMeta = createAsyncThunk('metaAds/getAdSetsMeta', async (_, { rejectWithValue }) => {
    try {
        const api = cubeJsApi();
        const res = await api
            .load({
                "measures": [
                    "meta_ad_sets_stream.count",
                    "meta_ad_sets_stream.purchase_value_sum",
                    "meta_ad_sets_stream.ad_spend_sum",
                    "meta_ad_sets_stream.purchase_sum",
                    "meta_ad_sets_stream.impressions_sum",
                    "meta_ad_sets_stream.link_clicks_sum",
                    "meta_ad_sets_stream.landing_page_views_sum",
                    "meta_ad_sets_stream.add_to_carts_sum",
                    "meta_ad_sets_stream.checkount_initiated_sum",
                    "meta_ad_sets_stream.ctr",
                    "meta_ad_sets_stream.cpc",
                    "meta_ad_sets_stream.cpm",
                    "meta_ad_sets_stream.roas",
                    "meta_ad_sets_stream.aov",
                    "meta_ad_sets_stream.cpa"
                ],
                "dimensions": [
                    "meta_ad_sets_stream.ad_set_id",
                    "meta_ad_sets.name",
                    "meta_ad_sets.bidding_strategy",
                    "meta_ad_sets.daily_budget",
                    "meta_ad_sets.lifetime_budget",
                    "meta_ad_sets.status",
                    "meta_ad_sets.effective_status",
                    "meta_ad_sets.link",
                    "meta_ad_sets.objective"
                ],
                "order": {
                    "meta_ad_sets_stream.count": "desc"
                },
                "timeDimensions": [
                    {
                        "dimension": "meta_ad_sets_stream.date",
                        "granularity": "day"
                    }
                ]
            })
        return shortenKeyNames(res?.loadResponse)
    } catch (error) {
        return rejectWithValue(error.response.error);
    }
});


// Thunk to handle Ads 
export const getAdsMeta = createAsyncThunk('metaAds/getAdsMeta', async (_, { rejectWithValue }) => {
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
        return shortenKeyNames(res?.loadResponse)
    } catch (error) {
        return rejectWithValue(error.response.error);
    }
});


// Thunk to handle Bidding strategy
export const getBiddingStrategyMeta = createAsyncThunk('metaAds/getBiddingStrategyMeta', async (_, { rejectWithValue }) => {
    try {
        const api = cubeJsApi();
        const res = await api
            .load({
                "measures": [
                    "meta_bidding_strategy.count",
                    "meta_bidding_strategy.purchase_value_sum",
                    "meta_bidding_strategy.ad_spend_sum",
                    "meta_bidding_strategy.purchase_sum",
                    "meta_bidding_strategy.impressions_sum",
                    "meta_bidding_strategy.clicks_sum",
                    "meta_bidding_strategy.ctr",
                    "meta_bidding_strategy.cpc",
                    "meta_bidding_strategy.cpm",
                    "meta_bidding_strategy.roas",
                    "meta_bidding_strategy.aov",
                    "meta_bidding_strategy.cpa"
                ],
                "timeDimensions": [
                    {
                        "dimension": "meta_bidding_strategy.date",
                        "granularity": "week"
                    }
                ],
                "order": {
                    "meta_bidding_strategy.count": "desc"
                },
                "dimensions": [
                    "meta_bidding_strategy.bidding_strategy"
                ]
            })
        return replaceDotWithUnderscore(res?.loadResponse)
    } catch (error) {
        return rejectWithValue(error.response.error);
    }
});


// Thunk to handle Ads Placement
export const getAdsPlacementMeta = createAsyncThunk('metaAds/getAdsPlacementMeta', async (_, { rejectWithValue }) => {
    try {
        const api = cubeJsApi();
        const res = await api
            .load({
                "measures": [
                    "meta_ad_placement_stream.count",
                    "meta_ad_placement_stream.purchase_value_sum",
                    "meta_ad_placement_stream.ad_spend_sum",
                    "meta_ad_placement_stream.purchase_sum",
                    "meta_ad_placement_stream.impressions_sum",
                    "meta_ad_placement_stream.link_clicks_sum",
                    "meta_ad_placement_stream.landing_page_views_sum",
                    "meta_ad_placement_stream.add_to_carts_sum",
                    "meta_ad_placement_stream.checkount_initiated_sum",
                    "meta_ad_placement_stream.ctr",
                    "meta_ad_placement_stream.cpc",
                    "meta_ad_placement_stream.cpm",
                    "meta_ad_placement_stream.roas",
                    "meta_ad_placement_stream.aov",
                    "meta_ad_placement_stream.cpa"
                ],
                "timeDimensions": [
                    {
                        "dimension": "meta_ad_placement_stream.date"
                    }
                ],
                "order": {
                    "meta_ad_placement_stream.count": "desc"
                },
                "dimensions": [
                    "meta_ad_placement_stream.platform_position",
                    "meta_ad_placement_stream.publisher_platform"
                ]
            })
        return replaceDotWithUnderscore(res?.loadResponse)
    } catch (error) {
        return rejectWithValue(error.response.error);
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
        biddingStrategyMetaData: {},
        biddingStrategyMetaLoading: true,
        biddingStrategyMetaError: null,
        adsPlacementMetaData: {},
        adsPlacementMetaLoading: true,
        adsPlacementMetaError: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCampaignDataMeta.pending, (state) => {
                state.campaignData.loading = true;
                state.campaignData.error = null;
            })
            .addCase(getCampaignDataMeta.fulfilled, (state, action) => {
                state.campaignData.loading = false;
                state.campaignData.error = null;
                state.campaignData.data = action.payload;
            })
            .addCase(getCampaignDataMeta.rejected, (state, action) => {
                state.campaignData.loading = false;
                state.campaignData.error = action.payload;
            })
            //getAdSetsMeta
            .addCase(getAdSetsMeta.pending, (state) => {
                state.adSetsData.loading = true;
                state.adSetsData.error = null;
            })
            .addCase(getAdSetsMeta.fulfilled, (state, action) => {
                state.adSetsData.loading = false;
                state.adSetsData.error = null;
                state.adSetsData.data = action.payload;
            })
            .addCase(getAdSetsMeta.rejected, (state, action) => {
                state.adSetsData.loading = false;
                state.adSetsData.error = action.payload;
            })
            //getAdsMeta
            .addCase(getAdsMeta.pending, (state) => {
                state.adsData.loading = true;
                state.adsData.error = null;
            })
            .addCase(getAdsMeta.fulfilled, (state, action) => {
                state.adsData.loading = false;
                state.adsData.error = null;
                state.adsData.data = action.payload;
            })
            .addCase(getAdsMeta.rejected, (state, action) => {
                state.adsData.loading = false;
                state.adsData.error = action.payload;
            })
            //getBiddingStrategyMeta
            .addCase(getBiddingStrategyMeta.pending, (state) => {
                state.biddingStrategyMetaLoading = true;
                state.biddingStrategyMetaError = null;
            })
            .addCase(getBiddingStrategyMeta.fulfilled, (state, action) => {
                state.biddingStrategyMetaLoading = false;
                state.biddingStrategyMetaError = null;
                state.biddingStrategyMetaData = action.payload;
            })
            .addCase(getBiddingStrategyMeta.rejected, (state, action) => {
                state.biddingStrategyMetaLoading = false;
                state.biddingStrategyMetaError = action.payload;
            })
            //getAdsPlacementMeta
            .addCase(getAdsPlacementMeta.pending, (state) => {
                state.adsPlacementMetaLoading = true;
                state.adsPlacementMetaError = null;
            })
            .addCase(getAdsPlacementMeta.fulfilled, (state, action) => {
                state.adsPlacementMetaLoading = false;
                state.adsPlacementMetaError = null;
                state.adsPlacementMetaData = action.payload;
            })
            .addCase(getAdsPlacementMeta.rejected, (state, action) => {
                state.adsPlacementMetaLoading = false;
                state.adsPlacementMetaError = action.payload;
            })
    },
});

export const { } = metaAdsSlice.actions;
export default metaAdsSlice.reducer;
