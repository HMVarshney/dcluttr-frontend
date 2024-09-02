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
            '{"measures":["google_campaign_stream.purchase_value_sum","google_campaign_stream.ad_spend_sum","google_campaign_stream.purchase_sum","google_campaign_stream.impressions_sum","google_campaign_stream.clicks_sum","google_campaign_stream.vtc_sum","google_campaign_stream.ctr","google_campaign_stream.cpc","google_campaign_stream.cpm","google_campaign_stream.roas","google_campaign_stream.aov","google_campaign_stream.cpa"],"dimensions":["google_campaign.id","google_campaign.name","google_campaign.resource_name","google_campaign.campaign_link"],"order":{"google_campaign_stream.purchase_value_sum":"desc"},"timeDimensions":[{"dimension":"google_campaign_stream.date","dateRange":["${time_dimension_date_range_from}","${time_dimension_date_range_to}"],"granularity":"${time_dimension_granularity}"}]}',
          columnOrder: [
            "google_campaign.id",
            "google_campaign.name",
            "google_campaign_stream.date.day",
            "google_campaign.resource_name",
            "google_campaign.campaign_link",
            "google_campaign_stream.purchase_value_sum",
            "google_campaign_stream.ad_spend_sum",
            "google_campaign_stream.purchase_sum",
            "google_campaign_stream.impressions_sum",
            "google_campaign_stream.clicks_sum",
            "google_campaign_stream.vtc_sum",
            "google_campaign_stream.ctr",
            "google_campaign_stream.cpc",
            "google_campaign_stream.cpm",
            "google_campaign_stream.roas",
            "google_campaign_stream.aov",
            "google_campaign_stream.cpa"
          ],
          selectedMetric: [],
          active: true
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
          active: true
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
          active: true
        }
      ]
    }
  ]
};
