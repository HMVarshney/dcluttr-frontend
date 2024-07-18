"use client"

import { SquareHalf } from "phosphor-react"
import EditTableAttribution from "./EditTableAttribution"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { ArrowUpDown } from "lucide-react"


export const columns = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Switch />
    ),
  },
  {
    accessorKey: "campaign",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Campaign
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Button variant="secondary" className="w-40 p-0 bg-white">
          {row.getValue("campaign")}
        </Button>
      )
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="capitalize">{row.original?.organizationRole?.name}</div>
    ),
  },
  {
    accessorKey: "id",
    header: "Settings",
    cell: ({ row }) => {
      return (
        <Button variant="secondary" className="w-40 p-0 bg-white">
          Modify User Access
        </Button>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button variant="secondary" className="w-40 p-0 bg-white">
          Modify User Access
        </Button>
      )
    },
  },
]


export default function CampaignWiseTable({ usersList = [] }) {
  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: usersList,
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
    <div>
      <div className='flex items-center justify-center gap-2 p-6 '>
        <div className='mr-auto'>
          <div className=' text-xl font-bold'>
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
      <div className="px-6 pb-8">
        <h3 className='text-xl font-bold mt-4'>
          Members
        </h3>
        <p className='text-xs mt-1 mb-6 text-[#4F4D55]'>
          Find all the brand for store
        </p>
        <div className="rounded-md border shadow">
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
        </div>
      </div>
    </div>
  )
}
