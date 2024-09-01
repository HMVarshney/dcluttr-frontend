"use client";

import { useEffect, useRef, useState } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import cubeJsApi from "@/lib/cubeJsApi";
import { DashboardTableBody, DashboardTableHeader } from "./Elements";

function constructColumnDefs(columns) {
  return columns.map((c) => ({
    id: c.key,
    accessorFn: (row) => row[c.key],
    header: <div className="min-w-32">{c.shortTitle}</div>,
    cell: (info) => <div className="min-w-32">{info.getValue()}</div>
  }));
}

function constructColumnVisibilityMap(columns, columnOrder) {
  if (!columns.length) return {};

  const columnVisibilityMap = columnOrder.reduce((prev, cur) => {
    prev[cur] = true;
    return prev;
  }, {});
  columns.forEach((col) => {
    if (!columnVisibilityMap[col.id]) {
      columnVisibilityMap[col.id] = false;
    }
  });
  return columnVisibilityMap;
}

function DashboardTable({ title, description, query, columnOrder }) {
  const cubejsClient = useRef(cubeJsApi());

  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnOrdering, setColumnOrdering] = useState([]);

  const { isLoading, error, resultSet } = useCubeQuery(query, {
    castNumerics: true,
    cubeApi: cubejsClient.current,
    skip: !query
  });

  const changeColumnVisibile = (id, visibility) => {
    setColumnVisibility((cur) => ({ ...cur, [id]: visibility }));
  };

  useEffect(() => {
    if (!resultSet) return;

    const rawColumns = resultSet.tableColumns();
    setResults(resultSet.tablePivot());
    setColumns(rawColumns);
    setColumnDefs(constructColumnDefs(rawColumns));
    setColumnVisibility(constructColumnVisibilityMap(rawColumns, columnOrder));
    setColumnOrdering(columnOrder);
  }, [columnOrder, resultSet]);

  return (
    <div className="h-full">
      <DashboardTableHeader
        title={title}
        description={description}
        columns={columns}
        columnVisibility={columnVisibility}
        columnOrder={columnOrdering}
        setColumnVisibility={changeColumnVisibile}
        setColumnOrdering={setColumnOrdering}
      />
      <DashboardTableBody
        loading={isLoading}
        error={error}
        data={{ results, columns: columnDefs }}
        columnOrder={columnOrdering}
        columnVisibility={columnVisibility}
      />
    </div>
  );
}

export default DashboardTable;
