"use client"

import React, { useEffect, useMemo, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SquareHalf, Trash } from "phosphor-react"
import { useDispatch } from "react-redux"
import { getCampaignData } from "@/lib/store/features/metaAdsSlice"
import EditTableAttribution from "./EditTableAttribution"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from "react-redux"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"



const columns = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Checkbox
          className=" " />
      )
    },
    cell: ({ row }) => (
      <Checkbox
        className=" " />
    ),
  },
  {
    accessorKey: "id",
    header: "Status",
    cell: ({ row }) => (
      <Switch />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-80"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Campaign
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "purchase_value_sum",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Purchase Value Sum
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    header: 'Ad Spend Sum',
    accessorKey: 'ad_spend_sum'
  },
  {
    header: 'Purchase Sum',
    accessorKey: 'purchase_sum'
  },
  {
    header: 'Impressions Sum',
    accessorKey: 'impressions_sum'
  },
  {
    header: 'Clicks Sum',
    accessorKey: 'clicks_sum'
  },
  {
    header: 'Vtc Sum',
    accessorKey: 'vtc_sum'
  },
  {
    header: 'Ctr',
    accessorKey: 'ctr'
  },
  {
    header: 'Cpc',
    accessorKey: 'cpc'
  },
  {
    header: 'Cpm',
    accessorKey: 'cpm'
  },
  {
    header: 'Roas',
    accessorKey: 'roas'
  },
  {
    header: 'Aov',
    accessorKey: 'aov'
  },
  {
    header: 'Cpa',
    accessorKey: 'cpa'
  }
];
export default function CampaignWiseTable() {
  const isOpen = useSelector((state) => state.user.sideBarClose);
  const { loading, error, data } = useSelector((state) => state.metaAds.campaignData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCampaignData())
  }, [])




  return (
    <div className={cn(' w-[calc(100vw-332px)]', { 'w-[calc(100vw-174px)]': isOpen })}>
      <div className='flex items-center justify-center gap-2 p-6'>
        <div className='mr-auto'>
          <div className='text-xl font-bold'>
            Campaign-wise distribution
          </div>
          <div className='text-[#4F4D55] text-xs'>
            Find all the analytics for store
          </div>
        </div>
        <EditTableAttribution>
          <Button variant="outline" className="px-2.5">
            <SquareHalf className='w-5 h-5' />
          </Button>
        </EditTableAttribution>
      </div>
      <div className="px-6 pb-8 w-full overflow-x-auto">
        <div className="rounded-md border shadow">
          {loading ?
            <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
            : <TableComponents data={data?.results?.[0]?.data} />}
        </div>
      </div>
    </div>
  );
}




export function TableComponents({ data }) {
  const allData = useMemo(() => {
    return data.map(item => {
      const flattenedData = {};
      for (const [key, value] of Object.entries(item)) {
        // Flatten the nested properties into a single level
        flattenedData[key?.replace("google_campaign_stream.", "")?.replace("google_campaign.", "")] = value;
      }
      return flattenedData;
    });
  }, [data]);
  console.log({ allData })

  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})


  const table = useReactTable({
    data: allData,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
  })
  return (
    <Table className="rounded-md bg-white">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
