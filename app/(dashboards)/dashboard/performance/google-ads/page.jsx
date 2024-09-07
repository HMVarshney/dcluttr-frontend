"use client";

import { useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "../_components/Header";
import { useDynamicDashboard } from "@/lib/hooks/dynamicDashboard";
import { getPageDashboards } from "@/lib/utils/dynamicDashboard.utils";
import { dynamicDashboardActions } from "@/lib/store/features/dynamicDashboard";
import { SaveDashboardSection } from "@/components/shared/DynamicDashboard/SaveDashboard/SaveDashboardSection";

export default function Page() {
  const dispatch = useDispatch();

  const gridstackRef = useRef(null);

  const [dateRange, setDateRange] = useState({
    from: moment().subtract({ day: 7 }).format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD")
  });

  const placeholderValues = useMemo(() => {
    const values = {
      time_dimension_date_range_from: "",
      time_dimension_date_range_to: ""
    };
    if (dateRange.from && dateRange.to) {
      values.time_dimension_date_range_from = dateRange.from;
      values.time_dimension_date_range_to = dateRange.to;
    }
    return values;
  }, [dateRange.from, dateRange.to]);

  const { gridstackIntance, dashboard } = useDynamicDashboard(18, gridstackRef, placeholderValues);

  useMemo(() => {
    if (!dashboard.length) return [];

    const thisPageDashboards = getPageDashboards(dashboard, "performance-google");
    dispatch(dynamicDashboardActions.setActiveSection({ id: thisPageDashboards[0].id }));
    return thisPageDashboards;
  }, [dashboard, dispatch]);

  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <Header dateRange={dateRange} setDateRange={setDateRange} />

      <div ref={gridstackRef}></div>

      <div style={{ marginTop: "10rem" }}>
        <SaveDashboardSection gridstackInstance={gridstackIntance} brandId={18} />
      </div>
    </ScrollArea>
  );
}
