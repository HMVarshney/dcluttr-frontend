"use client";

import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import cubeJsApi from "@/lib/cubeJsApi";
import { DashboardTableBody, DashboardTableHeader } from "./Elements";
import { shortenKeyNames, splitKeyAndUseLastPart } from "@/lib/utils";
import { replacePlaceholders } from "@/lib/utils/dynamicDashboard.utils";
import { recursivelyAddSubRows } from "@/lib/utils/datatable.utils";
import { DefaultCell, ExpandCell, LinkCell, SwitchCell } from "./Cells";
import { DynamicDashboardContext } from "@/lib/context/DynamicDashboard/DynamicDashboardContext";
import { dynamicDashboardActions } from "@/lib/context/DynamicDashboard/DynamicDashboardActions";

function getColumnCell(rawColumn) {
  if (rawColumn.meta?.switchEnabled) {
    return SwitchCell;
  }
  if (rawColumn.meta?.readableId) {
    return LinkCell;
  }
  return DefaultCell;
}

function constructColumnDefs(columns, expandHandler) {
  const columnDefs = columns.reduce((prev, c) => {
    const splitKey = splitKeyAndUseLastPart(c.key);
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
      cell: ({ row }) => ExpandCell({ row, expandHandler })
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
    if (!columnVisibilityMap[col.key]) {
      columnVisibilityMap[col.key] = false;
    }
  });
  return columnVisibilityMap;
}

function DashboardTable({ id: cardId, title, description, query, drilldownQueries }) {
  const cubejsClient = useRef(cubeJsApi());

  const { state, dispatch } = useContext(DynamicDashboardContext);

  const { cardCustomizableProps } = state;

  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  const { isLoading, error, resultSet } = useCubeQuery(query, {
    castNumerics: true,
    cubeApi: cubejsClient.current,
    skip: !query
  });

  const setColumnOrdering = (newOrdering) => {
    dynamicDashboardActions.updateCardProps(dispatch)(cardId, { columnOrder: newOrdering });
  };

  const columnVisibility = useMemo(() => {
    if (!cardCustomizableProps[cardId]) return {};
    return constructColumnVisibilityMap(columns, cardCustomizableProps[cardId].columnOrder);
  }, [cardCustomizableProps, cardId, columns]);

  const fetchDrilldownData = async (query, rowId) => {
    const drilldownResults = await cubejsClient.current.load(query, { castNumerics: true });
    setResults((cur) => recursivelyAddSubRows(cur, rowId, drilldownResults.tablePivot()));
  };

  const changeColumnVisibile = (id, visibility) => {
    let newColumnOrder;
    if (visibility) {
      newColumnOrder = [...cardCustomizableProps[cardId].columnOrder];
      newColumnOrder.push(id);
    } else {
      newColumnOrder = cardCustomizableProps[cardId].columnOrder.filter((c) => c !== id);
    }
    setColumnOrdering(newColumnOrder);
  };

  const expandHandler = useCallback(
    (row) => {
      const isRowExpanded = row.getIsExpanded();
      row.getToggleExpandedHandler()();
      // If previously row was not expanded
      if (!isRowExpanded) {
        let drilldownQuery = drilldownQueries.find((dq) => dq.position === row.depth + 1);
        if (drilldownQuery) {
          drilldownQuery = replacePlaceholders(JSON.parse(drilldownQuery.query), {
            time_dimension_date_range_from: "2024-08-01",
            time_dimension_date_range_to: "2024-08-30",
            filter_values: [row.original.id]
          });
          fetchDrilldownData(drilldownQuery, row.original.id);
        }
      }
    },
    [drilldownQueries]
  );

  useEffect(() => {
    if (!resultSet) return;

    const rawColumns = resultSet.tableColumns().filter((c) => {
      if (splitKeyAndUseLastPart(c.key) === "id" || c.format === "link") return false;
      return true;
    });
    setResults(shortenKeyNames(resultSet.tablePivot()));
    setColumns(rawColumns);
    setColumnDefs(constructColumnDefs(rawColumns, drilldownQueries.length ? expandHandler : null));
  }, [drilldownQueries.length, expandHandler, resultSet]);

  return (
    <div className="h-full">
      <DashboardTableHeader
        title={title}
        description={description}
        columns={columns}
        columnVisibility={columnVisibility}
        columnOrder={cardCustomizableProps?.[cardId]?.columnOrder || []}
        setColumnVisibility={changeColumnVisibile}
        setColumnOrdering={setColumnOrdering}
      />
      <DashboardTableBody
        loading={isLoading}
        error={error}
        data={{ results, columns: columnDefs }}
        columnOrder={cardCustomizableProps?.[cardId]?.columnOrder || []}
        columnVisibility={columnVisibility}
        getRowCanExpand={(row) => row.depth < drilldownQueries.length}
      />
    </div>
  );
}

export default DashboardTable;
