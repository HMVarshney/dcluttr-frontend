"use client"

import { ArrowSquareOut, SquareHalf } from "phosphor-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { memo, useEffect, useMemo, useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getAdsPlacementMeta } from "@/lib/store/features/metaAdsSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import EditTableAttribution from "../../performance/_components/EditTableAttribution";
import { Switch } from "@/components/ui/switch";
import IndeterminateCheckbox from "@/components/IndeterminateCheckbox"
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ExportFileFormat from "@/components/ExportFileFormat";

export default function CreativesTable({ data, isLoading, annotation }) {
    const isOpen = useSelector((state) => state.user.sideBarClose);


    return (
        <div className={cn(' w-[calc(100vw-332px)]', { 'w-[calc(100vw-174px)]': isOpen })}>
            <div className='flex items-center justify-center gap-2 p-6'>
                <Select>
                    <SelectTrigger className="w-[140px] ">
                        <SelectValue placeholder="Sort By 1" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="O-1">Sort By 1</SelectItem>
                        <SelectItem value="O-2">Sort By 2</SelectItem>
                        <SelectItem value="O-3">Sort By 3</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[100px] ">
                        <SelectValue placeholder="Ad Spend 1" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="O-1">Ad Spend 1</SelectItem>
                        <SelectItem value="O-2">Ad Spend 2</SelectItem>
                        <SelectItem value="O-3">Ad Spend 3</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[190px]">
                        <SelectValue placeholder="Descending" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="O-1">Descending 1</SelectItem>
                        <SelectItem value="O-2">Descending 2</SelectItem>
                        <SelectItem value="O-3">Descending 3</SelectItem>
                    </SelectContent>
                </Select>
                <div className='flex-1'></div>
                <EditTableAttribution>
                    <Button variant="outline" className="px-2.5">
                        <SquareHalf className='w-5 h-5' />
                    </Button>
                </EditTableAttribution>
                <ExportFileFormat />
            </div>
            <div className="px-6 pb-8 w-full overflow-x-auto">
                <div className="rounded-md border shadow max-w-full overflow-x-auto relative">
                    {(isLoading) ?
                        <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
                        : <Tables annotation={annotation} data={data} />
                    }
                </div>
            </div>
        </div>
    )
}


export function Tables({ annotation = {}, data = [] }) {
    const columns = useMemo(() => {
        return Object.entries(annotation.measures ?? {}).map(([key, value]) => ({
            accessorKey: key,
            header: <div className="min-w-32">{value.shortTitle || value.title}</div>,
            cell: (info) => <div className="min-w-32">{info.getValue()}</div>,
        }));
    }, [annotation]);

    const transformedData = useMemo(() => data, [data]);

    // const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data: transformedData || [],
        columns: [
            {
                accessorKey: 'name',
                header: ({ table, column }) => (
                    <div className="flex items-center gap-4">
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler(),
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
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                        <div
                            className={cn('w-72 flex items-center gap-2',
                                { "pl-4": row.depth === 1 },
                                { "pl-8": row.depth === 2 },
                            )}
                            {...{
                                onClick: row.getToggleExpandedHandler(),
                                style: { cursor: 'pointer' },
                            }}
                        >
                            <Image
                                src={"/logoIcon.svg"}
                                alt={row.getValue("name")}
                                width={24}
                                height={24}
                                className="rounded-full"
                            />
                            <span className="line-clamp-1 text-primary font-semibold ">
                                {row.getValue("name")}
                            </span>
                        </div>
                    </div>
                ),
                // footer: props => props.column.id,
            },
            {
                accessorKey: 'link',
                header: ({ table, column }) => (
                    <div className="w-72 flex items-center justify-start text-sm">
                        Link
                    </div>
                ),
                cell: ({ row }) => (
                    <div className={cn('w-72 flex items-center gap-2')}>
                        <Link href={row.getValue("link") ?? "#"} target="_blank">
                            <ArrowSquareOut
                                size={20}
                                className="text-primary font-semibold cursor-pointer"
                            />
                        </Link>
                    </div>
                ),
            },
            ...columns,
        ],
        state: {
            // sorting,
        },
        // onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
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
    );
}
