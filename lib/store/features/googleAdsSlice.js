// lib/googleAdsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cubeJsApi from "@/lib/cubeJsApi";
import { replaceDotWithUnderscore, shortenKeyNames } from "@/lib/utils";
import { parseRawLoadResponse } from "@/lib/utils/cubejs.utils";

// Thunk to handle Campaign
export const getCampaignDataGoogle = createAsyncThunk("googleAds/getCampaignDataGoogle", async (_, { rejectWithValue }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
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
      dimensions: [
        "google_campaign.id",
        "google_campaign.name",
        "google_campaign.resource_name",
        "google_campaign.campaign_link"
      ],
      order: {
        "google_campaign_stream.purchase_value_sum": "desc"
      },
      timeDimensions: [
        {
          dimension: "google_campaign_stream.date"
        }
      ]
    });
    return shortenKeyNames(res?.loadResponse);
  } catch (error) {
    return rejectWithValue(error.response.error);
  }
});

// Thunk to handle Ad sets
export const getAdSetsGoogle = createAsyncThunk("googleAds/getAdSetsGoogle", async (ids, { rejectWithValue }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
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
      dimensions: [
        "google_ad_group.name",
        "google_ad_group_stream.ad_group_id",
        "google_ad_group_stream.resource_name",
        "google_ad_group.campaign_resource_name"
      ],
      order: {
        "google_ad_group_stream.purchase_value_sum": "desc"
      },
      timeDimensions: [
        {
          dimension: "google_ad_group_stream.date"
        }
      ],
      filters: [
        {
          member: "google_ad_group.campaign_resource_name",
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
export const getAdsGoogle = createAsyncThunk("googleAds/getAdsGoogle", async (ids, { rejectWithValue }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
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
      order: {
        "google_ads_stream.count": "desc"
      },
      dimensions: ["google_ads_stream.id", "google_ads.name", "google_ads_stream.resource_name"],
      timeDimensions: [
        {
          dimension: "google_ads_stream.date"
        }
      ],
      filters: [
        {
          member: "google_ads_stream.resource_name",
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
export const getBiddingStrategyGoogle = createAsyncThunk("googleAds/getBiddingStrategyGoogle", async (_, { rejectWithValue }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
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
      timeDimensions: [
        {
          dimension: "google_bidding_strategy.date"
        }
      ],
      dimensions: ["google_bidding_strategy.bidding_strategy"]
    });
    return replaceDotWithUnderscore(res?.loadResponse);
  } catch (error) {
    return rejectWithValue(error.response.error);
  }
});

// Thunk to handle Ads Type
export const getAdsTypeGoogle = createAsyncThunk("googleAds/getAdsTypeGoogle", async (_, { rejectWithValue }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
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
      dimensions: ["google_campaign_type.campaign_type"],
      timeDimensions: [],
      order: {
        "google_campaign_type.count": "desc"
      }
    });
    return shortenKeyNames(res?.loadResponse);
  } catch (error) {
    return rejectWithValue(error.response.error);
  }
});

const googleAdsSlice = createSlice({
  name: "googleAds",
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
    // Ad type
    adsType: {
      loading: true,
      error: null,
      data: {}
    },
    // Bidding strategy
    biddingStrategyGoogleData: {},
    biddingStrategyGoogleLoading: true,
    biddingStrategyGoogleError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getCampaignDataGoogle
      .addCase(getCampaignDataGoogle.pending, (state) => {
        state.campaignLoading = true;
        state.campaignError = null;
      })
      .addCase(getCampaignDataGoogle.fulfilled, (state, action) => {
        state.campaignLoading = false;
        state.campaignError = null;
        state.campaignData = {
          raw: action.payload,
          parsed: parseRawLoadResponse(action.payload)
        };
      })
      .addCase(getCampaignDataGoogle.rejected, (state, action) => {
        state.campaignLoading = false;
        state.campaignError = action.payload;
      })
      // getAdSetsGoogle
      .addCase(getAdSetsGoogle.pending, (state) => {
        state.adSetsLoading = true;
        state.adSetsError = null;
      })
      .addCase(getAdSetsGoogle.fulfilled, (state, action) => {
        state.adSetsLoading = false;
        state.adSetsError = null;
        state.adSetsData = {
          raw: action.payload,
          parsed: parseRawLoadResponse(action.payload.data)
        };
        state.selectedCampaignIds = action.payload?.ids;
      })
      .addCase(getAdSetsGoogle.rejected, (state, action) => {
        state.adSetsLoading = false;
        state.adSetsError = action.payload?.data;
      })
      // getAdsGoogle
      .addCase(getAdsGoogle.pending, (state) => {
        state.adsLoading = true;
        state.adsError = null;
      })
      .addCase(getAdsGoogle.fulfilled, (state, action) => {
        state.adsLoading = false;
        state.adsError = null;
        state.adsData = {
          raw: action.payload,
          parsed: parseRawLoadResponse(action.payload.data)
        };
        state.selectedAdSetsIds = action.payload?.ids;
      })
      .addCase(getAdsGoogle.rejected, (state, action) => {
        state.adsLoading = false;
        state.adsError = action.payload?.data;
      })
      // getBiddingStrategyGoogle
      .addCase(getBiddingStrategyGoogle.pending, (state) => {
        state.biddingStrategyGoogleLoading = true;
        state.biddingStrategyGoogleError = null;
      })
      .addCase(getBiddingStrategyGoogle.fulfilled, (state, action) => {
        state.biddingStrategyGoogleLoading = false;
        state.biddingStrategyGoogleError = null;
        state.biddingStrategyGoogleData = {
          raw: action.payload,
          parsed: parseRawLoadResponse(action.payload)
        };
      })
      .addCase(getBiddingStrategyGoogle.rejected, (state, action) => {
        state.biddingStrategyGoogleLoading = false;
        state.biddingStrategyGoogleError = action.payload;
      })
      // getAdsTypeGoogle
      .addCase(getAdsTypeGoogle.pending, (state) => {
        state.adsType.loading = true;
        state.adsType.error = null;
      })
      .addCase(getAdsTypeGoogle.fulfilled, (state, action) => {
        state.adsType.loading = false;
        state.adsType.error = null;
        state.adsType.data = {
          raw: action.payload,
          parsed: parseRawLoadResponse(action.payload)
        };
      })
      .addCase(getAdsTypeGoogle.rejected, (state, action) => {
        state.adsType.loading = false;
        state.adsType.error = action.payload;
      });
  }
});

export const {} = googleAdsSlice.actions;
export default googleAdsSlice.reducer;
