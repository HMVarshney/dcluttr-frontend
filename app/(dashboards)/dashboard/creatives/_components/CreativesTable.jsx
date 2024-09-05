"use client";

import { ArrowSquareOut, CirclesFour, SquareHalf } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { memo, useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import EditTableAttribution from "../../performance/_components/EditTableAttribution";
import { Switch } from "@/components/ui/switch";
import IndeterminateCheckbox from "@/components/IndeterminateCheckbox";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ExportFileFormat from "@/components/ExportFileFormat";
import { updateTableView } from "@/lib/store/features/creativeSlice";

export default function CreativesTable({ data, isLoading, annotation }) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.user.sideBarClose);
  const isTableView = useSelector((state) => state.creative.isTableView);

  return (
    <div className={cn(" w-[calc(100vw-332px)]", { "w-[calc(100vw-174px)]": isOpen })}>
      <div className="flex items-center justify-center gap-2 p-6">
        <Select>
          <SelectTrigger className="w-[140px] ">
            <SelectValue placeholder="Sort By: ROAS" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="O-1">ROAS</SelectItem>
            <SelectItem value="O-2">Click sum</SelectItem>
            <SelectItem value="O-3">Pucha</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Descending" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="O-1">Ascending</SelectItem>
            <SelectItem value="O-2">Descending</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1"></div>
        <Button variant={isTableView ? "default" : "outline"} className="px-2.5">
          <SquareHalf className="w-5 h-5 rotate-90" onClick={() => dispatch(updateTableView(true))} />
        </Button>
        <Button variant={!isTableView ? "default" : "outline"} className="px-2.5">
          <CirclesFour className="w-5 h-5" weight="fill" onClick={() => dispatch(updateTableView(false))} />
        </Button>
        <EditTableAttribution>
          <Button variant="outline" className="px-2.5">
            <SquareHalf className="w-5 h-5" />
          </Button>
        </EditTableAttribution>
        <ExportFileFormat variant="outline" />
      </div>
      <div className="px-6 pb-8 w-full overflow-x-auto">
        {isLoading ? (
          <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg max-w-full overflow-x-auto relative">
            <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
          </div>
        ) : isTableView ? (
          <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg max-w-full overflow-x-auto relative">
            <Tables annotation={annotation} data={data} />
          </div>
        ) : (
          <CreativesCard annotation={annotation} data={data} />
        )}
      </div>
    </div>
  );
}

export function Tables({ annotation = {}, data = [] }) {
  const columns = useMemo(() => {
    return Object.entries(annotation.measures ?? {}).map(([key, value]) => ({
      accessorKey: key,
      header: <div className="min-w-32 whitespace-nowrap">{value.shortTitle || value.title}</div>,
      cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    }));
  }, [annotation]);

  const transformedData = useMemo(() => data, [data]);

  // const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: transformedData || [],
    columns: [
      {
        accessorKey: "name",
        header: ({ table, column }) => (
          <div className="flex items-center gap-4">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler()
              }}
            />
            <div
              className="w-72 flex items-center justify-start text-sm"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Product
              <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
            </div>
          </div>
        ),
        cell: ({ row, getValue }) => (
          <div className="flex items-center gap-4">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
            <div
              className={cn("w-72 flex items-center gap-2", { "pl-4": row.depth === 1 }, { "pl-8": row.depth === 2 })}
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" }
              }}
            >
              <Image
                src={`/temp/creative_p${Math.floor(Math.random() * 3)}.png`}
                alt={row.getValue("name")}
                width={24}
                height={24}
                className="rounded-xl"
              />
              <span className="line-clamp-1 text-primary font-semibold ">{row.getValue("name")}</span>
            </div>
            <Link href={row.original.url ?? "#"} target="_blank">
              <ArrowSquareOut size={20} className="text-primary font-semibold cursor-pointer" />
            </Link>
          </div>
        )
        // footer: props => props.column.id,
      },
      ...columns
    ],
    state: {
      // sorting,
    },
    // onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel()
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
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

export function CreativesCard({ data }) {
  return (
    <div className="grid grid-cols-4 grid-flow-row gap-4">
      {data?.map((ele, i) => (
        <div
          key={ele.id}
          data={ele}
          className="w-full border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-xl bg-white overflow-hidden"
        >
          <Image src={`/temp/creative_p${i % 3}.png`} alt={ele.name} width={308} height={200} className="w-full object-contain" />

          <div className="text-sm font-semibold mx-3 my-6 line-clamp-1 pr-2">{ele.name}</div>
          <div className="grid grid-cols-2 gap-3 my-2 mx-3">
            <div className="bg-primary/15 border-s-2 border-primary rounded-sm px-3 py-3.5 flex justify-between">
              <div className="text-sm font-semibold">ROAS</div>
              <div className="text-sm font-medium">1.52</div>
            </div>
            <div className="bg-primary/15 border-s-2 border-primary rounded-sm px-3 py-3.5 flex justify-between">
              <div className="text-sm font-semibold">CV</div>
              <div className="text-sm font-medium">4.34</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 mx-3">
            <div className="text-sm font-semibold w-1/3">Spend: </div>
            <div className="p-2 w-2/3 bg-[#1122110A] rounded-sm text-sm font-medium">₹30,503.70</div>
          </div>
          <div className="flex justify-between items-center m-3">
            <div className="text-sm font-semibold w-1/3">Purchase Value: </div>
            <div className="p-2 w-2/3 bg-[#1122110A] rounded-sm text-sm font-medium">₹1,089.42</div>
          </div>
          <div className="flex justify-between items-center m-3">
            <div className="text-sm font-semibold w-1/3">Ad set: </div>
            <div className="p-2 w-2/3 bg-[#1122110A] rounded-sm text-sm font-medium">12.04</div>
          </div>
          <div className="flex justify-between items-center m-3">
            <div className="text-sm font-semibold w-1/3">CTR: 4.6%</div>
            <div className="p-2 w-2/3 bg-[#1122110A] rounded-sm text-sm font-medium">4.6%</div>
          </div>
        </div>
      ))}
    </div>
  );
}
