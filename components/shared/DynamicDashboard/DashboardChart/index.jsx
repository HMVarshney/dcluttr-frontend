import { useMemo } from "react";
import { extractTitleFromAnnotation } from "../../../../lib/utils/cubejs.utils";
import AreaChart1 from "./Charts/AreaChart1";
import { useCubeQueryWrapper } from "@/lib/hooks/cubejs";
import { cubejsClient } from "@/lib/cubeJsApi";
import { visualizationTypes } from "@/lib/constants/dynamicDashboard";
import GaugeChart from "./Charts/GaugeChart";

function constructColumnDefs(columns) {
  return Object.entries(columns).map(([key, value]) => ({
    name: extractTitleFromAnnotation(value),
    dataKey: key,
    id: key,
    color: "#9A66ED",
    type: "area"
  }));
}

function DashboardChart({ title, description, icon, query, chartType }) {
  const {
    result: { parsed: parsedGaugeData },
    isLoading: isLoadingGauge
  } = useCubeQueryWrapper(query[0], { castNumerics: true, cubeApi: cubejsClient });

  const {
    result: { parsed: parsedChartData },
    isLoading: isLoadingChart
  } = useCubeQueryWrapper(query[1], { castNumerics: true, cubeApi: cubejsClient });

  const { results, columns } = useMemo(() => {
    return {
      results: parsedChartData.results.map((res) => ({
        ...res,
        name: res.created_at
      })),
      columns: constructColumnDefs(parsedChartData.columns)
    };
  }, [parsedChartData.results, parsedChartData.columns]);

  if (isLoadingChart || isLoadingGauge) return <div>Loading...</div>;

  if (chartType === visualizationTypes.GAUGE) {
    return <GaugeChart />;
  }

  return (
    <div>
      <AreaChart1
        isLoading={isLoadingChart || isLoadingGauge}
        gaugeData={parsedGaugeData}
        chartData={{ results, columns }}
        details={{ title, icon, description }}
      />
    </div>
  );
}

export default DashboardChart;
