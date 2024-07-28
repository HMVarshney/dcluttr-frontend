


import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import Header from './_components/Header';
import AnalyticsTable from './_components/AnalyticsTable';

export default function Page() {
    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            <Header />
            <AnalyticsTable />
        </ScrollArea>
    )
}
