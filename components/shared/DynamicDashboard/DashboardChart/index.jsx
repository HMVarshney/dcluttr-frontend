import { useMemo, useRef } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import AreaChart1 from "./Charts/AreaChart1";
import cubeJsApi from "@/lib/cubeJsApi";
import { visualizationTypes } from "@/lib/constants/dynamicDashboard";
import GaugeChart from "./Charts/GaugeChart";
import DonutChart from "./Charts/PieChart";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import DatatableChart from "./Charts/DatatableChart";

function DashboardChart({ title, description, icon, query, chartType }) {
  const cubejsClient = useRef(cubeJsApi());

  const { resultSet: resultSetGauge, isLoading: isLoadingGauge } = useCubeQuery(query[0], {
    skip: !query[0],
    castNumerics: true,
    cubeApi: cubejsClient.current
  });

  const { resultSet: resultSetChart, isLoading: isLoadingChart } = useCubeQuery(query[1], {
    skip: !query[1],
    castNumerics: true,
    cubeApi: cubejsClient.current
  });

  const chartData = useMemo(() => {
    if (!resultSetChart) {
      return { results: [], columns: [] };
    }
    return {
      results: resultSetChart.chartPivot(),
      columns: resultSetChart.seriesNames()
    };
  }, [resultSetChart]);

  const gaugeData = useMemo(() => {
    if (!resultSetGauge) return [0, 0];
    const { yValuesArray } = resultSetGauge.pivot()[0];
    return [yValuesArray?.[0]?.[1] || null, yValuesArray?.[1]?.[1] || null];
  }, [resultSetGauge]);

  if (isLoadingChart || isLoadingGauge) return <Skeleton className="w-full h-[408px] my-4 rounded-md mx-auto" />;

  if (chartType === visualizationTypes.GAUGE) {
    return (
      <div className="p-1.5">
        <GaugeChart isLoading={isLoadingGauge} details={{ title, icon, description }} data={gaugeData} />
      </div>
    );
  }

  if (chartType === visualizationTypes.PIECHART) {
    return <DonutChart details={{ title, description }} chartData={chartData} />;
  }

  if (chartType === visualizationTypes.DATATABLECHART) {
    return <DatatableChart chartData={chartData} measures={resultSetChart?.annotation()?.measures || {}} />;
  }

  return (
    <div className="p-1.5">
      <AreaChart1
        isLoading={isLoadingChart || isLoadingGauge}
        gaugeData={gaugeData}
        chartData={chartData}
        details={{ title, icon, description }}
      />
    </div>
  );
}

export default DashboardChart;
