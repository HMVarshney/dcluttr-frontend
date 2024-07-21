


import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import Header from '../_components/Header';
import CampaignWiseDonutChart from '../_components/CampaignWiseDonutChart';
import LiveOrdersTable from '../_components/LiveOrdersTable';

export default function page() {
    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            <Header />
            <div className='m-6 flex gap-4'>
                <CampaignWiseDonutChart />
                <LiveOrdersTable />
            </div>
        </ScrollArea>
    )
}
