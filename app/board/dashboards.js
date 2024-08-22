export const dashboardJSON = {
  sections: [
    {
      id: "",
      name: "Section 1",
      icon: "icon_link",
      description: "",
      isDefault: false,
      dashboardCards: [
        {
          visualization: "type1",
          title: "Campaign-wise distribution",
          description: "Find all the analytics for store",
          coords: {
            h: 2,
            w: 3,
            x: 0,
            y: 0
          },
          query: {
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
              "${order_by_key}": "${order_by_value}"
            },
            timeDimensions: [
              {
                dimension: "google_campaign_stream.date",
                granularity: "week"
              }
            ]
          },
          columnOrder: ["meta_ad_stream.ad_spend_sum", "meta_ad_stream.purchase_sum", "meta_ad_stream.campaign_id"],
          isActive: true
        },
        {
          visualization: "type1",
          title: "Campaign-wise distribution",
          description: "Find all the analytics for store",
          coords: {
            h: 2,
            w: 3,
            x: 3,
            y: 0
          },
          query: {
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
              "${order_by_key}": "${order_by_value}"
            },
            timeDimensions: [
              {
                dimension: "google_campaign_stream.date",
                granularity: "week"
              }
            ]
          },
          columnOrder: ["meta_ad_stream.ad_spend_sum", "meta_ad_stream.purchase_sum", "meta_ad_stream.campaign_id"],
          isActive: true
        },
        {
          visualization: "type2",
          title: "Campaign-wise distribution",
          description: "Find all the analytics for store",
          coords: {
            h: 2,
            w: 3,
            x: 0,
            y: 2
          },
          query: {
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
              "${order_by_key}": "${order_by_value}"
            },
            timeDimensions: [
              {
                dimension: "google_campaign_stream.date",
                granularity: "week"
              }
            ]
          },
          columnOrder: ["meta_ad_stream.ad_spend_sum", "meta_ad_stream.purchase_sum", "meta_ad_stream.campaign_id"],
          isActive: true
        },
        {
          visualization: "type3",
          title: "Campaign-wise distribution",
          description: "Find all the analytics for store",
          coords: {
            h: 2,
            w: 3,
            x: 0,
            y: 2
          },
          query: {
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
              "${order_by_key}": "${order_by_value}"
            },
            timeDimensions: [
              {
                dimension: "google_campaign_stream.date",
                granularity: "week"
              }
            ]
          },
          columnOrder: ["meta_ad_stream.ad_spend_sum", "meta_ad_stream.purchase_sum", "meta_ad_stream.campaign_id"],
          isActive: true
        },
        {
          visualization: "table",
          title: "Title",
          description: "Description",
          coords: {
            h: 4,
            w: 12,
            x: 0,
            y: 4
          },
          query: {
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
              "${order_by_key}": "${order_by_value}"
            },
            timeDimensions: [
              {
                dimension: "google_campaign_stream.date",
                granularity: "week"
              }
            ]
          },
          columnOrder: ["meta_ad_stream.ad_spend_sum", "meta_ad_stream.purchase_sum", "meta_ad_stream.campaign_id"],
          isActive: false
        }
      ]
    }
  ]
};
