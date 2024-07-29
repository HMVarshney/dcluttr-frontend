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
import { Fragment, memo, useEffect, useMemo, useState } from "react";
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
import EditTableAttribution from "../../../performance/_components/EditTableAttribution";
import { Switch } from "@/components/ui/switch";
import IndeterminateCheckbox from "@/components/IndeterminateCheckbox"
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ExportFileFormat from "@/components/ExportFileFormat";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

let data = [
    {
        "id": "120210279094520487",
        "name": "3pc_sunny",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "null",
        "creative_link": "null",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210275349860487\"]&selected_ad_ids=120210279094520487",
        "ad_set_id": "120210275349860487",
        "campaign_id": "120210275349840487",
        "date.day": "2024-07-20T00:00:00.000",
        "date": "2024-07-20T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "2832.92",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "100",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "18.637631578947367",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210767728080487",
        "name": "Frame_Ad+",
        "status": "ACTIVE",
        "effective_status": "ACTIVE",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210767728120487\"]&selected_ad_ids=120210767728080487",
        "ad_set_id": "120210767728120487",
        "campaign_id": "120210767724740487",
        "date.day": "2024-07-28T00:00:00.000",
        "date": "2024-07-28T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "1298.42",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "60",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "19.09441176470588",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210768604770487",
        "name": "Sunny_reel_8Jul",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "video",
        "creative_link": "",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210768604780487\"]&selected_ad_ids=120210768604770487",
        "ad_set_id": "120210768604780487",
        "campaign_id": "120210510700630487",
        "date.day": "2024-07-19T00:00:00.000",
        "date": "2024-07-19T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "1074.16",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "292",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "1.96014598540146",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210676531770487",
        "name": "Static_highlighter_3",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "image",
        "creative_link": "https://scontent-atl3-1.xx.fbcdn.net/v/t45.1600-4/448804350_120210676522050487_2834986574975701768_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=890911&_nc_ohc=9BA0Ud0mJtkQ7kNvgEVT2ix&_nc_ht=scontent-atl3-1.xx&edm=ALjApogEAAAA&oh=00_AYCgTgtSvf7BJIneh1hVAtx1xBeLN_H7y8JM9ljmZaaxaQ&oe=66AAB3CF",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210676486430487\"]&selected_ad_ids=120210676531770487",
        "ad_set_id": "120210676486430487",
        "campaign_id": "120210676486420487",
        "date.day": "2024-07-14T00:00:00.000",
        "date": "2024-07-14T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "1288.36",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "4",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "107.36333333333333",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210618883490487",
        "name": "Advantage+ shopping campaign 10/07/2024 Ad",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210618883480487\"]&selected_ad_ids=120210618883490487",
        "ad_set_id": "120210618883480487",
        "campaign_id": "120210618883500487",
        "date.day": "2024-07-20T00:00:00.000",
        "date": "2024-07-20T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "1800.88",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "28",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "64.31714285714285",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    }
]
const getCommonPinningStyles = (data) => {
    const { column } = data
    const isPinned = column.getIsPinned()

    // console.log(data.getContext());
    return {
        boxShadow: column.id === 'name' ? '-1px 0 1px -1px gray inset' : undefined,
        left: isPinned === 'left' ? column.getStart('left') : undefined,
        opacity: isPinned ? 1 : 1,
        position: isPinned ? 'sticky' : 'relative',
        width: column.getSize(),
        zIndex: isPinned ? 1 : 0,
        background: isPinned === 'left' ? '#ffffff' : undefined,
    }
}

export default function SetsTable({ isLoading, annotation }) {
    const isOpen = useSelector((state) => state.user.sideBarClose);
    return (
        <div className={cn(' w-[calc(100vw-332px)]', { 'w-[calc(100vw-174px)]': isOpen })}>
            <div className='flex items-center justify-center gap-2 p-6'>
                <Input
                    className="w-[313px]"
                    value={""}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="🔍 Search for metric"
                />
                <Select>
                    <SelectTrigger className="w-[140px] ">
                        <SelectValue placeholder="View by 1" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="O-1">View by 1</SelectItem>
                        <SelectItem value="O-2">View by 2</SelectItem>
                        <SelectItem value="O-3">View by 3</SelectItem>
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
            <div className="px-6 pb-8 w-full">
                <Tables isLoading={isLoading} annotation={annotation} data={data} />
            </div>
        </div>
    )
}


export function Tables({ isLoading, annotation = {}, data = [] }) {
    const columns = useMemo(() => {
        return Object.entries(annotation.measures ?? {}).map(([key, value]) => ({
            accessorKey: key,
            header: <div className="min-w-32">{value.shortTitle || value.title}</div>,
            cell: (info) => <div className="min-w-32">{info.getValue()}</div>,
        }));
    }, [annotation]);

    const transformedData = useMemo(() => data, [data]);
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState([])

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
                cell: ({ row }) => (
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
                                width={28}
                                height={28}
                                className="rounded-full min-w-7"
                            />
                            <span className="font-semibold line-clamp-1">
                                {row.getValue("name")}
                            </span>
                            <Link href={row.getValue("link") ?? "#"} target="_blank">
                                <ArrowSquareOut
                                    size={20}
                                    className="text-primary font-semibold cursor-pointer"
                                />
                            </Link>
                        </div>
                    </div>
                ),
                // footer: props => props.column.id,
            },
            {
                header: "Ad Spend Sum",
                accessorKey: "ad_spend_sum",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Purchase Sum",
                accessorKey: "purchase_sum",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Impressions Sum",
                accessorKey: "impressions_sum",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Clicks Sum",
                accessorKey: "clicks_sum",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Vtc Sum",
                accessorKey: "vtc_sum",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Ctr",
                accessorKey: "ctr",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Cpc",
                accessorKey: "cpc",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Cpm",
                accessorKey: "cpm",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Roas",
                accessorKey: "roas",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Aov",
                accessorKey: "aov",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            {
                header: "Cpa",
                accessorKey: "cpa",
                cell: (info) => <div className="min-w-32">{info.getValue()}</div>
            },
            ...columns,
        ],
        state: {
            sorting,
            rowSelection,
            columnPinning: {
                left: ['id', 'name'],
            },
        },
        getSubRows: row => row.subRows,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
    })


    return (
        <>
            <div className="rounded-md overflow-hidden border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
                {(isLoading) ?
                    <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
                    : <Table className="rounded-md bg-white text-sm " >
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
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className={cn("text-[#4E5E5A]",
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
                                    </TableRow>))
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
                    </Table>}
            </div>
        </>
    );
}
