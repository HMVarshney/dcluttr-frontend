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
          visualizationType: "type1",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
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
          visualizationType: "type1",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
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
          visualizationType: "type1",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
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
            '[{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","compareDateRange":"${compare_date_range_query}"}]},{"measures":["hybrid_performance_stream.meta_purchase_value_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","granularity":"${time_dimension_granularity}","compareDateRange":"${compare_date_range_query}"}],"order":[["hybrid_performance_stream.created_at","asc"]]}]',
          columnOrder: ["date", "sales"],
          selectedMetric: ["sales"],
          active: true
        },
        {
          visualizationType: "type1",
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
          visualizationType: "type1",
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
        },
        {
          visualizationType: "type1",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 0,
            y: 6,
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
          visualizationType: "gauge",
          title: "Campaign Type",
          id: "102",
          logo: "/icons/google.svg",
          description: "Find all the analytics for store",
          gridStackProperties: {
            x: 4,
            y: 6,
            w: 4,
            h: 1,
            locked: true,
            noResize: true,
            noMove: true
          },
          query:
            '{"measures":["hybrid_performance_stream.google_ad_spend_sum"],"timeDimensions":[{"dimension":"hybrid_performance_stream.created_at","granularity":"week"}],"order":[["hybrid_performance_stream.created_at","asc"]]}',
          columnOrder: ["date", "sales"],
          selectedMetric: ["sales"],
          active: false
        }
        // {
        //   visualizationType: "piechart",
        //   title: "Campaign Type",
        //   id: "102",
        //   logo: "http://example.com/logo.png",
        //   description: "Find all the analytics for store",
        //   gridStackProperties: {
        //     x: 0,
        //     y: 12,
        //     w: 4,
        //     h: 2,
        //     locked: true,
        //     noResize: true,
        //     noMove: true
        //   },
        //   query:
        //     '{"measures":["google_campaign_type.count","google_campaign_type.purchase_value_sum","google_campaign_type.ad_spend_sum","google_campaign_type.purchase_sum","google_campaign_type.impressions_sum","google_campaign_type.clicks_sum","google_campaign_type.vtc_sum","google_campaign_type.ctr","google_campaign_type.cpc","google_campaign_type.cpm","google_campaign_type.roas","google_campaign_type.aov","google_campaign_type.cpa"],"dimensions":["google_campaign_type.name"],"timeDimensions":[],"order":{"google_campaign_type.count":"desc"}}',
        //   columnOrder: ["date", "sales"],
        //   selectedMetric: ["sales"],
        //   active: false
        // }
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
          active: true
        }
      ]
    }
  ]
};
