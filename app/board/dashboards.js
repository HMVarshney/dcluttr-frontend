export const dashboardJSON = {
  sections: [
    {
      id: "17|GOOGLE",
      name: "Google Dashboard",
      brandId: "17",
      logo: "http://example.com/logo.png",
      description: "A dashboard displaying various sales metrics.",
      default: false,
      cards: [
        {
          visualizationType: "table",
          title: "Campaign-wise distribution",
          id: "101",
          logo: "http://example.com/logo.png",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 0,
            w: 12,
            h: 4,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '{"measures":["google_campaign_stream.purchase_value_sum","google_campaign_stream.ad_spend_sum","google_campaign_stream.purchase_sum","google_campaign_stream.impressions_sum","google_campaign_stream.clicks_sum","google_campaign_stream.vtc_sum","google_campaign_stream.ctr","google_campaign_stream.cpc","google_campaign_stream.cpm","google_campaign_stream.roas","google_campaign_stream.aov","google_campaign_stream.cpa"],"dimensions":["google_campaign.id","google_campaign.name","google_campaign.resource_name","google_campaign.campaign_link"],"order":{"google_campaign_stream.purchase_value_sum":"desc"},"timeDimensions":[{"dimension":"google_campaign_stream.date","granularity":"week"}]}',
          columnOrder: ["region", "sales"],
          selectedMetric: ["sales"],
          active: true
        },
        {
          visualizationType: "table",
          title: "Bidding Strategy",
          id: "102",
          logo: "http://example.com/logo.png",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 5,
            w: 12,
            h: 3,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '{"measures":["google_bidding_strategy.count","google_bidding_strategy.purchase_value_sum","google_bidding_strategy.ad_spend_sum","google_bidding_strategy.purchase_sum","google_bidding_strategy.impressions_sum","google_bidding_strategy.clicks_sum","google_bidding_strategy.vtc_sum","google_bidding_strategy.ctr","google_bidding_strategy.cpc","google_bidding_strategy.cpm","google_bidding_strategy.roas","google_bidding_strategy.aov","google_bidding_strategy.cpa"],"timeDimensions":[{"dimension":"google_bidding_strategy.date","granularity":"week"}],"order":{"google_bidding_strategy.count":"desc"},"dimensions":["google_bidding_strategy.bidding_strategy"]}',
          columnOrder: ["date", "sales"],
          selectedMetric: ["sales"],
          active: true
        },
        {
          visualizationType: "table",
          title: "Campaign Type",
          id: "102",
          logo: "http://example.com/logo.png",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 9,
            w: 12,
            h: 2,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '{"measures":["google_campaign_type.count","google_campaign_type.purchase_value_sum","google_campaign_type.ad_spend_sum","google_campaign_type.purchase_sum","google_campaign_type.impressions_sum","google_campaign_type.clicks_sum","google_campaign_type.vtc_sum","google_campaign_type.ctr","google_campaign_type.cpc","google_campaign_type.cpm","google_campaign_type.roas","google_campaign_type.aov","google_campaign_type.cpa"],"dimensions":["google_campaign_type.campaign_type"],"timeDimensions":[],"order":{"google_campaign_type.count":"desc"}}',
          columnOrder: ["date", "sales"],
          selectedMetric: ["sales"],
          active: true
        },
        {
          visualizationType: "piechart",
          title: "Campaign Type",
          id: "102",
          logo: "http://example.com/logo.png",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 12,
            w: 4,
            h: 2,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '{"measures":["google_campaign_type.count","google_campaign_type.purchase_value_sum","google_campaign_type.ad_spend_sum","google_campaign_type.purchase_sum","google_campaign_type.impressions_sum","google_campaign_type.clicks_sum","google_campaign_type.vtc_sum","google_campaign_type.ctr","google_campaign_type.cpc","google_campaign_type.cpm","google_campaign_type.roas","google_campaign_type.aov","google_campaign_type.cpa"],"dimensions":["google_campaign_type.name"],"timeDimensions":[],"order":{"google_campaign_type.count":"desc"}}',
          columnOrder: ["date", "sales"],
          selectedMetric: ["sales"],
          active: true
        }
      ]
    }
  ]
};

