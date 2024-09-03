"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import Header from "../_components/Header";
import CampaignTypeDonutChart from "../_components/CampaignTypeDonutChart";
import BiddingStrategyTable from "../_components/BiddingStrategyTable";
import MetaAdsDetails from "../_components/CampaignWiseTable/MetaAdsDetails";
import AdPlacementTable from "../_components/AdPlacementTable";
import { getAdSetsMeta, getAdsMeta, getCampaignDataMeta } from "@/lib/store/features/metaAdsSlice";

export default function Page() {
  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <Header />
      <MetaAdsDetails />
      <BiddingStrategyTable isGoogle={false} />
      <AdPlacementTable />
      <div className="m-6 flex gap-4 w-1/2">
        <CampaignTypeDonutChart />
      </div>
    </ScrollArea>
  );
}
