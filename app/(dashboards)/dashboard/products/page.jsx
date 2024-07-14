


import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import Header from './_components/Header';

export default function page() {
    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            <Header />
            <div>product</div>
        </ScrollArea>
    )
}
