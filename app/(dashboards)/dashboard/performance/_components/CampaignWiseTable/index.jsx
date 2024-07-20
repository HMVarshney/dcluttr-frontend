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
import { getAds, getAdSets, getCampaignData } from "@/lib/store/features/metaAdsSlice"
import EditTableAttribution from "../EditTableAttribution"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from "react-redux"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import CampaignTable from "./CampaignTable"


export default function CampaignWiseTable() {
  const isOpen = useSelector((state) => state.user.sideBarClose);
  const { loading, error, data } = useSelector((state) => state.metaAds.campaignData);
  const { loading: adSetsLoading, error: adSetsError, data: adSetsData } = useSelector((state) => state.metaAds.adSetsData);
  const { loading: adsLoading, error: adsError, data: adsData } = useSelector((state) => state.metaAds.adsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAds())
    dispatch(getAdSets())
    dispatch(getCampaignData())
  }, [])

  const columns = [
    {
      accessorKey: 'id',
      header: ({ table }) => (
        <div className="flex gap-4">
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
          Status
        </div>
      ),
      cell: ({ row, getValue }) => (
        <div className="flex gap-4">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
          <Switch />
        </div>
      ),
      // footer: props => props.column.id,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-72 justify-start"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Campaign
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div
          className={cn('w-72 line-clamp-1',
            { "pl-4": row.depth === 1 },
            { "pl-8": row.depth === 2 },
          )}
          {...{
            onClick: row.getToggleExpandedHandler(),
            style: { cursor: 'pointer' },
          }}
        >
          {/* {row.getCanExpand() ? (
              {row.getIsExpanded() ? '👇' : '👉'}
          ) : (
            '🔵'
          )} */}
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "purchase_value_sum",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="justify-start"
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
      <div className="px-6 pb-8 w-full">
        <div className="rounded-md overflow-hidden border shadow">
          {loading ?
            <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
            : <CampaignTable
              data={data?.results?.[0]?.data?.slice(0, 4)?.map(l1 =>
              ({
                ...l1,
                subRows: adSetsData?.results?.[0]?.data?.slice(0, 4)?.map(l2 =>
                ({
                  ...l2,
                  subRows: adsData?.results?.[0]?.data?.slice(0, 4)
                }))
              }))}
              columns={columns}>
            </CampaignTable>}
        </div>
      </div>
    </div>
  );
}


function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null)

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}