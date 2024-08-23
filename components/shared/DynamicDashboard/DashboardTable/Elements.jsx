import ExportButton from "@/components/ExportButton";
import DataTable from "./DataTable";
import EditTableAttribution from "../../../../app/(dashboards)/dashboard/performance/_components/EditTableAttribution";
import { Button } from "@/components/ui/button";
import { SquareHalf } from "phosphor-react";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardTableHeader({ title, description }) {
  return (
    <div className="flex items-center justify-center gap-2 p-6">
      <div className="mr-auto">
        <div className="text-xl font-bold">{title}</div>
        <div className="text-[#4F4D55] text-xs">{description}</div>
      </div>
      <div>
        <ExportButton onExport={() => exportCampaignWiseTable(allData, campaignData.parsed?.columns || {})} />
      </div>
      <EditTableAttribution>
        <Button variant="outline" className="px-2.5">
          <SquareHalf className="w-5 h-5" />
        </Button>
      </EditTableAttribution>
    </div>
  );
}

export function DashboardTableBody({ loading, error, data }) {
  const { results, columns } = data;
  return (
    <div className="px-6 pb-8 w-full h-full">
      <div className="h-full rounded-md overflow-scroll border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
        {loading ? (
          <Skeleton className="w-[calc(100%-32px)] h-[500px] my-4 rounded-md mx-auto" />
        ) : error ? (
          <div className="text-destructive p-4 shadow-sm">{error}</div>
        ) : (
          <DataTable data={results} columns={columns} />
        )}
      </div>
    </div>
  );
}
