"use client";

import { useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "../_components/Header";
import ExportFileFormat from "@/components/ExportFileFormat";
import MainChart from "../_components/Home/MainChart";
import { dashboardJSON } from "@/app/board/dashboards";
import { useDynamicDashboard } from "@/lib/hooks/dynamicDashboard";

import "gridstack/dist/gridstack.min.css";

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

function getActiveDashboardSection(dashboardJSON, activeSectionId) {
  const activeSectionIndex = dashboardJSON.sections.findIndex((s) => s.id === activeSectionId);
  if (activeSectionIndex === -1) return;
  return dashboardJSON.sections[activeSectionIndex];
}

function Page() {
  const [activeSectionId, setActiveSectionId] = useState(dashboardJSON.sections[0].id);

  const gridstackRef = useRef(null);

  const { groupBy, dateRange, endDateRange } = useSelector((state) => state.user);

  const placeholderValues = useMemo(() => {
    const values = { compare_date_range_query: [], time_dimension_granularity: groupBy.value };
    if (dateRange.from && dateRange.to) {
      values.compare_date_range_query.push([dateRange.from, dateRange.to]);
    }
    if (endDateRange.from && endDateRange.to) {
      values.compare_date_range_query.push([endDateRange.from, endDateRange.to]);
    }
    return values;
  }, [dateRange.from, dateRange.to, groupBy.value, endDateRange.from, endDateRange.to]);

  const activeDashboardSection = useMemo(() => getActiveDashboardSection(dashboardJSON, activeSectionId), [activeSectionId]);

  useDynamicDashboard(gridstackRef, activeDashboardSection, placeholderValues);

  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <Header sections={dashboardJSON.sections} activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId} />

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
