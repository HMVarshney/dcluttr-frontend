"use client";

import { useEffect, useRef } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import DashboardTable from "../(dashboards)/dashboard/performance/_components/DashboardTable";
import { renderComponentToHtml, replacePlaceholders } from "@/lib/utils/dynamicDashboard.utils";
import Type1Chart from "../(dashboards)/_components/Home/Type1Chart";
import { dashboardJSON } from "./dashboards";
import Type2Chart from "../(dashboards)/_components/Home/Type2Chart";
import Type3Chart from "../(dashboards)/_components/Home/Type3Chart";

const data = {
  title: "Spends",
  series: [
    {
      name: "Spends",
      dataKey: "s",
      id: 3,
      color: "#9A66ED",
      type: "line"
    },
    {
      name: "Revenue",
      dataKey: "r",
      id: 4,
      color: "#2EB76F",
      type: "area"
    }
  ],
  data: [
    {
      name: "A",
      s: 8,
      r: 1,
      amt: 24,
      x: "jan"
    },
    {
      name: "B",
      s: 5,
      r: 10,
      amt: 22,
      x: "feb"
    },
    {
      name: "C",
      s: 12,
      r: 10,
      amt: 22,
      x: "mar"
    },
    {
      name: "D",
      s: 10,
      r: 17,
      amt: 20,
      x: "apr"
    },
    {
      name: "E",
      s: 14,
      r: 25,
      amt: 21,
      x: "may"
    },
    {
      name: "F",
      s: 10,
      r: 19,
      amt: 25,
      x: "jun"
    },
    {
      name: "G",
      s: 20,
      r: 25,
      amt: 21,
      x: "jul"
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
          const { title, description, coords } = card;
          if (card.visualization === "table") {
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
          } else if (card.visualization === "type1") {
            grid.addWidget(
              renderComponentToHtml(<Type1Chart data={data} details={{ title: "Title", icon: "/band-logo/google.png" }} />),
              {
                w: coords.w,
                h: coords.h,
                x: coords.x,
                y: coords.y,
                noMove: false,
                noResize: false,
                locked: false
              }
            );
          } else if (card.visualization === "type2") {
            grid.addWidget(
              renderComponentToHtml(<Type2Chart data={data} details={{ title: "Title 2", icon: "/band-logo/google.png" }} />),
              {
                w: coords.w,
                h: coords.h,
                x: coords.x,
                y: coords.y,
                noMove: false,
                noResize: false,
                locked: false
              }
            );
          } else if (card.visualization === "type3") {
            grid.addWidget(
              renderComponentToHtml(<Type3Chart data={data} details={{ title: "Title 2", icon: "/band-logo/google.png" }} />),
              {
                w: coords.w,
                h: coords.h,
                x: coords.x,
                y: coords.y,
                noMove: false,
                noResize: false,
                locked: false
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
