import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardChart from "@/components/shared/DynamicDashboard/DashboardChart";
import { visualizationTypes } from "@/lib/constants/dynamicDashboard";
import { useDynamicDashboardContext } from "@/lib/context/DynamicDashboard/DynamicDashboardContext";

function DatatableChartRenderer() {
  const { state } = useDynamicDashboardContext();
  const {
    selected: { cardId, query, filterableId, ids }
  } = state;

  const { groupBy } = useSelector((state) => state.user);

  const [timeseriesQuery, setTimeseriesQuery] = useState(null);

  useEffect(() => {
    if (!cardId) return;

    const timeseriesQueryLocal = {
      ...query,
      filters: [
        {
          member: filterableId,
          operator: "contains",
          values: Object.keys(ids).map((id) => id.split("-")[0])
        }
      ],
      timeDimensions: [
        {
          ...query.timeDimensions[0],
          granularity: groupBy.value
        }
      ]
    };
    timeseriesQueryLocal.dimensions = [filterableId];

    setTimeseriesQuery(timeseriesQueryLocal);
  }, [cardId, filterableId, ids, query, groupBy]);

  if (!cardId) return null;

  return <DashboardChart query={[null, timeseriesQuery]} chartType={visualizationTypes.DATATABLECHART} />;
}

export default DatatableChartRenderer;
