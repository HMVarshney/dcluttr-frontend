"use client";

import { useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "../_components/Header";
import ExportFileFormat from "@/components/ExportFileFormat";
import MainChart from "../_components/Home/MainChart";
import { useDynamicDashboard } from "@/lib/hooks/dynamicDashboard";
import { getPageDashboards } from "@/lib/utils/dynamicDashboard.utils";
import EditChartsOrder from "../_components/EditChartsOrder";
import { dynamicDashboardActions } from "@/lib/store/features/dynamicDashboard";
import { SaveDashboardSection } from "@/components/shared/DynamicDashboard/SaveDashboard/SaveDashboardSection";
import { UpdateSection } from "../_components/Header/CreateSection";
import { Button } from "@/components/ui/button";

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

function Page() {
  const gridstackRef = useRef(null);

  const dispatch = useDispatch();

  const { groupBy, dateRange, endDateRange } = useSelector((state) => state.user);

  const placeholderValues = useMemo(() => {
    const values = {
      compare_date_range_query: [],
      time_dimension_granularity: groupBy.value,
      time_dimension_date_range_from: "",
      time_dimension_date_range_to: ""
    };
    if (dateRange.from && dateRange.to) {
      values.compare_date_range_query.push([dateRange.from, dateRange.to]);
      values.time_dimension_date_range_from = dateRange.from;
      values.time_dimension_date_range_to = dateRange.to;
    }
    if (endDateRange.from && endDateRange.to) {
      values.compare_date_range_query.push([endDateRange.from, endDateRange.to]);
    }
    return values;
  }, [dateRange.from, dateRange.to, groupBy.value, endDateRange.from, endDateRange.to]);

  const {
    gridstackIntance,
    dashboard,
    activeSection: activeDashboardSection,
    activeSectionId,
    cardProps,
    activateCard
  } = useDynamicDashboard(18, gridstackRef, placeholderValues);

  const pageDashboards = useMemo(() => {
    if (!dashboard.length) return [];

    const thisPageDashboards = getPageDashboards(dashboard, "overview");
    dispatch(dynamicDashboardActions.setActiveSection({ id: thisPageDashboards[0].id }));
    return thisPageDashboards;
  }, [dashboard, dispatch]);

  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <Header
        sections={pageDashboards}
        activeSectionId={activeSectionId}
        setActiveSectionId={(sectionId) => dispatch(dynamicDashboardActions.setActiveSection({ id: sectionId }))}
      />

      <div className="flex items-center justify-between gap-2 my-3 mx-6">
        <div>
          <div className="font-bold text-xl">{activeDashboardSection?.name}</div>
          <div className="text-[#4F4D55] text-sm">{activeDashboardSection?.description}</div>
        </div>
        <div className="flex gap-2">
          {activeDashboardSection?.default ? (
            <EditChartsOrder
              cardList={activeDashboardSection?.cards || []}
              cardProps={cardProps}
              activateCard={(cardId, activate) => activateCard(cardId, activate, placeholderValues)}
            />
          ) : (
            <UpdateSection placeholderValues={placeholderValues}>
              <Button variant="outline" className=" text-[#031B15]">
                <Pencil className="w-4 h-4 mr-2" />
                <div className="font-medium text-sm">Edit</div>
              </Button>
            </UpdateSection>
          )}
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

      <div style={{ marginTop: "10rem" }}>
        <SaveDashboardSection gridstackInstance={gridstackIntance} brandId={18} />
      </div>
    </ScrollArea>
  );
}

export default Page;
