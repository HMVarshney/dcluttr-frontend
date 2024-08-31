import { useMemo } from "react";
import AreaChart1 from "./Charts/AreaChart1";
import { cubejsClient } from "@/lib/cubeJsApi";
import { visualizationTypes } from "@/lib/constants/dynamicDashboard";
import GaugeChart from "./Charts/GaugeChart";
import { useCubeQuery } from "@cubejs-client/react";

function DashboardChart({ title, description, icon, query, chartType }) {
  const { resultSet: resultSetGauge, isLoading: isLoadingGauge } = useCubeQuery(query[0], {
    skip: !query[0],
    castNumerics: true,
    cubeApi: cubejsClient
  });

  const { resultSet: resultSetChart, isLoading: isLoadingChart1 } = useCubeQuery(query[1], {
    skip: !query[1],
    castNumerics: true,
    cubeApi: cubejsClient
  });

  const { results, columns } = useMemo(() => {
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

  if (isLoadingChart1 || isLoadingGauge) return <div>Loading...</div>;

  if (chartType === visualizationTypes.GAUGE) {
    return <GaugeChart isLoading={isLoadingGauge} details={{ title, icon, description }} data={gaugeData} />;
  }

  return (
    <div className="h-full">
      <AreaChart1
        isLoading={isLoadingChart1 || isLoadingGauge}
        gaugeData={gaugeData}
        chartData={{ results, columns }}
        details={{ title, icon, description }}
      />
    </div>
  );
}

export default DashboardChart;
