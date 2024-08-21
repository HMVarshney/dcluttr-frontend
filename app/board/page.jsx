"use client";

import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import DashboardTable from "../(dashboards)/dashboard/performance/_components/DashboardTable";

const query = {
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
  dimensions: ["google_campaign.id", "google_campaign.name", "google_campaign.resource_name", "google_campaign.campaign_link"],
  order: {
    "google_campaign_stream.purchase_value_sum": "desc"
  },
  timeDimensions: [
    {
      dimension: "google_campaign_stream.date",
      granularity: "week"
    }
  ]
};

const El = ({ number }) => {
  const [num, setNum] = useState(0);
  useEffect(() => {
    setNum(number + 10);
  }, [number]);
  return <div>Item {num}</div>;
};

const renderComponentToHtml = (component) => {
  const container = document.createElement("div");
  const root = ReactDOM.createRoot(container);
  root.render(component);
  return container;
};

const Board2 = () => {
  const ref = useRef(null);

  useEffect(() => {
    const grid = GridStack.init({}, ref.current);

    grid.batchUpdate(true);
    grid.addWidget(renderComponentToHtml(<DashboardTable query={query} />), {
      w: 12,
      h: 4,
      noMove: true,
      noResize: true,
      locked: true
    });
    grid.addWidget(renderComponentToHtml(<DashboardTable query={query} />), {
      w: 12,
      h: 4,
      noMove: true,
      noResize: true,
      locked: true
    });
    grid.addWidget(renderComponentToHtml(<DashboardTable query={query} />), {
      w: 12,
      h: 4,
      noMove: true,
      noResize: true,
      locked: true
    });
    grid.batchUpdate(false);
  }, []);

  return <div ref={ref}></div>;
};

function TestBoard() {
  return (
    <div>
      <h1>Hey</h1>
      <Board2 />
    </div>
  );
}

export default TestBoard;
