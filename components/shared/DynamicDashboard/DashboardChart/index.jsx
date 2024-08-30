import { useMemo } from "react";
import { extractTitleFromAnnotation } from "../../../../lib/utils/cubejs.utils";
import AreaChart1 from "./Charts/AreaChart1";
import { useCubeQueryWrapper } from "@/lib/hooks/cubejs";
import { cubejsClient } from "@/lib/cubeJsApi";
import { visualizationTypes } from "@/lib/constants/dynamicDashboard";
import GaugeChart from "./Charts/GaugeChart";
import moment from "moment";

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
    result: { parsed: parsedChartData1 },
    isLoading: isLoadingChart1
  } = useCubeQueryWrapper(query[1], { castNumerics: true, cubeApi: cubejsClient });

  // const {
  //   result: { parsed: parsedChartData2 },
  //   isLoading: isLoadingChart2
  // } = useCubeQueryWrapper(query[2], { castNumerics: true, cubeApi: cubejsClient });

  // const { results, columns } = useMemo(() => {
  //   return {
  //     results: [
  //       ...parsedChartData1.results.map((res) => ({
  //         ...res,
  //         name: moment(res.created_at).format("DD/MM/YYYY")
  //       })),
  //       ...parsedChartData2.results.map((res) => ({
  //         ...res,
  //         name: moment(res.created_at).format("DD/MM/YYYY")
  //       }))
  //     ],
  //     columns: constructColumnDefs({ ...parsedChartData1.columns, ...parsedChartData2.columns })
  //   };
  // }, [parsedChartData1.results, parsedChartData1.columns, parsedChartData2.results, parsedChartData2.columns]);

  const { results, columns } = useMemo(() => {
    return {
      results: parsedChartData1.results.map((res) => ({
        ...res,
        name: moment(res.created_at).format("DD/MM/YYYY")
      })),
      columns: constructColumnDefs(parsedChartData1.columns)
    };
  }, [parsedChartData1.results, parsedChartData1.columns]);

  if (isLoadingChart1 || isLoadingGauge) return <div>Loading...</div>;

  if (chartType === visualizationTypes.GAUGE) {
    return <GaugeChart />;
  }

  return (
    <div className="h-full">
      <AreaChart1
        isLoading={isLoadingChart1 || isLoadingGauge}
        gaugeData={parsedGaugeData}
        chartData={{ results, columns }}
        details={{ title, icon, description }}
      />
    </div>
  );
}

export default DashboardChart;
