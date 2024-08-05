"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
import Header from "../_components/Header";
import CampaignTypeDonutChart from "../_components/CampaignTypeDonutChart";
import BiddingStrategyTable from "../_components/BiddingStrategyTable";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import MetaAdsDetails from "../_components/CampaignWiseTable/MetaAdsDetails";
import AdPlacementTable from "../_components/AdPlacementTable";
import { useDispatch } from "react-redux";
import { getAdSetsMeta, getAdsMeta, getAdsPlacementMeta, getCampaignDataMeta } from "@/lib/store/features/metaAdsSlice";

export default function Page() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.user.sideBarClose);

  useEffect(() => {
    dispatch(getAdsMeta());
    dispatch(getAdSetsMeta());
    dispatch(getCampaignDataMeta());
    dispatch(getAdsPlacementMeta());
  }, [dispatch]);

  return (
    <ScrollArea
      className={cn("rounded-md bg-[#FAFAFA] h-full border w-[calc(100vw-332px)]", { "w-[calc(100vw-174px)]": isOpen })}
    >
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
