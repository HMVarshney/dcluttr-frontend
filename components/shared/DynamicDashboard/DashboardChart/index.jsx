import { useMemo } from "react";
import { extractTitleFromAnnotation } from "../../../../lib/utils/cubejs.utils";
import AreaChart1 from "./Charts/AreaChart1";
import { useCubeQueryWrapper } from "@/lib/hooks/cubejs";
import { cubejsClient } from "@/lib/cubeJsApi";

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
    result: { parsed },
    isLoading
  } = useCubeQueryWrapper(query, { castNumerics: true, cubeApi: cubejsClient });

  const { results, columns } = useMemo(() => {
    return {
      results: parsed.results.map((res) => ({
        ...res,
        name: res.created_at
      })),
      columns: constructColumnDefs(parsed.columns)
    };
  }, [parsed.results, parsed.columns]);

  if (isLoading) return <div>Loading...</div>;

  if (!results.length) return null;

  return (
    <div className="h-full px-6">
      <AreaChart1 isLoading={isLoading} data={{ results, columns }} details={{ title, icon, description }} />
    </div>
  );
}

export default DashboardChart;
