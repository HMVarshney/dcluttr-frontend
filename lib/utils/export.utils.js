import { json2csv } from "json-2-csv";
import { downloadBlob } from "./request.utils";

export function exportCSV(data, { keys }, filename) {
  const csvString = json2csv(data, { keys });
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, filename);
}
