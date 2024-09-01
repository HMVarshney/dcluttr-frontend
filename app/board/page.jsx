"use client";

import { useEffect, useRef } from "react";
import { GridStack } from "gridstack";
import DashboardTable from "../../components/shared/DynamicDashboard/DashboardTable";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";
import { renderComponentToHtml, replacePlaceholders } from "@/lib/utils/dynamicDashboard.utils";
import { dashboardTableJSON as dashboardJSON } from "./dashboards";
import { visualizationTypes } from "@/lib/constants/dynamicDashboard";

import "gridstack/dist/gridstack.min.css";

const placeholderValues = {
  compare_date_range_query: [["2024-07-14", "2024-08-14"]],
  time_dimension_granularity: "day",
  time_dimension_date_range_from: "2024-08-01",
  time_dimension_date_range_to: "2024-08-31"
};

let grid;
function Board() {
  const ref = useRef(null);

  useEffect(() => {
    if (!grid) grid = GridStack.init({}, ref.current);

    grid.removeAll();
    if (dashboardJSON.sections.length && dashboardJSON.sections[0].cards.length) {
      grid.batchUpdate(true);
      dashboardJSON.sections[0].cards.map((card) => {
        if (card.active) {
          const { title, description, logo, gridStackProperties, visualizationType, columnOrder } = card;
          const query = JSON.parse(card.query);
          const gridStackOptions = {
            w: gridStackProperties.w,
            h: gridStackProperties.h,
            x: gridStackProperties.x,
            y: gridStackProperties.y,
            noMove: gridStackProperties.noMove,
            noResize: gridStackProperties.noResize,
            locked: gridStackProperties.locked
          };

          if (visualizationType === visualizationTypes.TABLE) {
            grid.addWidget(
              renderComponentToHtml(
                <DashboardTable
                  title={title}
                  description={description}
                  query={replacePlaceholders(query, placeholderValues)}
                  columnOrder={columnOrder}
                />
              ),
              gridStackOptions
            );
          } else if (visualizationType === "type1" || visualizationType === visualizationTypes.GAUGE) {
            grid.addWidget(
              renderComponentToHtml(
                <DashboardChart
                  title={title}
                  description={description}
                  icon={logo}
                  query={replacePlaceholders(query, placeholderValues)}
                  chartType={visualizationType}
                />
              ),
              gridStackOptions
            );
          }
          // else if (visualizationType === "type2") {
          //   grid.addWidget(renderComponentToHtml(<Type2Chart data={data} details={{ title, icon: logo }} />), gridStackOptions);
          // } else if (visualizationType === "type3") {
          //   grid.addWidget(renderComponentToHtml(<Type3Chart data={data} details={{ title, icon: logo }} />), gridStackOptions);
          // } else if (visualizationType === visualizationTypes.PIECHART) {
          //   grid.addWidget(
          //     renderComponentToHtml(<DonutChart title={title} description={description} query={query} />),
          //     gridStackOptions
          //   );
          // }
        }
      });
      grid.batchUpdate(false);
    }
  }, []);

  return <div ref={ref}></div>;
}

function TestBoard() {
  return <Board />;
}

export default TestBoard;
