"use client";

import { useEffect, useRef } from "react";
import { GridStack } from "gridstack";
import DashboardTable from "../../components/shared/DynamicDashboard/DashboardTable";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";
import { renderComponentToHtml, renderGridstackElement, replacePlaceholders } from "@/lib/utils/dynamicDashboard.utils";
import { dashboardJSON2 as dashboardJSON } from "./dashboards";
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

  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) gridRef.current = GridStack.init({}, ref.current);

    const grid = gridRef.current;
    grid.removeAll();
    if (dashboardJSON.sections.length && dashboardJSON.sections[0].cards.length) {
      grid.batchUpdate(true);
      dashboardJSON.sections[0].cards.map((card) => {
        if (card.active) {
          renderGridstackElement(grid, card, placeholderValues);
        }
      });
      grid.batchUpdate(false);
    }
  }, []);

  return (
    <>
      <div ref={ref}></div>
      <div style={{ marginTop: "12rem" }}>
        <button
          onClick={() => {
            const elements = gridRef.current.getGridItems();
            gridRef.current.removeWidget(elements[0]);
          }}
        >
          Remove card
        </button>
      </div>
    </>
  );
}

function TestBoard() {
  return <Board />;
}

export default TestBoard;
