import { useCubeQuery } from "@cubejs-client/react";
import { useMemo } from "react";
import { parseRawLoadResponse } from "../utils/cubejs.utils";

export function useCubeQueryWrapper(query, options) {
  const { resultSet, isLoading, error } = useCubeQuery(query, options);

  const parsedLoadResponse = useMemo(() => {
    if (!resultSet) return { results: [], annotation: {}, columns: {} };
    return parseRawLoadResponse(resultSet.loadResponse);
  }, [resultSet]);

  return { isLoading, error, result: { raw: resultSet?.loadResponse || {}, parsed: parsedLoadResponse } };
}
