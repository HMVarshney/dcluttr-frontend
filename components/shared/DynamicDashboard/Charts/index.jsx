import { useMemo } from "react";
import { extractTitleFromAnnotation } from "../../../../lib/utils/cubejs.utils";
import AreaChart1 from "./AreaChart";
import { useCubeQueryWrapper } from "@/lib/hooks/cubejs";
import { cubejsClient } from "@/lib/cubeJsApi";

const data = {
  title: "Spends",
  series: [
    // {
    //   name: "Spends",
    //   dataKey: "s",
    //   id: 3,
    //   color: "#9A66ED",
    //   type: "line"
    // },
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
      r: null
      // amt: 24,
      // x: "jan"
    },
    {
      name: "B",
      s: 5,
      r: null
      // amt: 22,
      // x: "feb"
    },
    {
      name: "C",
      s: 12,
      r: null
      // amt: 22,
      // x: "mar"
    },
    {
      name: "D",
      s: 10,
      r: 3.5
      // amt: 20,
      // x: "apr"
    },
    {
      name: "E",
      s: 14,
      r: 19.07
      // amt: 21,
      // x: "may"
    },
    {
      name: "F",
      s: 10,
      r: 3.02
      // amt: 25,
      // x: "jun"
    },
    {
      name: "G",
      s: 20,
      r: null
      // amt: 21,
      // x: "jul"
    }
  ]
};

function constructColumnDefs(columns) {
  return Object.entries(columns).map(([key, value]) => {
    return {
      name: extractTitleFromAnnotation(value),
      dataKey: key,
      id: key,
      color: "#9A66ED",
      type: "area"
    };
  });
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
      <AreaChart1
        isLoading={isLoading}
        // data={{ results: data.data, columns: data.series }}
        data={{ results, columns }}
        details={{ title, icon, description }}
      />
    </div>
  );
}

export default DashboardChart;
