"use client";

import { ArrowSquareOut, CirclesFour, SquareHalf } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { memo, useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatTableNumber } from "@/lib/utils";
import EditTableAttribution from "../../performance/_components/EditTableAttribution";
import { ArrowUpDown, GalleryHorizontal, LineChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ExportFileFormat from "@/components/ExportFileFormat";
import { updateInsightsPopUp, updateTableView } from "@/lib/store/features/creativeSlice";
import Hint from "@/components/Hint";
// console.error = (...args) => {
//   if (/defaultProps/.test(args[0])) return;
//   // console.log(...args);
// };
const COLORS = [
  { code: "#6D4FED", className: "checked:bg-[#6D4FED] checked:hover:bg-[#6D4FED]" },
  { code: "#EA6153", className: "checked:bg-[#EA6153] checked:hover:bg-[#EA6153]" },
  { code: "#F7C245", className: "checked:bg-[#F7C245] checked:hover:bg-[#F7C245]" },
  { code: "#E07BC7", className: "checked:bg-[#E07BC7] checked:hover:bg-[#E07BC7]" },
  { code: "#288FAE", className: "checked:bg-[#288FAE] checked:hover:bg-[#288FAE]" }
];

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
  const dispatch = useDispatch();
  const columns = useMemo(() => {
    return Object.entries(annotation.measures ?? {}).map(([key, value]) => ({
      accessorKey: key,
      header: (
        <div className="min-w-20 whitespace-nowrap text-center">
          <Hint label={value.title}>
            <span className="cursor-pointer">{value.shortTitle}</span>
          </Hint>
        </div>
      ),
      cell: (info) => {
        return (
          <div className="min-w-20 text-center">
            {value.type === "number" ? formatTableNumber(info.getValue()) : info.getValue()}
          </div>
        );
      }
    }));
  }, [annotation]);

  const transformedData = useMemo(() => data, [data]);

  // const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: transformedData || [],
    columns: [
      {
        accessorKey: "meta_ads_name",
        header: () => (
          <div className="w- flex items-center justify-start text-sm gap-3">
            <LineChart className="w-5 h-5" />
            Status
          </div>
        ),
        cell: ({ row, getValue }) => (
          <div className="flex items-center gap-4 group">
            <CheckBox
              className={COLORS[row.index % COLORS.length].className}
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
            <div className="w-3 h-3 rounded-full bg-primary mx-auto border-2 border-green/80" />
          </div>
        )
      },
      {
        accessorKey: "meta_ads_name",
        header: ({ table, column }) => (
          <div className="flex items-center gap-4">
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
          <div className="flex items-center gap-4 group">
            <div
              className={cn("w-72 flex items-center gap-2", { "pl-4": row.depth === 1 }, { "pl-8": row.depth === 2 })}
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" }
              }}
            >
              <Image
                src={`/temp/creative_p${Math.floor(Math.random() * 3)}.png`}
                alt={row.getValue("meta_ads_name")}
                width={24}
                height={24}
                className="rounded"
              />
              <Hint label={row.getValue("meta_ads_name")}>
                <span
                  className="line-clamp-1 text-primary font-semibold"
                  onClick={() => dispatch(updateInsightsPopUp({ isOpen: true, data: row.original }))}
                >
                  {row.getValue("meta_ads_name")}
                </span>
              </Hint>
              <Link href={row.original.url ?? "#"} target="_blank" className=" opacity-0 group-hover:opacity-100">
                <ArrowSquareOut size={20} className="text-primary font-semibold cursor-pointer" />
              </Link>
            </div>
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
  const [checked, setChecked] = useState(false);
  return (
    <div className="grid grid-cols-4 grid-flow-row gap-4">
      {data?.map((ele, i) => (
        <div
          key={ele.id}
          data={ele}
          className="group cursor-pointer relative w-full border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-xl bg-white overflow-hidden"
        >
          <div className="relative">
            <Image
              src={`/temp/creative_p${i % 3}.png`}
              alt={ele.name}
              width={308}
              height={200}
              className="w-full object-contain border-b"
            />
            <div className="absolute bottom-2 left-2 p-2 bg-[#2020203f] text-white rounded-sm text-sm font-semibold transition-all flex items-center gap-1">
              <GalleryHorizontal size={16} />
              Carousel
            </div>
          </div>
          <div className="absolute top-2 right-2 transition-all opacity-0 group-hover:opacity-100">
            <CheckBox checked={checked} onChange={() => setChecked(!checked)} className={COLORS[i % COLORS.length].className} />
          </div>
          <div className="flex items-center gap-3 m-3 mt-5">
            <div className="h-2 w-2 min-w-2 rounded-full bg-primary" />
            <div className="text-sm font-medium line-clamp-1">{ele.meta_ads_name}</div>
          </div>
          <div className="grid grid-cols-2 gap-3 my-2 mx-3">
            <div className="bg-primary/15 border-s-2 border-primary rounded-sm px-3 py-3.5 flex justify-between">
              <div className="text-sm font-normal">ROAS</div>
              <div className="text-sm font-medium">1.52</div>
            </div>
            <div className="bg-primary/15 border-s-2 border-primary rounded-sm px-3 py-3.5 flex justify-between">
              <div className="text-sm font-normal">CV</div>
              <div className="text-sm font-medium">4.34</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 mx-3">
            <div className="text-sm font-normal">Spend: </div>
            <div className="px-2 py-1.5 bg-[#1122110A] rounded-sm text-sm font-medium">₹30,503.70</div>
          </div>
          <div className="flex justify-between items-center m-3">
            <div className="text-sm font-normal">Purchase Value: </div>
            <div className="px-2 py-1.5 bg-[#1122110A] rounded-sm text-sm font-medium">₹1,089.42</div>
          </div>
          <div className="flex justify-between items-center m-3">
            <div className="text-sm font-normal">Ad set: </div>
            <div className="px-2 py-1.5 bg-[#1122110A] rounded-sm text-sm font-medium">12.04</div>
          </div>
          <div className="flex justify-between items-center m-3">
            <div className="text-sm font-normal">CTR: </div>
            <div className="px-2 py-1.5 bg-[#1122110A] rounded-sm text-sm font-medium">4.6%</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CheckBox({ className, checked, onChange }) {
  return (
    <div className="inline-flex items-center">
      <label className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          checked={checked}
          className={cn(
            "peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow-none border border-[#CDD1D0] ",
            className
          )}
          id="check4"
          onChange={onChange}
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
    </div>
  );
}
