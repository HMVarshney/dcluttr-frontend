export const dashboardJSON = {
  sections: [
    {
      id: "17|GOOGLE",
      name: "Google Dashboard",
      brandId: "17",
      logo: "/icons/google.svg",
      description: "A dashboard displaying various sales metrics.",
      default: false,
      cards: [
        {
          visualizationType: "gauge",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 0,
            w: 4,
            h: 1,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '[{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]}]',
          columnOrder: [],
          selectedMetric: [],
          active: true
        },
        {
          visualizationType: "gauge",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 1,
            w: 4,
            h: 1,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '[{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]}]',
          columnOrder: [],
          selectedMetric: [],
          active: true
        },
        {
          visualizationType: "linechart",
          title: "Meta Purchase Value Sum",
          id: "102",
          logo: "/icons/meta.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 4,
            y: 0,
            w: 4,
            h: 2,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '[{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]},{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","granularity":"${time_dimension_granularity}","compareDateRange":"${compare_date_range_query}"}],"order":[["hybrid_performance_stream.created_at","asc"]]}]',
          columnOrder: ["date", "sales"],
          selectedMetric: ["sales"],
          active: true
        },
        {
          visualizationType: "linechart",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/meta.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 8,
            y: 0,
            w: 4,
            h: 2,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '[{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]},{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","granularity":"${time_dimension_granularity}","compareDateRange":"${compare_date_range_query}"}],"order":[["hybrid_performance_stream.created_at","asc"]]}]',
          columnOrder: ["date", "sales"],
          selectedMetric: ["sales"],
          active: true
        },
        {
          visualizationType: "linechart",
          title: "Shopify Total Orders Sum",
          id: "102",
          logo: "/icons/shopify.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 3,
            w: 4,
            h: 2,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '[{"measures":["hybrid_performance_stream.shopify_total_orders_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}],"order":{"hybrid_performance_stream.created_at":"asc"}}, {"measures":["hybrid_performance_stream.shopify_total_orders_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","granularity":"${time_dimension_granularity}","compareDateRange":"${compare_date_range_query}"}],"order":{"hybrid_performance_stream.created_at":"asc"}}]',
          columnOrder: [],
          selectedMetric: [],
          active: true
        },
        {
          visualizationType: "linechart",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 4,
            y: 3,
            w: 4,
            h: 2,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '[{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]},{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","granularity":"${time_dimension_granularity}","compareDateRange":"${compare_date_range_query}"}],"order":[["hybrid_performance_stream.created_at","asc"]]}]',
          columnOrder: ["date", "sales"],
          selectedMetric: ["sales"],
          active: true
        },
        {
          visualizationType: "linechart",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 8,
            y: 3,
            w: 4,
            h: 2,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '[{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]},{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","granularity":"${time_dimension_granularity}","compareDateRange":"${compare_date_range_query}"}],"order":[["hybrid_performance_stream.created_at","asc"]]}]',
          columnOrder: ["date", "sales"],
          selectedMetric: ["sales"],
          active: true
        }
      ]
    },
    {
      id: "17|META",
      name: "Meta Dashboard",
      brandId: "17",
      logo: "/icons/meta.svg",
      description: "A dashboard displaying various sales metrics.",
      default: false,
      cards: [
        {
          visualizationType: "gauge",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 0,
            w: 4,
            h: 1,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '[{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]}]',
          columnOrder: [],
          selectedMetric: [],
          active: false
        },
        {
          visualizationType: "piechart",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 0,
            w: 4,
            h: 1,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '[null,{"measures":["google_campaign_type.clicks_sum"],"timeDimensions":[{"dimension":"google_campaign_type.date","dateRange":["${time_dimension_date_range_from}","${time_dimension_date_range_to}"]}],"dimensions":["google_campaign_type.campaign_type"]}]',
          columnOrder: [],
          selectedMetric: [],
          active: true
        }
      ]
    }
  ]
};

