"use client";

import { useCubeQuery } from "@cubejs-client/react";
import cubeJsApi from "@/lib/cubeJsApi";
import DatatableChart from "@/components/shared/DynamicDashboard/DashboardChart/Charts/DatatableChart";
import { DFA } from "@/lib/utils";

const query = {
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
  dimensions: ["meta_campaign_stream.id"],
  order: {
    "meta_campaign_stream.count": "desc"
  },
  timeDimensions: [
    {
      dimension: "meta_campaign_stream.date",
      dateRange: ["2024-08-01", "2024-08-31"],
      granularity: "day"
    }
  ],
  filters: [
    {
      member: "meta_campaign_stream.id",
      operator: "contains",
      values: ["120209256810230599"]
    }
  ]
};

function Board() {
  const { resultSet } = useCubeQuery(query, { cubeApi: cubeJsApi() });

  return (
    <div>
      Hey
      <DatatableChart
        chartData={{ results: resultSet?.chartPivot() || DFA, columns: resultSet?.seriesNames() || DFA }}
        measures={resultSet?.annotation()?.measures || {}}
      />
    </div>
  );
}

export default Board;
