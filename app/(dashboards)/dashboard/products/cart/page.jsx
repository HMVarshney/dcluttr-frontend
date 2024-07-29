


import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import Header from './_components/Header';
import CartTable from './_components/CartTable';

export default function Page() {
    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            <Header />
            <CartTable />
        </ScrollArea>
    )
}
