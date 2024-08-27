"use client";

import { SquareHalf } from "phosphor-react";
import EditTableAttribution from "./EditTableAttribution";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMemo } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { exportCSV } from "@/lib/utils/export.utils";
import ExportButton from "@/components/ExportButton";

function exportAdPlacementTable(data, annotation) {
  const keys = [
    ...Object.entries(annotation.measures).map(([keyName, value]) => ({
      field: keyName,
      title: value.shortTitle || value.title
    })),
    ...Object.entries(annotation.dimensions).map(([keyName, value]) => ({
      field: keyName,
      value: value.shortTitle || value.title
    }))
  ];
  exportCSV(data, { keys }, "ad_placement.csv");
}

export default function AdPlacementTable({ isGoogle = false }) {
  const isOpen = useSelector((state) => state.user.sideBarClose);
  const { adsPlacementMetaLoading, adsPlacementMetaError, adsPlacementMetaData } = useSelector((state) => state.metaAds);

  const annotation = adsPlacementMetaData.parsed?.columns || {};
  const data = adsPlacementMetaData.parsed?.results || [];

  return (
    <div className={cn(" w-[calc(100vw-332px)]", { "w-[calc(100vw-174px)]": isOpen })}>
      <div className="flex items-center justify-center gap-2 p-6">
        <div className="mr-auto">
          <div className="text-xl font-bold">Ad Placement</div>
          <div className="text-[#4F4D55] text-xs">Find all the analytics for store</div>
        </div>
        <div>
          <ExportButton onExport={() => exportAdPlacementTable(data, annotation)} />
        </div>
        <EditTableAttribution>
          <Button variant="outline" className="px-2.5">
            <SquareHalf className="w-5 h-5" />
          </Button>
        </EditTableAttribution>
      </div>
      <div className="px-6 pb-8 w-full overflow-x-auto">
        <div className="rounded-md border shadow max-w-full overflow-x-auto relative">
          {adsPlacementMetaLoading ? (
            <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
          ) : adsPlacementMetaError ? (
            <div className="text-destructive p-4 shadow-sm">{adsPlacementMetaError}</div>
          ) : (
            <Tables annotation={annotation} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}

export function Tables({ annotation = {}, data = [] }) {
  const columns = useMemo(() => {
    return Object.entries(annotation.measures ?? {}).map(([key, value]) => ({
      accessorKey: key,
      header: <div className="min-w-32">{value.shortTitle || value.title}</div>,
      cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    }));
  }, [annotation]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Table className="rounded-md bg-white text-sm">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
