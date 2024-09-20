"use client";

import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Pencil } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "../_components/Header";
import ExportFileFormat from "@/components/ExportFileFormat";
import { useDynamicDashboard } from "@/lib/hooks/dynamicDashboard";
import { renderCardsOnGrid } from "@/lib/utils/dynamicDashboard.utils";
import EditChartsOrder from "../_components/EditChartsOrder";
import { SaveDashboardSection } from "@/components/shared/DynamicDashboard/SaveDashboard/SaveDashboardSection";
import { UpdateSection } from "../_components/Header/CreateSection";
import { Button } from "@/components/ui/button";
import withDynamicDashboardContext from "@/lib/hoc/withDynamicDasboardContext";
import { useDynamicDashboardContext } from "@/lib/context/DynamicDashboard/DynamicDashboardContext";
import { dynamicDashboardActions } from "@/lib/context/DynamicDashboard/DynamicDashboardActions";

import "gridstack/dist/gridstack.min.css";

function Page() {
  const gridRef = useRef(null);

  const { state, dispatch } = useDynamicDashboardContext();

  const { groupBy, dateRange, endDateRange } = useSelector((state) => state.user);

  const { activeSection, cardCustomizableProps: cardProps } = state;

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

  const { pageDashboards, activateCard, gridItems } = useDynamicDashboard("overview", 18, gridRef);

  const PageEditButton = useMemo(() => {
    if (!activeSection.section) return null;

    if (activeSection.section.default) {
      return (
        <EditChartsOrder
          cardList={activeSection.section?.cards || []}
          cardProps={cardProps}
          activateCard={(cardId, activate) => activateCard(cardId, activate, placeholderValues)}
        />
      );
    }

    return (
      <UpdateSection placeholderValues={placeholderValues}>
        <Button variant="outline" className=" text-[#031B15]">
          <Pencil className="w-4 h-4 mr-2" />
          <div className="font-medium text-sm">Edit</div>
        </Button>
      </UpdateSection>
    );
  }, [activateCard, activeSection.section, cardProps, placeholderValues]);

  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <Header
        sections={pageDashboards}
        activeSectionId={activeSection.id}
        setActiveSectionId={(sectionId) => dynamicDashboardActions.setActiveSection(dispatch)(sectionId)}
      />

      <div className="flex items-center justify-between gap-2 m-6">
        <div>
          <div className="font-bold text-xl">{activeSection.section?.name}</div>
          <div className="text-[#4F4D55] text-sm">{activeSection.section?.description}</div>
        </div>

        <div className="flex gap-2">
          <SaveDashboardSection brandId={18} />
          {PageEditButton}
          <ExportFileFormat />
        </div>
      </div>

      <div className="mx-[18px]" ref={gridRef}>
        {renderCardsOnGrid(gridItems, placeholderValues)}
      </div>
    </ScrollArea>
  );
}

export default withDynamicDashboardContext(Page);
