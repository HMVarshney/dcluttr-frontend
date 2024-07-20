"use client"

import React, { Children, Fragment, useEffect, useMemo, useState } from "react"
import {
    flexRender,
    getCoreRowModel,
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

export default function AdSetsTable({ data, columns, children, openAdSets }) {
    const allColumns = useMemo(() => columns, [columns]);
    const allData = useMemo(() => data, [data]);
    console.log({ allData })

    const [sorting, setSorting] = useState([])
    const [rowSelection, setRowSelection] = useState({})


    const table = useReactTable({
        data: allData,
        columns: allColumns,
        state: {
            sorting,
            rowSelection,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
    })
    return (
        <Table className="rounded-md bg-white">
            {/* <TableHeader>
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
            </TableHeader> */}
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (<Fragment key={row.id}>
                        <TableRow
                            data-state={row.getIsSelected() && "selected"}
                            className="bg-[#e5ede983] hover:bg-[#e5ede9c1]"
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
                        {openAdSets === row.id &&
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    {children}
                                </TableCell>
                            </TableRow>}
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