export const dashboardTableJSON = {
  sections: [
    {
      id: "17|Google",
      name: "GOogle Dashboard",
      brandId: "17",
      logo: "/icons/meta.svg",
      description: "A dashboard displaying various sales metrics.",
      default: false,
      cards: [
        {
          visualizationType: "table",
          title: "Campaign Wise Distribution",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 0,
            w: 12,
            h: 3,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '{"measures":["meta_campaign_stream.count","meta_campaign_stream.purchase_value_sum","meta_campaign_stream.ad_spend_sum","meta_campaign_stream.purchase_sum","meta_campaign_stream.impressions_sum","meta_campaign_stream.link_clicks_sum","meta_campaign_stream.landing_page_views_sum","meta_campaign_stream.add_to_carts_sum","meta_campaign_stream.checkount_initiated_sum","meta_campaign_stream.ctr","meta_campaign_stream.cpc","meta_campaign_stream.cpm","meta_campaign_stream.roas","meta_campaign_stream.aov","meta_campaign_stream.cpa"],"dimensions":["meta_campaign_stream.id","meta_campaign.name","meta_campaign.bidding_strategy","meta_campaign.daily_budget","meta_campaign.lifetime_budget","meta_campaign.status","meta_campaign.effective_status","meta_campaign.link","meta_campaign.objective"],"order":{"meta_campaign_stream.count":"desc"},"timeDimensions":[{"dimension":"meta_campaign_stream.date","dateRange":["${time_dimension_date_range_from}","${time_dimension_date_range_to}"]}]}',
          columnOrder: [
            "meta_campaign.status",
            "meta_campaign.name",
            "meta_campaign.bidding_strategy",
            "meta_campaign.daily_budget",
            "meta_campaign.lifetime_budget",
            "meta_campaign.link",
            "meta_campaign.objective",
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
          selectedMetric: [],
          active: true,
          childDataset: [
            {
              position: 1,
              query:
                '{"measures":["meta_ad_sets_stream.count","meta_ad_sets_stream.purchase_value_sum","meta_ad_sets_stream.ad_spend_sum","meta_ad_sets_stream.purchase_sum","meta_ad_sets_stream.impressions_sum","meta_ad_sets_stream.link_clicks_sum","meta_ad_sets_stream.landing_page_views_sum","meta_ad_sets_stream.add_to_carts_sum","meta_ad_sets_stream.checkount_initiated_sum","meta_ad_sets_stream.ctr","meta_ad_sets_stream.cpc","meta_ad_sets_stream.cpm","meta_ad_sets_stream.roas","meta_ad_sets_stream.aov","meta_ad_sets_stream.cpa"],"dimensions":["meta_ad_sets.id", "meta_ad_sets.campaign_id","meta_ad_sets_stream.ad_set_id","meta_ad_sets.name","meta_ad_sets.bidding_strategy","meta_ad_sets.daily_budget","meta_ad_sets.lifetime_budget","meta_ad_sets.status","meta_ad_sets.effective_status","meta_ad_sets.link","meta_ad_sets.objective"],"order":{"meta_ad_sets_stream.count":"desc"},"timeDimensions":[{"dimension":"meta_ad_sets_stream.date","dateRange":["${time_dimension_date_range_from}","${time_dimension_date_range_to}"]}],"filters":[{"member":"meta_ad_sets.campaign_id","operator":"contains","values":"${filter_values}"}]}',
              forColumnId: ""
            },
            {
              position: 2,
              query:
                '{"measures":["meta_ad_stream.count","meta_ad_stream.purchase_value_sum","meta_ad_stream.ad_spend_sum","meta_ad_stream.purchase_sum","meta_ad_stream.impressions_sum","meta_ad_stream.link_clicks_sum","meta_ad_stream.landing_page_views_sum","meta_ad_stream.add_to_carts_sum","meta_ad_stream.checkount_initiated_sum","meta_ad_stream.ctr","meta_ad_stream.cpc","meta_ad_stream.cpm","meta_ad_stream.roas","meta_ad_stream.aov","meta_ad_stream.cpa"],"order":{"meta_ad_stream.count":"desc"},"dimensions":["meta_ads.ad_set_id","meta_ads.id","meta_ads.name","meta_ads.status","meta_ads.effective_status","meta_ads.creative_type","meta_ads.creative_link","meta_ads.link","meta_ads.ad_set_id","meta_ads.campaign_id"],"timeDimensions":[{"dimension":"meta_ad_stream.date","dateRange":["${time_dimension_date_range_from}","${time_dimension_date_range_to}"]}],"filters":[{"member":"meta_ads.ad_set_id","operator":"contains","values":"${filter_values}"}]}',
              forColumnId: ""
            }
          ]
        },
        {
          visualizationType: "table",
          title: "Bidding Strategy",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 4,
            w: 12,
            h: 2,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '{"measures":["google_bidding_strategy.count","google_bidding_strategy.purchase_value_sum","google_bidding_strategy.ad_spend_sum","google_bidding_strategy.purchase_sum","google_bidding_strategy.impressions_sum","google_bidding_strategy.clicks_sum","google_bidding_strategy.vtc_sum","google_bidding_strategy.ctr","google_bidding_strategy.cpc","google_bidding_strategy.cpm","google_bidding_strategy.roas","google_bidding_strategy.aov","google_bidding_strategy.cpa"],"timeDimensions":[{"dimension":"google_bidding_strategy.date","dateRange":["${time_dimension_date_range_from}","${time_dimension_date_range_to}"],"granularity":"${time_dimension_granularity}"}],"order":{"google_bidding_strategy.count":"desc"},"dimensions":["google_bidding_strategy.bidding_strategy"]}',
          columnOrder: [
            "google_bidding_strategy.count",
            "google_bidding_strategy.bidding_strategy",
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
          selectedMetric: [],
          active: false,
          childDataset: []
        },
        {
          visualizationType: "piechart",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 8,
            w: 4,
            h: 1,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '[null,{"measures":["google_campaign_type.clicks_sum"],"timeDimensions":[{"dimension":"google_campaign_type.date","dateRange":["${time_dimension_date_range_from}","${time_dimension_date_range_to}"]}],"dimensions":["google_campaign_type.campaign_type"]}]',
          columnOrder: [],
          selectedMetric: [],
          active: false,
          childDataset: []
        }
      ]
    }
  ]
};

export const dashboardJSON2 = {
  sections: [
    {
      id: "overview-A1",
      name: "A1",
      brandId: "18",
      logo: "/icons/google.svg",
      updatedDate: "2024-09-06T17:25:02.521087000Z",
      description: "Dashboard description",
      default: false,
      cards: [
        {
          visualizationType: "linechart",
          title: "Hybrid Performance Stream Google Ad Spend Sum",
          id: "hybrid_performance_stream.google_ad_spend_sum",
          logo: "/icons/meta.svg",
          description: "New metric",
          gridStackProperties: {
            x: 0,
            y: 0,
            w: 4,
            h: 2,
            locked: false,
            noResize: false,
            noMove: false
          },
          query:
            '[{"measures":["hybrid_performance_stream.google_ad_spend_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]},{"measures":["hybrid_performance_stream.google_ad_spend_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","granularity":"${time_dimension_granularity}","compareDateRange":"${compare_date_range_query}"}],"order":[["hybrid_performance_stream.created_at","asc"]]}]',
          columnOrder: [],
          selectedMetric: [],
          childDatasets: [],
          active: true
        },
        {
          visualizationType: "linechart",
          title: "Hybrid Performance Stream Google Purchase Value Sum",
          id: "hybrid_performance_stream.google_purchase_value_sum",
          logo: "/icons/meta.svg",
          description: "New metric",
          gridStackProperties: {
            x: 0,
            y: 0,
            w: 4,
            h: 2,
            locked: true,
            noResize: true,
            noMove: false
          },
          query:
            '[{"measures":["hybrid_performance_stream.google_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]},{"measures":["hybrid_performance_stream.google_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","granularity":"${time_dimension_granularity}","compareDateRange":"${compare_date_range_query}"}],"order":[["hybrid_performance_stream.created_at","asc"]]}]',
          columnOrder: [],
          selectedMetric: [],
          childDatasets: [],
          active: true
        },
        {
          visualizationType: "linechart",
          title: "Hybrid Performance Stream Google Purchases Sum",
          id: "hybrid_performance_stream.google_purchases_sum",
          logo: "/icons/meta.svg",
          description: "New metric",
          gridStackProperties: {
            x: 4.0,
            y: 4.0,
            w: 4.0,
            h: 2.0,
            locked: false,
            noResize: false,
            noMove: false
          },
          query:
            '[{"measures":["hybrid_performance_stream.google_purchases_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]},{"measures":["hybrid_performance_stream.google_purchases_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","granularity":"${time_dimension_granularity}","compareDateRange":"${compare_date_range_query}"}],"order":[["hybrid_performance_stream.created_at","asc"]]}]',
          columnOrder: [],
          selectedMetric: [],
          childDatasets: [],
          active: true
        }
      ]
    }
  ]
};
