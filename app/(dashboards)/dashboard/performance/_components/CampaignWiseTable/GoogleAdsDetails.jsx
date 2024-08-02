"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowSquareOut, CaretDown, CaretRight, SquareHalf } from "phosphor-react";
import { useDispatch } from "react-redux";
import { getAdsGoogle, getAdSetsGoogle, getCampaignDataGoogle } from "@/lib/store/features/googleAdsSlice";
import EditTableAttribution from "../EditTableAttribution";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { Switch } from "@/components/ui/switch";
import { cn, getCommonPinningStyles } from "@/lib/utils";
import IndeterminateCheckbox from "@/components/IndeterminateCheckbox";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { exportCSV } from "@/lib/utils/export.utils";

const keyNameHeaderNameMapping = {
  name: "Campaign",
  purchase_value_sum: "Purchase Value",
  ad_spend_sum: "Ad Spend",
  purchase_sum: "Purchases",
  impressions_sum: "Impressions",
  clicks_sum: "Clicks",
  vtc_sum: "VTC",
  ctr: "CTR",
  cpc: "CPC",
  cpm: "CPM",
  roas: "ROAS",
  aov: "AOV",
  cpa: "CPA"
};

function exportCampaignWiseTable(data) {
  const keys = Object.entries(keyNameHeaderNameMapping).map(([keyName, headerName]) => ({
    field: keyName,
    title: headerName
  }));
  exportCSV(data, { keys }, "data_exported.csv");
}

export function CampaignTable({ table }) {
  return (
    <Table className="rounded-md bg-white text-sm ">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} style={{ ...getCommonPinningStyles(header) }}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
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
              className={cn(
                "text-[#4E5E5A]",
                { "bg-[#e5ede93a] hover:bg-[#e5ede9a8]": row.depth === 1 },
                { "bg-[#e5ede9a8] hover:bg-[#e5ede9c6]": row.depth === 2 }
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} style={{ ...getCommonPinningStyles(cell) }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function GoogleAdsDetails() {
  const isOpen = useSelector((state) => state.user.sideBarClose);
  const {
    campaignLoading,
    campaignError,
    campaignData,
    selectedCampaignIds,
    adSetsError,
    adSetsData,
    selectedAdSetsIds,
    adsError,
    adsData
  } = useSelector((state) => state.googleAds);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaignDataGoogle());
  }, [dispatch]);

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
              {keyNameHeaderNameMapping.name}
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
              <Switch />
            </div>
            <div
              className={cn("w-72 flex items-center gap-2", { "pl-4": row.depth === 1 }, { "pl-8": row.depth === 2 })}
              {...{
                onClick: () => {
                  row.getToggleExpandedHandler()();
                  if (row.depth === 0) {
                    dispatch(getAdSetsGoogle([...selectedCampaignIds, row?.original?.id]));
                  } else if (row.depth === 1) {
                    dispatch(getAdsGoogle([...selectedAdSetsIds, row?.original?.ad_group_id]));
                  }
                },
                style: { cursor: "pointer" }
              }}
            >
              {row.getCanExpand() ? row.getIsExpanded() ? <CaretDown /> : <CaretRight /> : null}
              <span className="line-clamp-1 text-primary font-semibold ">{row.getValue("name")}</span>
            </div>
            {row.original.campaign_link && (
              <Link href={row.original.campaign_link} target="_blank">
                <ArrowSquareOut size={20} className="text-primary font-semibold cursor-pointer" />
              </Link>
            )}
          </div>
        )
      },
      {
        accessorKey: "purchase_value_sum",
        header: ({ column }) => {
          return (
            <div
              className="justify-start flex items-center w-56 text-sm"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              {keyNameHeaderNameMapping.purchase_value_sum}
              <ArrowUpDown className="ml-2 h-4 w-4 cursor-pointer" />
            </div>
          );
        },
        width: 200
      },
      {
        header: keyNameHeaderNameMapping.ad_spend_sum,
        accessorKey: "ad_spend_sum"
      },
      {
        header: keyNameHeaderNameMapping.purchase_sum,
        accessorKey: "purchase_sum"
      },
      {
        header: keyNameHeaderNameMapping.impressions_sum,
        accessorKey: "impressions_sum",
        cell: ({ row }) => <div className="min-w-[120px]">{row.getValue("impressions_sum")}</div>
      },
      {
        header: keyNameHeaderNameMapping.clicks_sum,
        accessorKey: "clicks_sum",
        cell: ({ row }) => <div className="min-w-[100px]">{row.getValue("clicks_sum")}</div>
      },
      {
        header: keyNameHeaderNameMapping.vtc_sum,
        accessorKey: "vtc_sum",
        cell: ({ row }) => <div className="min-w-[80px]">{row.getValue("vtc_sum")}</div>
      },
      {
        header: keyNameHeaderNameMapping.ctr,
        accessorKey: "ctr",
        cell: ({ row }) => <div className="min-w-[120px]">{row.getValue("ctr")}</div>
      },
      {
        header: keyNameHeaderNameMapping.cpc,
        accessorKey: "cpc"
      },
      {
        header: keyNameHeaderNameMapping.cpm,
        accessorKey: "cpm"
      },
      {
        header: keyNameHeaderNameMapping.roas,
        accessorKey: "roas"
      },
      {
        header: keyNameHeaderNameMapping.aov,
        accessorKey: "aov"
      },
      {
        header: keyNameHeaderNameMapping.cpa,
        accessorKey: "cpa"
      }
    ],
    [dispatch, selectedAdSetsIds, selectedCampaignIds]
  );

  const allData = useMemo(() => {
    return campaignData?.map((l1) => {
      let filterSubRows = adSetsData?.filter((f1) => f1.campaign_resource_name === l1.id);
      return {
        ...l1,
        subRows:
          filterSubRows.length > 0
            ? filterSubRows.map((l2) => {
                let filterAds = adsData?.filter((f2) => f2.resource_name.includes(l2.ad_group_id));
                return {
                  ...l2,
                  subRows: filterAds?.length > 0 ? filterAds : [{}]
                };
              })
            : [{}]
      };
    });
  }, [campaignData, adSetsData, adsData]);

  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data: allData,
    columns: columns,
    state: {
      sorting,
      rowSelection,
      expanded,
      columnPinning: {
        left: ["id", "name"]
      }
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection
  });

  return (
    <div>
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
            {campaignLoading ? ( // || adSetsLoading || adsLoading
              <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
            ) : campaignError || adSetsError || adsError ? (
              <div className="text-destructive p-4 shadow-sm">{campaignError ?? adSetsError ?? adsError}</div>
            ) : (
              <CampaignTable table={table} />
            )}
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => exportCampaignWiseTable(allData)}>Export</button>
      </div>
    </div>
  );
}

export default GoogleAdsDetails;
