/* eslint-disable react/display-name */
"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import { ArrowSquareOut, CaretDown, CaretRight } from "phosphor-react";
import cubeJsApi from "@/lib/cubeJsApi";
import { DashboardTableBody, DashboardTableHeader } from "./Elements";
import { cn, shortenKeyNames, splitKeyAndUseLastPart } from "@/lib/utils";
import { replacePlaceholders } from "@/lib/utils/dynamicDashboard.utils";
import { recursivelyAddSubRows } from "@/lib/utils/datatable.utils";
import { Switch } from "@/components/ui/switch";

function getColumnCell(rawColumn) {
  if (rawColumn.meta?.switchEnabled) {
    return ({ getValue }) => (
      <div className="flex items-center justify-center w-20">
        <Switch checked={getValue() === "ACTIVE"} />
      </div>
    );
  }
  if (rawColumn.meta?.readableId) {
    return ({ row, getValue }) => (
      <div className="flex items-center gap-4">
        <div className="min-w-32">
          <span className="line-clamp-1 text-primary font-semibold ">{getValue()}</span>
        </div>
        {row.original.link && (
          <Link href={row.original.link} target="_blank">
            <ArrowSquareOut size={20} className="text-primary font-semibold cursor-pointer" />
          </Link>
        )}
      </div>
    );
  }
  return ({ getValue }) => <div className="min-w-32">{getValue()}</div>;
}

function constructColumnDefs(columns, expandHandler) {
  const columnDefs = columns.reduce((prev, c) => {
    const splitKey = splitKeyAndUseLastPart(c.key);

    if (c.splitKey === "id" || c.format === "link") return prev;

    prev.push({
      id: c.key,
      accessorFn: (row) => row[splitKey],
      header: <div className="min-w-32">{c.shortTitle}</div>,
      cell: getColumnCell(c)
    });
    return prev;
  }, []);

  if (expandHandler) {
    columnDefs.unshift({
      id: "expand-button",
      cell: ({ row }) => (
        <div
          className={cn({ "pl-4": row.depth === 1 }, { "pl-8": row.depth === 2 })}
          onClick={() => expandHandler(row)}
          style={{ cursor: "pointer" }}
        >
          {row.getCanExpand() ? (
            row.getIsExpanded() ? (
              <CaretDown className="min-w-4" />
            ) : (
              <CaretRight className="min-w-4" />
            )
          ) : null}
        </div>
      )
    });
  }

  return columnDefs;
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

function DashboardTable({ title, description, query, columnOrder, drilldownQueries }) {
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

  const fetchDrilldownData = async (query, rowId) => {
    const drilldownResults = await cubejsClient.current.load(query, { castNumerics: true });
    setResults((cur) => recursivelyAddSubRows(cur, rowId, drilldownResults.tablePivot()));
  };

  const changeColumnVisibile = (id, visibility) => {
    setColumnVisibility((cur) => ({ ...cur, [id]: visibility }));
  };

  const expandHandler = useCallback(
    (row) => {
      row.getToggleExpandedHandler()();
      let drilldownQuery = drilldownQueries.find((dq) => dq.position === row.depth + 1);
      if (drilldownQuery) {
        drilldownQuery = replacePlaceholders(JSON.parse(drilldownQuery.query), {
          time_dimension_date_range_from: "2024-08-01",
          time_dimension_date_range_to: "2024-08-30",
          filter_values: [row.id]
        });
        fetchDrilldownData(drilldownQuery, row.id);
      }
    },
    [drilldownQueries]
  );

  useEffect(() => {
    if (!resultSet) return;

    const rawColumns = resultSet.tableColumns();
    setResults(shortenKeyNames(resultSet.tablePivot()));
    setColumns(rawColumns);
    setColumnDefs(constructColumnDefs(rawColumns, drilldownQueries.length ? expandHandler : null));
    setColumnVisibility(constructColumnVisibilityMap(rawColumns, columnOrder));
    setColumnOrdering([...(drilldownQueries.length ? ["expand-button"] : []), ...columnOrder]);
  }, [columnOrder, drilldownQueries.length, expandHandler, resultSet]);

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
        getRowCanExpand={(row) => row.depth < drilldownQueries.length}
      />
    </div>
  );
}

export default DashboardTable;
