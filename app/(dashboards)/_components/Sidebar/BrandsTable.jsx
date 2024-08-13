"use client";

import React, { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import moment from "moment";
import { GearSix } from "phosphor-react";

export const columns = [
  {
    accessorKey: "brandName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Shop Name
          <ArrowDown className={cn(" h-4 w-4", { "rotate-180": column.getIsSorted() === "asc" })} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-sm ">{row.getValue("brandName")}</div>;
    }
  },
  {
    accessorKey: "brandWebSite",
    header: "Shop Admin Site",
    cell: ({ row }) => (
      <div className="bg-[#E6F1EB] px-3 py-1 rounded-md flex gap-2">
        <Image src="/band-logo/shopify.png" alt="shopAdmin" width={20} height={16} className="w-4 object-contain" />
        <div className="text-sm text-primary underline">{row.getValue("brandWebSite")}</div>
      </div>
    )
  },
  {
    accessorKey: "createdOn",
    header: "Connected On",
    cell: ({ row }) => <div className="capitalize">{moment(row.getValue("createdOn")).format("DD MMM, YYYY")}</div>
  },
  {
    accessorKey: "createdOn",
    header: "Dcluttr Sessions",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <GearSix size={20} />
      </div>
    )
  }
];

export default function BrandsTable({ brandsList }) {
  const data = useMemo(() => brandsList, [brandsList]);
  console.log(data);
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      rowSelection
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection
  });

  return (
    <div className="mt-4 rounded-md border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
      <Table className="rounded-md bg-white">
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
    </div>
  );
}
