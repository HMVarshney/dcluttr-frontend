"use client"

import { SquareHalf } from "phosphor-react";
import EditTableAttribution from "./EditTableAttribution";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { memo, useEffect, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getBiddingStrategy } from "@/lib/store/features/metaAdsSlice";

export const columns = [
    {
        accessorKey: "google_bidding_strategy.count",
        header: ({ column }) => {
            return (
                <div className="flex items-center gap-3">
                    <Checkbox className="rounded-lg bg-white z-10" />
                    <div className="text-[#4E5E5A] font-medium text-sm">
                        Strategy
                    </div>
                </div>
            );
        },
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <Checkbox className="rounded-lg bg-white z-10" />
                <div className="text-[#4E5E5A] font-medium text-sm">{row.original?.["google_bidding_strategy.count"]}</div>
            </div>
        ),
    },
    {
        accessorKey: "google_bidding_strategy.ad_spend_sum",
        header: "Amount Spent",
        cell: ({ row }) => (
            <div className="text-[#4E5E5A] font-medium text-sm">{row.original?.["google_bidding_strategy.ad_spend_sum"]}</div>
        ),
    },
    {
        id: "google_bidding_strategy.roas",
        header: "ROAS (Website)",
        cell: ({ row }) => {
            return (
                <div className="text-[#4E5E5A] font-medium text-sm">{row.original?.["google_bidding_strategy.roas"]}</div>
            );
        },
    },
    {
        id: "google_bidding_strategy.purchase_sum",
        header: "Cost Per Website Purchase",
        cell: ({ row }) => {
            return (
                <div className="text-[#4E5E5A] font-medium text-sm">{row.original?.["google_bidding_strategy.purchase_sum"]}</div>
            );
        },
    },
    {
        id: "google_bidding_strategy.ctr",
        header: "Links CTR",
        cell: ({ row }) => {
            return (
                <div className="text-[#4E5E5A] font-medium text-sm">{row.original?.["google_bidding_strategy.ctr"]}</div>
            );
        },
    }
];

function BiddingStrategyTable() {
    const dispatch = useDispatch();
    const { loading, error, data } = useSelector((state) => state.metaAds.biddingStrategy);

    useEffect(() => {
        dispatch(getBiddingStrategy());
    }, []);

    // const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data: data?.results?.[0]?.data || [],
        columns,
        state: {
            // sorting,
        },
        // onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        // getSortedRowModel: getSortedRowModel(),
    });

    console.log("Component rerendered", loading, error, data);

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
                                        );
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
    );
}

export default memo(BiddingStrategyTable);
