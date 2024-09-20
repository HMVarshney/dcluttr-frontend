"use client";

import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import cubeJsApi from "@/lib/cubeJsApi";
import { DashboardTableBody, DashboardTableHeader } from "./Elements";
import { shortenKeyNames, splitKeyAndUseLastPart } from "@/lib/utils";
import { getCardDatatableProperties, replacePlaceholders } from "@/lib/utils/dynamicDashboard.utils";
import { recursivelyAddSubRows } from "@/lib/utils/datatable.utils";
import { CheckboxCell, CheckboxHeader, DefaultCell, NameAndLinkCell, SwitchCell } from "./Cells";
import { DynamicDashboardContext } from "@/lib/context/DynamicDashboard/DynamicDashboardContext";
import { dynamicDashboardActions } from "@/lib/context/DynamicDashboard/DynamicDashboardActions";
import Hint from "@/components/Hint";

function getColumnCell(rawColumn, expandHandler) {
  if (rawColumn.meta?.switchEnabled) {
    return SwitchCell;
  }
  if (rawColumn.meta?.readableId) {
    return (props) => <NameAndLinkCell {...props} expandHandler={expandHandler} />;
  }
  return DefaultCell;
}

function constructColumnDefs(columns, expandHandler, isSelectable) {
  const columnDefs = columns.reduce((prev, c) => {
    const splitKey = splitKeyAndUseLastPart(c.key);
    prev.push({
      id: c.key?.includes("name") ? "name" : c.key,
      accessorFn: (row) => row[splitKey],
      header: (
        <Hint label={c.title}>
          <div className="whitespace-nowrap cursor-pointer">{c.shortTitle}</div>
        </Hint>
      ),
      cell: getColumnCell(c, expandHandler)
    });
    return prev;
  }, []);

  columnDefs.unshift({
    id: "selection-checkbox",
    cell: ({ row }) => <CheckboxCell row={row} />,
    header: ({ table }) => <CheckboxHeader table={table} />
  });

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

function DashboardTable({ id: cardId, title, description, query, drilldownQueries, isSelectable }) {
  const cubejsClient = useRef(cubeJsApi());
  const idColumnKey = useRef(null);

  const { state, dispatch } = useContext(DynamicDashboardContext);

  const { cardCustomizableProps, selected } = state;

  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  const { isLoading, error, resultSet } = useCubeQuery(query, {
    castNumerics: true,
    cubeApi: cubejsClient.current,
    skip: !query
  });

  const columnVisibility = useMemo(() => {
    if (!cardCustomizableProps[cardId]) return {};

    return constructColumnVisibilityMap(columns, getCardDatatableProperties(cardCustomizableProps[cardId]).columnOrder);
  }, [cardCustomizableProps, cardId, columns]);

  const setColumnOrdering = (newOrdering) => {
    dynamicDashboardActions.updateCardProps(dispatch)(cardId, {
      datatableProperties: { ...cardCustomizableProps[cardId].datatableProperties, columnOrder: newOrdering }
    });
  };

  const fetchDrilldownData = async (query, rowId) => {
    const drilldownResults = await cubejsClient.current.load(query, { castNumerics: true });
    setResults((cur) => recursivelyAddSubRows(cur, rowId, drilldownResults.tablePivot()));
  };

  const changeColumnVisibile = (id, visibility) => {
    let newColumnOrder;
    if (visibility) {
      newColumnOrder = [...getCardDatatableProperties(cardCustomizableProps[cardId]).columnOrder];
      newColumnOrder.push(id);
    } else {
      newColumnOrder = getCardDatatableProperties(cardCustomizableProps[cardId]).columnOrder.filter((c) => c !== id);
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

  const selectHandler = useCallback(
    (updaterFn) => {
      const selectedIds = updaterFn(selected.ids);
      if (!Object.keys(selectedIds).length) {
        dynamicDashboardActions.clearSelected(dispatch)();
      } else {
        dynamicDashboardActions.setSelected(dispatch)(cardId, query, idColumnKey.current, selectedIds);
      }
    },
    [cardId, dispatch, query, selected.ids]
  );

  useEffect(() => {
    if (!resultSet) return;

    const rawColumns = resultSet.tableColumns().filter((c) => {
      const splitKey = splitKeyAndUseLastPart(c.key);
      // Store the id column key name to be used later
      if (splitKey === "id") {
        idColumnKey.current = c.key;
      }

      if (splitKey === "id" || c.format === "link") return false;
      return true;
    });
    setResults(shortenKeyNames(resultSet.tablePivot()));
    setColumns(rawColumns);
    setColumnDefs(constructColumnDefs(rawColumns, drilldownQueries.length ? expandHandler : null, isSelectable));
  }, [drilldownQueries.length, expandHandler, resultSet]);

  return (
    <div className="h-full">
      <DashboardTableHeader
        title={title}
        description={description}
        columns={columns}
        columnVisibility={columnVisibility}
        columnOrder={getCardDatatableProperties(cardCustomizableProps[cardId]).columnOrder}
        setColumnVisibility={changeColumnVisibile}
        setColumnOrdering={setColumnOrdering}
      />
      <DashboardTableBody
        loading={isLoading}
        error={error}
        data={{ results, columns: columnDefs }}
        columnOrder={getCardDatatableProperties(cardCustomizableProps[cardId]).columnOrder}
        columnVisibility={columnVisibility}
        getRowCanExpand={(row) => row.depth < drilldownQueries.length}
        rowSelection={selected.ids}
        setRowSelection={selectHandler}
      />
    </div>
  );
}

export default DashboardTable;
