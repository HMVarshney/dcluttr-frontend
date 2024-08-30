"use client";

import { useEffect, useMemo, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GridStack } from "gridstack";
import Header from "../_components/Header";
import ExportFileFormat from "@/components/ExportFileFormat";
import MainChart from "../_components/Home/MainChart";
import DashboardTable from "@/components/shared/DynamicDashboard/DashboardTable";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";
import { dashboardJSON } from "@/app/board/dashboards";

import "gridstack/dist/gridstack.min.css";
import { renderComponentToHtml, replacePlaceholders } from "@/lib/utils/dynamicDashboard.utils";
import { visualizationTypes } from "@/lib/constants/dynamicDashboard";
import { useSelector } from "react-redux";

const data1 = {
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

let gridstackInstance;
function Page() {
  const gridstackRef = useRef(null);

  const { groupBy, dateRange } = useSelector((state) => state.user);

  const placeholderValues = useMemo(() => {
    return { date_range_from: dateRange.from, date_range_to: dateRange.to, time_dimension_granularity: groupBy.value };
  }, [dateRange.from, dateRange.to, groupBy.value]);

  useEffect(() => {
    if (!gridstackInstance) gridstackInstance = GridStack.init({}, gridstackRef.current);

    gridstackInstance.removeAll();
    if (dashboardJSON.sections.length && dashboardJSON.sections[0].cards.length) {
      gridstackInstance.batchUpdate(true);
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
            gridstackInstance.addWidget(
              renderComponentToHtml(
                <DashboardTable title={title} description={description} query={replacePlaceholders(query, placeholderValues)} />
              ),
              gridStackOptions
            );
          } else if (visualizationType === "type1" || visualizationType === visualizationTypes.GAUGE) {
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
  }, [placeholderValues]);

  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <Header />

      <div className="flex items-center justify-between gap-2 my-3 mx-6">
        <div>
          <div className="font-bold text-xl">{dashboardJSON.sections[0].name}</div>
          <div className="text-[#4F4D55] text-sm">{dashboardJSON.sections[0].description}</div>
        </div>
        <div className="flex gap-2">
          {/* <EditChartsOrder cardList={cardList} setCardList={setCardList} /> */}
          <ExportFileFormat />
        </div>
      </div>

      <MainChart
        data={{
          ...data1,
          data: [...data1.data, ...data1.data, ...data1.data],
          series: [
            {
              name: "Total",
              dataKey: "s",
              id: 1,
              color: "#E87C67",
              type: "line"
            },
            {
              name: "Sales",
              dataKey: "r",
              id: 2,
              color: "#B1BA88",
              type: "area"
            }
          ]
        }}
      />

      <div ref={gridstackRef}></div>
    </ScrollArea>
  );
}

export default Page;
