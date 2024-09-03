import { shortenKeyNames } from "../utils";

export function getAccessorFunction(keyName) {
  return function ({ row }) {
    return row[keyName];
  };
}

export function recursivelyAddSubRows(rows, targetRowId, newSubRows, currentDepth = 1) {
  return rows.map((row) => {
    if (row.id === targetRowId) {
      row.subRows = shortenKeyNames(newSubRows);
    }
    if (row.subRows?.length) {
      row.subRows = recursivelyAddSubRows(row.subRows, targetRowId, newSubRows, currentDepth + 1);
    }
    return row;
  });
}
