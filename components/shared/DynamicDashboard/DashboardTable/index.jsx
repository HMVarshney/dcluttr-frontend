"use client";

import { useMemo, useRef } from "react";
import { DashboardTableBody, DashboardTableHeader } from "./Elements";
import { extractTitleFromAnnotation } from "@/lib/utils/cubejs.utils";
import { useCubeQueryWrapper } from "@/lib/hooks/cubejs";
import cubeJsApi from "@/lib/cubeJsApi";

function constructColumnDefs(columns) {
  return Object.entries(columns).map(([key, value]) => ({
    id: key,
    accessorFn: (row) => row[key],
    header: <div className="min-w-32">{extractTitleFromAnnotation(value)}</div>,
    cell: (info) => <div className="min-w-32">{info.getValue()}</div>
  }));
}

function DashboardTable({ title, description, query, columnOrder }) {
  const cubejsClient = useRef(cubeJsApi());

  const {
    result: { parsed },
    isLoading,
    error
  } = useCubeQueryWrapper(query, { castNumerics: true, cubeApi: cubejsClient.current });

  const { results, columns } = useMemo(() => {
    return {
      results: parsed.results,
      columns: constructColumnDefs(parsed.columns)
    };
  }, [parsed.results, parsed.columns]);

  if (!results.length) return null;

  return (
    <div className="h-full">
      <DashboardTableHeader title={title} description={description} />
      <DashboardTableBody loading={isLoading} error={error} data={{ results, columns }} />
    </div>
  );
}

export default DashboardTable;
