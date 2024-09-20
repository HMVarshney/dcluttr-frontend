import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { replaceDotWithUnderscore } from "@/lib/utils";
import cubeJsApi from "@/lib/cubeJsApi";

// Thunk to fetch creative details
export const fetchCreativeDetails = createAsyncThunk("creative/fetchCreativeDetails", async (_, { dispatch }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load({
      measures: [
        "meta_ad_stream.landing_page_views_sum",
        "meta_ad_stream.add_to_carts_sum",
        "meta_ad_stream.count",
        // "meta_ad_stream.status",
        "meta_ad_stream.purchase_value_sum",
        "meta_ad_stream.ad_spend_sum",
        "meta_ad_stream.purchase_sum",
        "meta_ad_stream.impressions_sum",
        "meta_ad_stream.clicks_sum",
        "meta_ad_stream.link_clicks_sum",
        "meta_ad_stream.landing_page_views_sum",
        "meta_ad_stream.checkount_initiated_sum",
        "meta_ad_stream.ctr",
        "meta_ad_stream.cpc",
        "meta_ad_stream.cpm",
        "meta_ad_stream.roas",
        "meta_ad_stream.aov",
        "meta_ad_stream.cpa"
      ],
      order: {
        "meta_ad_stream.purchase_value_sum": "desc"
      },
      dimensions: ["meta_campaign.name", "meta_ads.name", "meta_ad_sets.name"],
      timeDimensions: [
        {
          dimension: "meta_ad_stream.date",
          granularity: "day"
        }
      ]
    });
    // return shortenKeyNames(res?.loadResponse)
    const xyData = res.rawData().map((entry) => {
      return {
        x: entry["meta_ad_stream.date"], // Replace "dimension_name" with your actual dimension
        y: entry["meta_ad_stream.ad_spend_sum"] // Replace "measure_name" with your actual measure
      };
    });
    return replaceDotWithUnderscore(res?.loadResponse);
  } catch (error) {
    return rejectWithValue(error.response.error);
  }
});

const creativeSlice = createSlice({
  name: "creative",
  initialState: {
    isLoading: true,
    creativeDetails: {},
    status: "idle",
    error: null,
    isTableView: true,
    insightsPopUp: {
      isOpen: false,
      data: {}
    }
  },
  reducers: {
    updateTableView: (state, action) => {
      state.isTableView = action.payload;
    },
    updateInsightsPopUp: (state, action) => {
      state.insightsPopUp = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreativeDetails.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchCreativeDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.creativeDetails = action.payload;
      })
      .addCase(fetchCreativeDetails.rejected, (state, action) => {
        state.status = "failed";
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { updateTableView, updateInsightsPopUp } = creativeSlice.actions;

export default creativeSlice.reducer;
