"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaretDown, CaretRight, SquareHalf } from "phosphor-react";
import EditTableAttribution from "../EditTableAttribution";
import { useSelector } from "react-redux";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import CampaignTable from "./CampaignTable";
import IndeterminateCheckbox from "@/components/IndeterminateCheckbox";
import { useMemo } from "react";

export default function MetaAdsDetails() {
  const isOpen = useSelector((state) => state.user.sideBarClose);
  const { data } = useSelector((state) => state.metaAds.campaignData);
  const { data: adsData } = useSelector((state) => state.metaAds.adsData);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ table, column }) => (
          <div className="flex items-center gap-4">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler()
              }}
            />
            <div className="flex items-center justify-center text-sm w-20">Status</div>
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
                onChange: row.getToggleSelectedHandler()
              }}
            />
            <div className="flex items-center justify-center w-20">
              <Switch
                checked={row.original.status === "ACTIVE"}
                onCheckedChange={() => {
                  alert("Coming Soon");
                }}
              />
            </div>
            <div
              className={cn("w-72 flex items-center gap-2", { "pl-4": row.depth === 1 }, { "pl-8": row.depth === 2 })}
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" }
              }}
            >
              {row.getCanExpand() ? row.getIsExpanded() ? <CaretDown /> : <CaretRight /> : null}
              {/* <AsteriskSimple size={10} />} */}
              <span className="line-clamp-1 text-primary font-semibold ">{row.getValue("name")}</span>
            </div>
          </div>
        )
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
          );
        },
        width: 200
      },
      {
        header: "Ad Spend Sum",
        accessorKey: "ad_spend_sum",
        cell: ({ row }) => <div className="min-w-[120px]">{row.getValue("ad_spend_sum")}</div>
      },
      {
        header: "Purchase Sum",
        accessorKey: "purchase_sum",
        cell: ({ row }) => <div className="min-w-[120px]">{row.getValue("purchase_sum")}</div>
      },
      {
        header: "Impressions Sum",
        accessorKey: "impressions_sum",
        cell: ({ row }) => <div className="min-w-[120px]">{row.getValue("impressions_sum")}</div>
      },
      {
        header: "Link clicks Sum",
        accessorKey: "link_clicks_sum",
        cell: ({ row }) => <div className="min-w-[100px]">{row.getValue("link_clicks_sum")}</div>
      },
      {
        header: "Vtc Sum",
        accessorKey: "vtc_sum",
        cell: ({ row }) => <div className="min-w-[80px]">{row.getValue("vtc_sum")}</div>
      },
      {
        header: "Ctr",
        accessorKey: "ctr",
        cell: ({ row }) => <div className="min-w-[120px]">{row.getValue("ctr")}</div>
      },
      {
        header: "Cpc",
        accessorKey: "cpc"
      },
      {
        header: "Cpm",
        accessorKey: "cpm"
      },
      {
        header: "Roas",
        accessorKey: "roas"
      },
      {
        header: "Aov",
        accessorKey: "aov"
      },
      {
        header: "Cpa",
        accessorKey: "cpa"
      }
    ],
    []
  );

  return (
    <div className={cn(" w-[calc(100vw-332px)]", { "w-[calc(100vw-174px)]": isOpen })}>
      <div className="flex items-center justify-center gap-2 p-6">
        <div className="mr-auto">
          <div className="text-xl font-bold">Campaign-wise distribution</div>
          <div className="text-[#4F4D55] text-xs">Find all the analytics for store</div>
        </div>
        <EditTableAttribution>
          <Button variant="outline" className="px-2.5">
            <SquareHalf className="w-5 h-5" />
          </Button>
        </EditTableAttribution>
      </div>
      <div className="px-6 pb-8 w-full">
        <div className="rounded-md overflow-hidden border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
          <CampaignTable
            data={data.parsed?.results?.map((l1) => ({
              ...l1,
              subRows: adsData.parsed?.results?.filter((l3) => l3.campaign_id === l1.campaign_id)
            }))}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
}
