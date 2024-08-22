"use client";

import { useEffect, useRef } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import DashboardTable from "../(dashboards)/dashboard/performance/_components/DashboardTable";
import { renderComponentToHtml, replacePlaceholders } from "@/lib/utils/dynamicDashboard.utils";

const dashboardJSON = {
  sections: [
    {
      id: "",
      name: "Section 1",
      icon: "icon_link",
      description: "",
      isDefault: false,
      dashboardCards: [
        {
          visualization: "table",
          title: "Campaign-wise distribution",
          description: "Find all the analytics for store",
          coords: {
            h: 4,
            w: 12,
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
          isActive: true
        }
      ]
    }
  ]
};

const placeholderValues = {
  order_by_key: "google_campaign_stream.purchase_value_sum",
  order_by_value: "desc"
};

let grid;
const Board = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!grid) grid = GridStack.init({}, ref.current);

    if (dashboardJSON.sections.length && dashboardJSON.sections[0].dashboardCards.length) {
      grid.batchUpdate(true);
      dashboardJSON.sections[0].dashboardCards.map((card) => {
        if (card.isActive) {
          if (card.visualization === "table") {
            const { title, description, coords } = card;
            grid.addWidget(
              renderComponentToHtml(
                <DashboardTable
                  title={title}
                  description={description}
                  query={replacePlaceholders(card.query, placeholderValues)}
                />
              ),
              {
                w: coords.w,
                h: coords.h,
                x: coords.x,
                y: coords.y,
                noMove: true,
                noResize: true,
                locked: true
              }
            );
          }
        }
      });
      grid.batchUpdate(false);
    }
  }, []);

  return <div ref={ref}></div>;
};

function TestBoard() {
  return <Board />;
}

export default TestBoard;
