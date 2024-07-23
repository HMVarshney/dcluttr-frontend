"use client"


import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import Header from '../_components/Header';
// import AllPerformanceChart from '../_components/AllPerformanceChart';
import CampaignTypeDonutChart from '../_components/CampaignTypeDonutChart';
import LiveOrdersTable from '../_components/LiveOrdersTable';
import BiddingStrategyTable from '../_components/BiddingStrategyTable';
import { useSelector } from 'react-redux';
import { cn } from '@/lib/utils';
import MetaAdsDetails from '../_components/CampaignWiseTable/MetaAdsDetails';
import AdPlacementTable from '../_components/AdPlacementTable';

export default function Page() {
    const isOpen = useSelector((state) => state.user.sideBarClose);

    return (
        <ScrollArea className={cn('rounded-md bg-[#FAFAFA] h-full border w-[calc(100vw-332px)]', { 'w-[calc(100vw-174px)]': isOpen })}>
            <Header />
            <MetaAdsDetails />
            <BiddingStrategyTable isGoogle={false} />
            <AdPlacementTable />
            {/* <div className='m-6'>
                <AllPerformanceChart data={data} details={{ title: '' }} />
            </div> */}
            <div className='m-6 flex gap-4 w-1/2'>
                <CampaignTypeDonutChart />
            </div>
        </ScrollArea>
    )
}
