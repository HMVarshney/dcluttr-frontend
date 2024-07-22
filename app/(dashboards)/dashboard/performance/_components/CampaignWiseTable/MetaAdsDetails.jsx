"use client"

import React, { useEffect, } from "react"

import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AsteriskSimple, CaretDown, CaretRight, SquareHalf, Trash } from "phosphor-react"
import { useDispatch } from "react-redux"
import { getAdsMeta, getAdSetsMeta, getCampaignDataMeta } from "@/lib/store/features/metaAdsSlice"
import EditTableAttribution from "../EditTableAttribution"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from "react-redux"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import CampaignTable from "./CampaignTable"


export default function MetaAdsDetails() {
  const isOpen = useSelector((state) => state.user.sideBarClose);
  const { loading, error, data } = useSelector((state) => state.metaAds.campaignData);
  const { loading: adSetsLoading, error: adSetsError, data: adSetsData } = useSelector((state) => state.metaAds.adSetsData);
  const { loading: adsLoading, error: adsError, data: adsData } = useSelector((state) => state.metaAds.adsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdsMeta())
    dispatch(getAdSetsMeta())
    dispatch(getCampaignDataMeta())
  }, [])

  const columns = [
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
          <div className="flex items-center justify-center text-sm w-20">
            Status
          </div>
          <div
            className="w-72 flex items-center justify-start text-sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Campaign
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
          <div className="flex items-center justify-center w-20">
            <Switch checked={row.original.status === "ACTIVE"} onCheckedChange={() => { alert("Coming Soon") }} />
          </div>
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
            {row.getCanExpand() ? (
              row.getIsExpanded() ? <CaretDown /> : <CaretRight />
            ) : null}
            {/* <AsteriskSimple size={10} />} */}
            <span className="line-clamp-1 text-primary font-semibold ">
              {row.getValue("name")}
            </span>
          </div>
        </div>
      ),
      // footer: props => props.column.id,
    },
    {
      accessorKey: "purchase_value_sum",
      header: ({ column }) => {
        return (
          <div
            className="justify-start flex items-center w-56 text-sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Purchase Value Sum
            <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
          </div>
        )
      },
      width: 200
    },
    {
      header: 'Ad Spend Sum',
      accessorKey: 'ad_spend_sum',
      cell: ({ row }) => (
        <div className="min-w-[120px]">
          {row.getValue("ad_spend_sum")}
        </div>
      )
    },
    {
      header: 'Purchase Sum',
      accessorKey: 'purchase_sum',
      cell: ({ row }) => (
        <div className="min-w-[120px]">
          {row.getValue("purchase_sum")}
        </div>
      )
    },
    {
      header: 'Impressions Sum',
      accessorKey: 'impressions_sum',
      cell: ({ row }) => (
        <div className="min-w-[120px]">
          {row.getValue("impressions_sum")}
        </div>
      )
    },
    {
      header: 'Link clicks Sum',
      accessorKey: 'link_clicks_sum',
      cell: ({ row }) => (
        <div className="min-w-[100px]">
          {row.getValue("link_clicks_sum")}
        </div>
      )
    },
    {
      header: 'Vtc Sum',
      accessorKey: 'vtc_sum',
      cell: ({ row }) => (
        <div className="min-w-[80px]">
          {row.getValue("vtc_sum")}
        </div>
      )
    },
    {
      header: 'Ctr',
      accessorKey: 'ctr',
      cell: ({ row }) => (
        <div className="min-w-[120px]">
          {row.getValue("ctr")}
        </div>
      )
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
          {(loading || adSetsLoading || adsLoading) ?
            <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
            : (
              // (error || adSetsError || adsError) ?
              //   <div className="text-destructive p-4 shadow-sm">{error ?? adSetsError ?? adsError}</div>
              //   :
              <CampaignTable
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
              </CampaignTable>)}
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
      className={cn("min-w-4 h-4 accent-primary hover:accent-primary/80 rounded", className + ' cursor-pointer')}
      {...rest}
    />
  )
}