"use client";

import { useEffect, useRef } from "react";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";
import DashboardTable from "../../components/shared/DynamicDashboard/DashboardTable";
import { renderComponentToHtml, replacePlaceholders } from "@/lib/utils/dynamicDashboard.utils";
import Type1Chart from "../(dashboards)/_components/Home/Type1Chart";
import { dashboardJSON } from "./dashboards";
import Type2Chart from "../(dashboards)/_components/Home/Type2Chart";
import Type3Chart from "../(dashboards)/_components/Home/Type3Chart";
import { visualizationTypes } from "@/lib/constants/dynamicDashboard";
import DonutChart from "@/components/shared/DynamicDashboard/DashboardChart/Charts/PieChart";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";

const placeholderValues = {
  order_by_key: "google_campaign_stream.purchase_value_sum",
  order_by_value: "desc"
};

let grid;
function Board() {
  const ref = useRef(null);

  useEffect(() => {
    if (!grid) grid = GridStack.init({}, ref.current);

    if (dashboardJSON.sections.length && dashboardJSON.sections[0].cards.length) {
      grid.batchUpdate(true);
      dashboardJSON.sections[0].cards.map((card) => {
        if (card.active) {
          const { title, description, logo, gridStackProperties, visualizationType } = card;
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
                <DashboardTable title={title} description={description} query={replacePlaceholders(query, placeholderValues)} />
              ),
              gridStackOptions
            );
          } else if (visualizationType === "type1") {
            grid.addWidget(
              renderComponentToHtml(
                <DashboardChart title={title} description={description} icon={logo} query={query} chartType={visualizationType} />
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
