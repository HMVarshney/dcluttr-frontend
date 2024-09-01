import { useEffect, useRef } from "react";
import { GridStack } from "gridstack";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";
import DashboardTable from "@/components/shared/DynamicDashboard/DashboardTable";
import { renderComponentToHtml, replacePlaceholders } from "../utils/dynamicDashboard.utils";
import { visualizationTypes } from "../constants/dynamicDashboard";

export const useDynamicDashboard = (domNodeRef, dashboardSection, placeholderValues, renderEngineOptions = {}) => {
  const gridstackInstanceRef = useRef(null);

  useEffect(() => {
    if (!domNodeRef.current) return;

    if (!gridstackInstanceRef.current) gridstackInstanceRef.current = GridStack.init(renderEngineOptions, domNodeRef.current);

    const gridstackInstance = gridstackInstanceRef.current;

    gridstackInstance.removeAll();

    if (dashboardSection) {
      gridstackInstance.batchUpdate(true);

      // This is where...
      dashboardSection.cards.map((card) => {
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

          // ...magic happens
          if (visualizationType === visualizationTypes.TABLE) {
            gridstackInstance.addWidget(
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
          } else if (
            visualizationType === "type1" ||
            visualizationType === visualizationTypes.GAUGE ||
            visualizationType === visualizationTypes.PIECHART
          ) {
            gridstackInstance.addWidget(
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
        }
      });

      gridstackInstance.batchUpdate(false);
    }
  }, [dashboardSection, domNodeRef, placeholderValues, renderEngineOptions]);

  return gridstackInstanceRef.current;
};
