"use client"

import React, { Children, Fragment, useEffect, useMemo, useState } from "react"
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
import { getAdSets, getCampaignData } from "@/lib/store/features/metaAdsSlice"
import EditTableAttribution from "../EditTableAttribution"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from "react-redux"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import CampaignTable from "./CampaignTable"
import AdSetsTable from "./AdSetsTable"


export default function CampaignWiseTable() {
  const isOpen = useSelector((state) => state.user.sideBarClose);
  const { loading, error, data } = useSelector((state) => state.metaAds.campaignData);
  const { loading: adSetsLoading, error: adSetsError, data: adSetsData } = useSelector((state) => state.metaAds.adSetsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCampaignData())
  }, [])
  const [openAdSets, setOpenAdSets] = useState("")

  const columns = [
    {
      accessorKey: "google_campaign_id",
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
      accessorKey: "google_campaign_id",
      header: "Status",
      cell: ({ row }) => (
        <Switch />
      ),
    },
    {
      accessorKey: "google_campaign_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-96"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Campaign
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="w-96" onClick={() => {
          setOpenAdSets(row.id)
          dispatch(getAdSets())
        }}>
          {row.getValue("google_campaign_name")}
        </div>
      ),
    },
    {
      accessorKey: "google_campaign_stream_purchase_value_sum",
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
      accessorKey: 'google_campaign_stream_ad_spend_sum'
    },
    {
      header: 'Purchase Sum',
      accessorKey: 'google_campaign_stream_purchase_sum'
    },
    {
      header: 'Impressions Sum',
      accessorKey: 'google_campaign_stream_impressions_sum'
    },
    {
      header: 'Clicks Sum',
      accessorKey: 'google_campaign_stream_clicks_sum'
    },
    {
      header: 'Vtc Sum',
      accessorKey: 'google_campaign_stream_vtc_sum'
    },
    {
      header: 'Ctr',
      accessorKey: 'google_campaign_stream_ctr'
    },
    {
      header: 'Cpc',
      accessorKey: 'google_campaign_stream_cpc'
    },
    {
      header: 'Cpm',
      accessorKey: 'google_campaign_stream_cpm'
    },
    {
      header: 'Roas',
      accessorKey: 'google_campaign_stream_roas'
    },
    {
      header: 'Aov',
      accessorKey: 'google_campaign_stream_aov'
    },
    {
      header: 'Cpa',
      accessorKey: 'google_campaign_stream_cpa'
    }
  ];

  const columnsAdsSet = [
    {
      accessorKey: "google_ad_group_name",
      cell: ({ row }) => (
        <Checkbox
          className=" " />
      ),
    },
    {
      accessorKey: "google_ad_group_id",
      header: "Status",
      cell: ({ row }) => (
        <Switch />
      ),
    },
    {
      accessorKey: "google_ad_group_name",
      cell: ({ row }) => (
        <div className="w-80 max-w-80 line-clamp-1" onClick={() => {
          setOpenAdSets(row.id)
          dispatch(getAdSets())
        }}>
          {row.getValue("google_ad_group_name")}
        </div>
      ),
    },
    {
      accessorKey: "google_ad_group_stream_purchase_value_sum",
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
      accessorKey: 'google_ad_group_stream_ad_spend_sum'
    },
    {
      header: 'Purchase Sum',
      accessorKey: 'google_ad_group_stream_purchase_sum'
    },
    {
      header: 'Impressions Sum',
      accessorKey: 'google_ad_group_stream_impressions_sum'
    },
    {
      header: 'Clicks Sum',
      accessorKey: 'google_ad_group_stream_clicks_sum'
    },
    {
      header: 'Vtc Sum',
      accessorKey: 'google_ad_group_stream_vtc_sum'
    },
    {
      header: 'Ctr',
      accessorKey: 'google_ad_group_stream_ctr'
    },
    {
      header: 'Cpc',
      accessorKey: 'google_ad_group_stream_cpc'
    },
    {
      header: 'Cpm',
      accessorKey: 'google_ad_group_stream_cpm'
    },
    {
      header: 'Roas',
      accessorKey: 'google_ad_group_stream_roas'
    },
    {
      header: 'Aov',
      accessorKey: 'google_ad_group_stream_aov'
    },
    {
      header: 'Cpa',
      accessorKey: 'google_ad_group_stream_cpa'
    }
  ]


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
            : <CampaignTable data={data?.results?.[0]?.data?.slice(0, 10)} columns={columns} openAdSets={openAdSets}>
              {adSetsData?.results?.[0]?.data.length > 0 &&
                <AdSetsTable data={adSetsData?.results?.[0]?.data?.slice(0, 10)} columns={columnsAdsSet} />}
            </CampaignTable>}
        </div>
      </div>
    </div>
  );
}
