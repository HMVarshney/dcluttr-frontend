"use client";

import { useMemo, useRef, useState } from "react";
import moment from "moment";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "../_components/Header";
import { useDynamicDashboard } from "@/lib/hooks/dynamicDashboard";
import { renderCardsOnGrid } from "@/lib/utils/dynamicDashboard.utils";
import { SaveDashboardSection } from "@/components/shared/DynamicDashboard/SaveDashboard/SaveDashboardSection";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import DatatableChartRenderer from "../_components/DatatableChartRenderer";

export default function Page() {
  const gridRef = useRef(null);
  const isOpen = useSelector((state) => state.user.sideBarClose);
  const { showMainChart } = useSelector((state) => state.user);

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

  const { gridItems } = useDynamicDashboard("performance-google", 18, gridRef);

  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <Header dateRange={dateRange} setDateRange={setDateRange} />

      <div className={cn(" w-[calc(100vw-332px)]", { "w-[calc(100vw-174px)]": isOpen }, { hidden: !showMainChart })}>
        <DatatableChartRenderer placeholderValues={placeholderValues} />
      </div>

      <div className={cn(" w-[calc(100vw-332px)] grid-stack", { "w-[calc(100vw-174px)]": isOpen })} ref={gridRef}>
        {renderCardsOnGrid(gridItems, placeholderValues)}
      </div>

      <div style={{ marginTop: "10rem" }}>
        <SaveDashboardSection brandId={18} />
      </div>
    </ScrollArea>
  );
}
