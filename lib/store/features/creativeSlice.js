import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { shortenKeyNames } from "@/lib/utils";
import cubeJsApi from "@/lib/cubeJsApi";

// Thunk to fetch creative details
export const fetchCreativeDetails = createAsyncThunk("creative/fetchCreativeDetails", async (_, { dispatch }) => {
  try {
    const api = cubeJsApi();
    const res = await api.load(
      {
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
            dimension: "google_campaign_stream.date",
            granularity: "week"
          }
        ]
      }
      // {
      //   measures: [
      //     "meta_ad_creative_type_stream.landing_page_views_sum",
      //     "meta_ad_creative_type_stream.add_to_carts_sum",
      //     "meta_ad_creative_type_stream.count",
      //     "meta_ad_creative_type_stream.purchase_value_sum",
      //     "meta_ad_creative_type_stream.ad_spend_sum",
      //     "meta_ad_creative_type_stream.purchase_sum",
      //     "meta_ad_creative_type_stream.impressions_sum",
      //     "meta_ad_creative_type_stream.clicks_sum",
      //     "meta_ad_creative_type_stream.link_clicks_sum",
      //     "meta_ad_creative_type_stream.landing_page_views_sum",
      //     "meta_ad_creative_type_stream.checkount_initiated_sum",
      //     "meta_ad_creative_type_stream.ctr",
      //     "meta_ad_creative_type_stream.cpc",
      //     "meta_ad_creative_type_stream.cpm",
      //     "meta_ad_creative_type_stream.roas",
      //     "meta_ad_creative_type_stream.aov",
      //     "meta_ad_creative_type_stream.cpa"
      //   ],
      //   order: {
      //     "meta_ad_creative_type_stream.date": "asc"
      //   },
      // timeDimensions: [
      //   {
      //     dimension: "google_campaign_stream.date",
      //     granularity: "week"
      //   }
      // ]
      // }
    );
    // return shortenKeyNames(res?.loadResponse)
    const xyData = res.rawData().map((entry) => {
      return {
        x: entry["meta_ad_stream.date"], // Replace "dimension_name" with your actual dimension
        y: entry["meta_ad_stream.ad_spend_sum"] // Replace "measure_name" with your actual measure
      };
    });
    return shortenKeyNames(res?.loadResponse);
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
    isTableView: true
  },
  reducers: {
    updateTableView: (state, action) => {
      state.isTableView = action.payload;
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

export const { updateTableView } = creativeSlice.actions;

export default creativeSlice.reducer;
