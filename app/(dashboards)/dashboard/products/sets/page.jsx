


import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import Header from './_components/Header';
import SetsTable from './_components/SetsTable';

export default function Page() {
    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            <Header />
            <SetsTable />
        </ScrollArea>
    )
}
