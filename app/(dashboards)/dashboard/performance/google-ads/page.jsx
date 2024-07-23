


import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import Header from '../_components/Header';
import CampaignTypeDonutChart from '../_components/CampaignTypeDonutChart';
// import LiveOrdersTable from '../_components/LiveOrdersTable';
import GoogleAdsDetails from '../_components/CampaignWiseTable/GoogleAdsDetails';
import BiddingStrategyTable from '../_components/BiddingStrategyTable';
import CampaignTypeTable from '../_components/CampaignTypeTable';

export default function page() {
    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            <Header />
            <GoogleAdsDetails />
            <BiddingStrategyTable isGoogle={true} />
            <CampaignTypeTable isGoogle={true} />
            <div className='m-6 flex gap-4 w-1/2'>
                <CampaignTypeDonutChart />
            </div>
        </ScrollArea>
    )
}
