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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"



let data = [
    {
        "id": "120210434937060487",
        "name": "BAU_Ad+",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210434937070487\"]&selected_ad_ids=120210434937060487",
        "ad_set_id": "120210434937070487",
        "campaign_id": "120210434845570487",
        "date.day": "2024-07-18T00:00:00.000",
        "date": "2024-07-18T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "1916.92",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "72",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "20.83608695652174",
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
        "ad_spend_sum": "2798.8",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "118",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "20.579411764705885",
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
    },
    {
        "id": "120207651622920487",
        "name": "Catalogue_All",
        "status": "ACTIVE",
        "effective_status": "ACTIVE",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120207651622260487\"]&selected_ad_ids=120207651622920487",
        "ad_set_id": "120207651622260487",
        "campaign_id": "120207651159480487",
        "date.day": "2024-07-28T00:00:00.000",
        "date": "2024-07-28T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "989.86",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "58",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "11.78404761904762",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210676404740487",
        "name": "ASC_Influencer_Nidhi_panwar",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "video",
        "creative_link": "",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210675803040487\"]&selected_ad_ids=120210676404740487",
        "ad_set_id": "120210675803040487",
        "campaign_id": "120210675803030487",
        "date.day": "2024-07-14T00:00:00.000",
        "date": "2024-07-14T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "1378.96",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "24",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "49.24857142857143",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210388576830487",
        "name": "New_Catalogue_StarStruck",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210388567490487\"]&selected_ad_ids=120210388576830487",
        "ad_set_id": "120210388567490487",
        "campaign_id": "120210388567480487",
        "date.day": "2024-07-01T00:00:00.000",
        "date": "2024-07-01T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "332.8",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "4",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "41.6",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210388515870487",
        "name": "SC_Carousel_3pcs_Kit_20Feb24",
        "status": "ACTIVE",
        "effective_status": "ADSET_PAUSED",
        "creative_type": "null",
        "creative_link": "null",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210388515860487\"]&selected_ad_ids=120210388515870487",
        "ad_set_id": "120210388515860487",
        "campaign_id": "120204036974080487",
        "date.day": "2024-07-08T00:00:00.000",
        "date": "2024-07-08T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "5286.24",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "212",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "19.15304347826087",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210855332950487",
        "name": "Influencer_Cherry_Bomb",
        "status": "ACTIVE",
        "effective_status": "ACTIVE",
        "creative_type": "video",
        "creative_link": "",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210855177500487\"]&selected_ad_ids=120210855332950487",
        "ad_set_id": "120210855177500487",
        "campaign_id": "120210855177510487",
        "date.day": "2024-07-28T00:00:00.000",
        "date": "2024-07-28T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "24.96",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "0",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "6.24",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210676609840487",
        "name": "Static_contour_3",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "image",
        "creative_link": "https://scontent-atl3-1.xx.fbcdn.net/v/t45.1600-4/450684163_120210676564850487_5236802998106391615_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=890911&_nc_ohc=lyl0DRjCeYYQ7kNvgGbc79r&_nc_ht=scontent-atl3-1.xx&edm=ALjApogEAAAA&oh=00_AYDl2XX_Z7HhzsVHhofVpoFwHg05XqwBUMVEAkAKUHsLDg&oe=66AAB4B2",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210676549130487\"]&selected_ad_ids=120210676609840487",
        "ad_set_id": "120210676549130487",
        "campaign_id": "120210676549120487",
        "date.day": "2024-07-14T00:00:00.000",
        "date": "2024-07-14T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "907.04",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "8",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "113.38",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210603522420487",
        "name": "Features_Ad_New+",
        "status": "ACTIVE",
        "effective_status": "ACTIVE",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210603501340487\"]&selected_ad_ids=120210603522420487",
        "ad_set_id": "120210603501340487",
        "campaign_id": "120209959506630487",
        "date.day": "2024-07-28T00:00:00.000",
        "date": "2024-07-28T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "3520.8",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "208",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "13.646511627906978",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210749795730487",
        "name": "Advantage+ shopping campaign 10/07/2024 Ad",
        "status": "ACTIVE",
        "effective_status": "ACTIVE",
        "creative_type": "catalogue",
        "creative_link": "default",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210749795740487\"]&selected_ad_ids=120210749795730487",
        "ad_set_id": "120210749795740487",
        "campaign_id": "120210749795750487",
        "date.day": "2024-07-28T00:00:00.000",
        "date": "2024-07-28T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "2269.3199999999997",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "94",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "19.90631578947368",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
    {
        "id": "120210596238740487",
        "name": "Lip_liner",
        "status": "ACTIVE",
        "effective_status": "CAMPAIGN_PAUSED",
        "creative_type": "video",
        "creative_link": "",
        "link": "https://www.facebook.com/adsmanager/manage/ads?act=1105232053402107&filter_set=SEARCH_BY_ADGROUP_IDS-STRING_SETANY[\"120210596238750487\"]&selected_ad_ids=120210596238740487",
        "ad_set_id": "120210596238750487",
        "campaign_id": "120210596206150487",
        "date.day": "2024-07-17T00:00:00.000",
        "date": "2024-07-17T00:00:00.000",
        "count": "4",
        "purchase_value_sum": "0",
        "ad_spend_sum": "50.88",
        "purchase_sum": "0",
        "impressions_sum": "0",
        "link_clicks_sum": "4",
        "landing_page_views_sum": "0",
        "add_to_carts_sum": "0",
        "checkount_initiated_sum": "0",
        "ctr": null,
        "cpc": "12.72",
        "cpm": null,
        "roas": "0",
        "aov": null,
        "cpa": null
    },
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

export default function CartTable({ isLoading, annotation }) {
    const isOpen = useSelector((state) => state.user.sideBarClose);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

    const handlePageSizeChange = (value) => {
        setPagination((current) => ({
            ...current,
            pageSize: parseInt(value, 10),
        }));
    };
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
                <Select value={pagination?.pageSize} defaultValue={pagination?.pageSize} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="w-[100px] ">
                        <SelectValue placeholder={"3"} />
                    </SelectTrigger>
                    <SelectContent>
                        {[1, 3, 5].map((pageSize) => (
                            <SelectItem key={pageSize} value={pageSize}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="px-6 pb-8 w-full">
                <Tables isLoading={isLoading} annotation={annotation} data={data} pagination={pagination} setPagination={setPagination} />
            </div>
        </div>
    )
}


export function Tables({ isLoading, annotation = {}, data = [], pagination, setPagination }) {
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
                                width={40}
                                height={40}
                                className="rounded-full min-w-10"
                            />
                            <div className="font-semibold ">
                                <span className="line-clamp-1">
                                    {row.getValue("name")}
                                </span>
                                Deep Purple 4.2g
                            </div>
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
            pagination,
            columnPinning: {
                left: ['id', 'name'],
            },
        },
        getSubRows: row => row.subRows,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
    })

    const { pageIndex, pageSize } = pagination;
    const pageNumbers = useMemo(() => {
        const totalPages = table.getPageCount();
        let pages = [];
        let leftSide = pageIndex - 2;
        if (leftSide <= 2) {
            leftSide = 1;
        } else if (pageIndex > totalPages - 4) {
            leftSide = totalPages - 4;
        }
        let rightSide = pageIndex + 2;
        if (rightSide > totalPages - 2) {
            rightSide = totalPages;
        } else if (pageIndex < 3) {
            rightSide = 5;
        }
        for (let number = leftSide; number <= rightSide; number++) {
            if (number > 0 && number <= totalPages) {
                pages.push(number);
            }
        }
        return pages;
    }, [pageIndex, table.getPageCount()]);
    const handlePreviousPage = () => {
        setPagination((current) => ({
            ...current,
            pageIndex: current.pageIndex > 0 ? current.pageIndex - 1 : 0,
        }));
    };
    const handleNextPage = () => {
        setPagination((current) => ({
            ...current,
            pageIndex: current.pageIndex < table.getPageCount() - 1 ? current.pageIndex + 1 : current.pageIndex,
        }));
    };

    const handlePageNumberClick = (page) => {
        setPagination((current) => ({
            ...current,
            pageIndex: page - 1,
        }));
    };
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
            <Pagination className={"mt-4"}>
                <PaginationContent>
                    <PaginationPrevious onClick={handlePreviousPage} disabled={pageIndex === 0} />
                    {pageNumbers.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink onClick={() => handlePageNumberClick(page)} isActive={pageIndex + 1 === page}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationNext onClick={handleNextPage} disabled={pageIndex >= table.getPageCount() - 1} />
                </PaginationContent>
            </Pagination>
        </>
    );
}
