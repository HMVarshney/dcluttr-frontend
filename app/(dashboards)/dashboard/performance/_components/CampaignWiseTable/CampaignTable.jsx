"use client"

import React, { Children, Fragment, useEffect, useMemo, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";

const getCommonPinningStyles = (data) => {
  console.log(data);
  const { column } = data
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-1px 0 1px -1px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left') - (column.id === 'name' ? 48 : 0)}px` : undefined,
    // right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 1 : 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    background: 'white',
    // backdropFilter: 'blur(100px)',
    // WebkitBackdropFilter: 'blur(100px)',
  }
}

export default function CampaignTable({ data, columns, children }) {
  const allColumns = useMemo(() => columns, [columns]);
  const allData = useMemo(() => data, [data]);
  console.log({ allData })

  const [sorting, setSorting] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const [expanded, setExpanded] = useState({})


  const table = useReactTable({
    data: allData,
    columns: allColumns,
    state: {
      sorting,
      rowSelection,
      expanded,
      columnPinning: {
        left: ['id', 'name'],
      },
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
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
                <TableHead key={header.id}
                  style={{ ...getCommonPinningStyles(header) }}>
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
          table.getRowModel().rows.map((row) => (<Fragment key={row.id}>
            <TableRow
              data-state={row.getIsSelected() && "selected"}
              className={cn(
                { "bg-[#e5ede93a] hover:bg-[#e5ede9a8]": row.depth === 1 },
                { "bg-[#e5ede9a8] hover:bg-[#e5ede9c6]": row.depth === 2 },
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}
                  style={{ ...getCommonPinningStyles(cell) }}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          </Fragment>))
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
