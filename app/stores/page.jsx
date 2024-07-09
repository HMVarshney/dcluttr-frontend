"use client"
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import EmptyStores from './_components/EmptyStores'
import MembersTable from './_components/MembersTable'

export default function page() {
    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            {/* <Header /> */}
            <EmptyStores />
            <MembersTable data={[]} />
        </ScrollArea>
    )
}
