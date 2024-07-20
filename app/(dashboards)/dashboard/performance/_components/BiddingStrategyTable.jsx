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
import { memo, useEffect, useState } from "react"
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    useExpanded
} from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { ArrowUpDown } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getBiddingStrategy } from "@/lib/store/features/metaAdsSlice"

export const columns = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Checkbox className="sticky left-0 bg-white z-10" />
            )
        },
        cell: ({ row }) => (
            <Checkbox className="sticky left-0 bg-white z-10" />
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <div className="capitalize">{row.original?.organizationRole?.name}</div>
        ),
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

function BiddingStrategyTable({ }) {
    const { loading, error, data } = useSelector((state) => state.metaAds.biddingStrategy)
    console.log({ loading, error, data });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBiddingStrategy())
    }, [])
    const [sorting, setSorting] = useState([])

    const table = useReactTable({
        data: [],
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className=" ">
            <div className='flex items-center justify-center gap-2 p-6'>
                <div className='mr-auto'>
                    <div className='text-xl font-bold'>
                        Bidding Strategy
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
            <div className="px-6 pb-8 ">
                <div className="rounded-md border shadow w-full overflow-x-auto relative">
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
                                table.getRowModel().rows.map((row) =>
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )
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

export default memo(BiddingStrategyTable)