// export const dashboardJSON = {
//   sections: [
//     {
//       id: "",
//       name: "Section 1",
//       icon: "icon_link",
//       description: "",
//       isDefault: false,
//       dashboardCards: [
//         {
//           visualization: "type1",
//           title: "Campaign-wise distribution",
//           description: "Find all the analytics for store",
//           coords: {
//             h: 2,
//             w: 3,
//             x: 0,
//             y: 0
//           },
//           query: {
//             measures: [
//               "google_campaign_stream.purchase_value_sum",
//               "google_campaign_stream.ad_spend_sum",
//               "google_campaign_stream.purchase_sum",
//               "google_campaign_stream.impressions_sum",
//               "google_campaign_stream.clicks_sum",
//               "google_campaign_stream.vtc_sum",
//               "google_campaign_stream.ctr",
//               "google_campaign_stream.cpc",
//               "google_campaign_stream.cpm",
//               "google_campaign_stream.cpm",
//               "google_campaign_stream.roas",
//               "google_campaign_stream.aov",
//               "google_campaign_stream.cpa"
//             ],
//             dimensions: [
//               "google_campaign.id",
//               "google_campaign.name",
//               "google_campaign.resource_name",
//               "google_campaign.campaign_link"
//             ],
//             order: {
//               "${order_by_key}": "${order_by_value}"
//             },
//             timeDimensions: [
//               {
//                 dimension: "google_campaign_stream.date",
//                 granularity: "week"
//               }
//             ]
//           },
//           columnOrder: ["meta_ad_stream.ad_spend_sum", "meta_ad_stream.purchase_sum", "meta_ad_stream.campaign_id"],
//           isActive: true
//         },
//         {
//           visualization: "type1",
//           title: "Campaign-wise distribution",
//           description: "Find all the analytics for store",
//           coords: {
//             h: 2,
//             w: 3,
//             x: 3,
//             y: 0
//           },
//           query: {
//             measures: [
//               "google_campaign_stream.purchase_value_sum",
//               "google_campaign_stream.ad_spend_sum",
//               "google_campaign_stream.purchase_sum",
//               "google_campaign_stream.impressions_sum",
//               "google_campaign_stream.clicks_sum",
//               "google_campaign_stream.vtc_sum",
//               "google_campaign_stream.ctr",
//               "google_campaign_stream.cpc",
//               "google_campaign_stream.cpm",
//               "google_campaign_stream.cpm",
//               "google_campaign_stream.roas",
//               "google_campaign_stream.aov",
//               "google_campaign_stream.cpa"
//             ],
//             dimensions: [
//               "google_campaign.id",
//               "google_campaign.name",
//               "google_campaign.resource_name",
//               "google_campaign.campaign_link"
//             ],
//             order: {
//               "${order_by_key}": "${order_by_value}"
//             },
//             timeDimensions: [
//               {
//                 dimension: "google_campaign_stream.date",
//                 granularity: "week"
//               }
//             ]
//           },
//           columnOrder: ["meta_ad_stream.ad_spend_sum", "meta_ad_stream.purchase_sum", "meta_ad_stream.campaign_id"],
//           isActive: true
//         },
//         {
//           visualization: "type2",
//           title: "Campaign-wise distribution",
//           description: "Find all the analytics for store",
//           coords: {
//             h: 2,
//             w: 3,
//             x: 0,
//             y: 2
//           },
//           query: {
//             measures: [
//               "google_campaign_stream.purchase_value_sum",
//               "google_campaign_stream.ad_spend_sum",
//               "google_campaign_stream.purchase_sum",
//               "google_campaign_stream.impressions_sum",
//               "google_campaign_stream.clicks_sum",
//               "google_campaign_stream.vtc_sum",
//               "google_campaign_stream.ctr",
//               "google_campaign_stream.cpc",
//               "google_campaign_stream.cpm",
//               "google_campaign_stream.cpm",
//               "google_campaign_stream.roas",
//               "google_campaign_stream.aov",
//               "google_campaign_stream.cpa"
//             ],
//             dimensions: [
//               "google_campaign.id",
//               "google_campaign.name",
//               "google_campaign.resource_name",
//               "google_campaign.campaign_link"
//             ],
//             order: {
//               "${order_by_key}": "${order_by_value}"
//             },
//             timeDimensions: [
//               {
//                 dimension: "google_campaign_stream.date",
//                 granularity: "week"
//               }
//             ]
//           },
//           columnOrder: ["meta_ad_stream.ad_spend_sum", "meta_ad_stream.purchase_sum", "meta_ad_stream.campaign_id"],
//           isActive: true
//         },
//         {
//           visualization: "type3",
//           title: "Campaign-wise distribution",
//           description: "Find all the analytics for store",
//           coords: {
//             h: 2,
//             w: 3,
//             x: 0,
//             y: 2
//           },
//           query: {
//             measures: [
//               "google_campaign_stream.purchase_value_sum",
//               "google_campaign_stream.ad_spend_sum",
//               "google_campaign_stream.purchase_sum",
//               "google_campaign_stream.impressions_sum",
//               "google_campaign_stream.clicks_sum",
//               "google_campaign_stream.vtc_sum",
//               "google_campaign_stream.ctr",
//               "google_campaign_stream.cpc",
//               "google_campaign_stream.cpm",
//               "google_campaign_stream.cpm",
//               "google_campaign_stream.roas",
//               "google_campaign_stream.aov",
//               "google_campaign_stream.cpa"
//             ],
//             dimensions: [
//               "google_campaign.id",
//               "google_campaign.name",
//               "google_campaign.resource_name",
//               "google_campaign.campaign_link"
//             ],
//             order: {
//               "${order_by_key}": "${order_by_value}"
//             },
//             timeDimensions: [
//               {
//                 dimension: "google_campaign_stream.date",
//                 granularity: "week"
//               }
//             ]
//           },
//           columnOrder: ["meta_ad_stream.ad_spend_sum", "meta_ad_stream.purchase_sum", "meta_ad_stream.campaign_id"],
//           isActive: true
//         },
//         {
//           visualization: "table",
//           title: "Title",
//           description: "Description",
//           coords: {
//             h: 4,
//             w: 12,
//             x: 0,
//             y: 4
//           },
//           query: {
//             measures: [
//               "google_campaign_stream.purchase_value_sum",
//               "google_campaign_stream.ad_spend_sum",
//               "google_campaign_stream.purchase_sum",
//               "google_campaign_stream.impressions_sum",
//               "google_campaign_stream.clicks_sum",
//               "google_campaign_stream.vtc_sum",
//               "google_campaign_stream.ctr",
//               "google_campaign_stream.cpc",
//               "google_campaign_stream.cpm",
//               "google_campaign_stream.cpm",
//               "google_campaign_stream.roas",
//               "google_campaign_stream.aov",
//               "google_campaign_stream.cpa"
//             ],
//             dimensions: [
//               "google_campaign.id",
//               "google_campaign.name",
//               "google_campaign.resource_name",
//               "google_campaign.campaign_link"
//             ],
//             order: {
//               "${order_by_key}": "${order_by_value}"
//             },
//             timeDimensions: [
//               {
//                 dimension: "google_campaign_stream.date",
//                 granularity: "week"
//               }
//             ]
//           },
//           columnOrder: ["meta_ad_stream.ad_spend_sum", "meta_ad_stream.purchase_sum", "meta_ad_stream.campaign_id"],
//           isActive: false
//         }
//       ]
//     }
//   ]
// };
