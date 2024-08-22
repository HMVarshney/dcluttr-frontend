"use client";

import { useEffect, useMemo, useState } from "react";
import { cubejsClient } from "@/lib/cubeJsApi";
import { DashboardTableBody, DashboardTableHeader } from "./Elements";
import { extractTitleFromAnnotation, parseRawLoadResponse } from "@/lib/utils/cubejs.utils";

async function fetchCubejsQuery(query) {
  const response = await cubejsClient.load(query);
  return { raw: response.loadResponse, parsed: parseRawLoadResponse(response.loadResponse) };
}

function DashboardTable({ title, description, query, columnOrder }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState({});

  const columnDefs = useMemo(() => {
    return Object.entries(columns).map(([key, value]) => ({
      id: key,
      accessorFn: (row) => row[key],
      header: <div className="min-w-32">{extractTitleFromAnnotation(value)}</div>,
      cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    }));
  }, [columns]);

  useEffect(() => {
    (async function () {
      setLoading(true);
      try {
        const { parsed } = await fetchCubejsQuery(query);
        setResults(parsed.results);
        setColumns(parsed.columns);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    })();
  }, [query]);

  return (
    <div>
      <DashboardTableHeader title={title} description={description} />
      <DashboardTableBody loading={loading} error={error} data={{ results, columns: columnDefs }} />
    </div>
  );
}

export default DashboardTable;
