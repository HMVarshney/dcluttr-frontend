import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import Header from "../_components/Header";
import CampaignTypeDonutChart from "../_components/CampaignTypeDonutChart";
import GoogleAdsDetails from "../_components/CampaignWiseTable/GoogleAdsDetails";
import BiddingStrategyTable from "../_components/BiddingStrategyTable";
import CampaignTypeTable from "../_components/CampaignTypeTable";
import DashboardTable from "../_components/DashboardTable";

const query = {
  measures: [
    "google_campaign_stream.purchase_value_sum",
    "google_campaign_stream.ad_spend_sum",
    "google_campaign_stream.purchase_sum",
    "google_campaign_stream.impressions_sum",
    "google_campaign_stream.clicks_sum",
    "google_campaign_stream.vtc_sum",
    "google_campaign_stream.ctr",
    "google_campaign_stream.cpc",
    "google_campaign_stream.cpm",
    "google_campaign_stream.cpm",
    "google_campaign_stream.roas",
    "google_campaign_stream.aov",
    "google_campaign_stream.cpa"
  ],
  dimensions: [
    "google_campaign.id",
    "google_campaign.name",
    "google_campaign.resource_name",
    "google_campaign.campaign_link"
  ],
  order: {
    "google_campaign_stream.purchase_value_sum": "desc"
  },
  timeDimensions: [
    {
      dimension: "google_campaign_stream.date",
      granularity: "week"
    }
  ]
};

export const metadata = {
  title: "Overview"
};
export default function page() {
  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <Header />
      <DashboardTable query={query} />
      {/* <GoogleAdsDetails />
      <BiddingStrategyTable isGoogle={true} />
      <CampaignTypeTable isGoogle={true} />
      <div className="m-6 flex gap-4 w-1/2">
        <CampaignTypeDonutChart />
      </div> */}
    </ScrollArea>
  );
}
