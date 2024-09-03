// lib/metaAdsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cubeJsApi from "@/lib/cubeJsApi";
import { replaceDotWithUnderscore, shortenKeyNames } from "@/lib/utils";
import { parseRawLoadResponse } from "@/lib/utils/cubejs.utils";

// Thunk to handle Campaign
export const getCampaignDataMeta = createAsyncThunk("metaAds/getCampaignDataMeta", async (_, { rejectWithValue }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
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
      dimensions: [
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
      order: {
        "meta_campaign_stream.count": "desc"
      },
      timeDimensions: [
        {
          dimension: "meta_campaign_stream.date",
          dateRange: ["2024-08-01", "2024-08-30"]
        }
      ]
    });
    return shortenKeyNames(res?.loadResponse);
  } catch (error) {
    return rejectWithValue(error.response.error);
  }
});

// Thunk to handle Ad sets
export const getAdSetsMeta = createAsyncThunk("metaAds/getAdSetsMeta", async (ids, { rejectWithValue }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
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
      dimensions: [
        "meta_ad_sets.campaign_id",
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
      order: {
        "meta_ad_sets_stream.count": "desc"
      },
      timeDimensions: [
        {
          dimension: "meta_ad_sets_stream.date",
          dateRange: ["2024-08-01", "2024-08-30"]
        }
      ],
      filters: [
        {
          member: "meta_ad_sets.campaign_id",
          operator: "contains",
          values: ids
        }
      ]
    });
    return { data: shortenKeyNames(res?.loadResponse), ids };
  } catch (error) {
    return { data: rejectWithValue(error.response.error), ids };
  }
});

// Thunk to handle Ads
export const getAdsMeta = createAsyncThunk("metaAds/getAdsMeta", async (ids, { rejectWithValue }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
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
      order: {
        "meta_ad_stream.count": "desc"
      },
      dimensions: [
        "meta_ads.ad_set_id",
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
      timeDimensions: [
        {
          dimension: "meta_ad_stream.date",
          dateRange: ["2024-08-01", "2024-08-30"]
        }
      ],
      filters: [
        {
          member: "meta_ads.ad_set_id",
          operator: "contains",
          values: ids
        }
      ]
    });
    return { data: shortenKeyNames(res?.loadResponse), ids };
  } catch (error) {
    return { data: rejectWithValue(error.response.error), ids };
  }
});

// Thunk to handle Bidding strategy
export const getBiddingStrategyMeta = createAsyncThunk("metaAds/getBiddingStrategyMeta", async (_, { rejectWithValue }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
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
      timeDimensions: [
        {
          dimension: "meta_bidding_strategy.date",
          dateRange: ["2024-08-01", "2024-08-30"]
        }
      ],
      order: {
        "meta_bidding_strategy.count": "desc"
      },
      dimensions: ["meta_bidding_strategy.bidding_strategy"]
    });
    return shortenKeyNames(res?.loadResponse);
  } catch (error) {
    return rejectWithValue(error.response.error);
  }
});

// Thunk to handle Ads Placement
export const getAdsPlacementMeta = createAsyncThunk("metaAds/getAdsPlacementMeta", async (_, { rejectWithValue }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
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
      timeDimensions: [
        {
          dimension: "meta_ad_placement_stream.date",
          dateRange: ["2024-08-01", "2024-08-30"]
        }
      ],
      order: {
        "meta_ad_placement_stream.count": "desc"
      },
      dimensions: ["meta_ad_placement_stream.platform_position", "meta_ad_placement_stream.publisher_platform"]
    });
    return replaceDotWithUnderscore(res?.loadResponse);
  } catch (error) {
    return rejectWithValue(error.response.error);
  }
});

const metaAdsSlice = createSlice({
  name: "metaAds",
  initialState: {
    loading: false,
    error: null,
    // Campaign
    campaignLoading: true,
    campaignError: null,
    campaignData: {},
    selectedCampaignIds: [],
    // Ad Sets
    adSetsLoading: true,
    adSetsError: null,
    adSetsData: {},
    selectedAdSetsIds: [],
    // Ads
    adsLoading: true,
    adsError: null,
    adsData: {},
    biddingStrategyMetaData: {},
    biddingStrategyMetaLoading: true,
    biddingStrategyMetaError: null,
    adsPlacementMetaData: {},
    adsPlacementMetaLoading: true,
    adsPlacementMetaError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getCampaignDataMeta
      .addCase(getCampaignDataMeta.pending, (state) => {
        state.campaignLoading = true;
        state.campaignError = null;
      })
      .addCase(getCampaignDataMeta.fulfilled, (state, action) => {
        state.campaignLoading = false;
        state.campaignError = null;
        state.campaignData = {
          raw: action.payload,
          parsed: parseRawLoadResponse(action.payload)
        };
      })
      .addCase(getCampaignDataMeta.rejected, (state, action) => {
        state.campaignLoading = false;
        state.campaignError = action.payload;
      })
      // getAdSetsMeta
      .addCase(getAdSetsMeta.pending, (state) => {
        state.adSetsLoading = true;
        state.adSetsError = null;
      })
      .addCase(getAdSetsMeta.fulfilled, (state, action) => {
        state.adSetsLoading = false;
        state.adSetsError = null;
        state.adSetsData = {
          raw: action.payload,
          parsed: parseRawLoadResponse(action.payload.data)
        };
        state.selectedCampaignIds = action.payload?.ids;
      })
      .addCase(getAdSetsMeta.rejected, (state, action) => {
        state.adSetsLoading = false;
        state.adSetsError = action.payload?.data;
      })
      // getAdsMeta
      .addCase(getAdsMeta.pending, (state) => {
        state.adsLoading = true;
        state.adsError = null;
      })
      .addCase(getAdsMeta.fulfilled, (state, action) => {
        state.adsLoading = false;
        state.adsError = null;
        state.adsData = {
          raw: action.payload,
          parsed: parseRawLoadResponse(action.payload.data)
        };
        state.selectedAdSetsIds = action.payload?.ids;
      })
      .addCase(getAdsMeta.rejected, (state, action) => {
        state.adsLoading = false;
        state.adsError = action.payload?.data;
      })
      // getBiddingStrategyMeta
      .addCase(getBiddingStrategyMeta.pending, (state) => {
        state.biddingStrategyMetaLoading = true;
        state.biddingStrategyMetaError = null;
      })
      .addCase(getBiddingStrategyMeta.fulfilled, (state, action) => {
        state.biddingStrategyMetaLoading = false;
        state.biddingStrategyMetaError = null;
        state.biddingStrategyMetaData = {
          raw: action.payload,
          parsed: parseRawLoadResponse(action.payload)
        };
      })
      .addCase(getBiddingStrategyMeta.rejected, (state, action) => {
        state.biddingStrategyMetaLoading = false;
        state.biddingStrategyMetaError = action.payload;
      })
      // getAdsPlacementMeta
      .addCase(getAdsPlacementMeta.pending, (state) => {
        state.adsPlacementMetaLoading = true;
        state.adsPlacementMetaError = null;
      })
      .addCase(getAdsPlacementMeta.fulfilled, (state, action) => {
        state.adsPlacementMetaLoading = false;
        state.adsPlacementMetaError = null;
        state.adsPlacementMetaData = {
          raw: action.payload,
          parsed: parseRawLoadResponse(action.payload)
        };
      })
      .addCase(getAdsPlacementMeta.rejected, (state, action) => {
        state.adsPlacementMetaLoading = false;
        state.adsPlacementMetaError = action.payload;
      });
  }
});

export const {} = metaAdsSlice.actions;
export default metaAdsSlice.reducer;
