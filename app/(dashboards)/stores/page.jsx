"use client"
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import EmptyStores from './_components/EmptyStores'
import MembersTable from './_components/MembersTable'
import StoresSettings from './_components/StoresSettings'

export default function page() {

    return (<EmptyStores />)
    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            {/* <Header /> */}
            <StoresSettings />
            <MembersTable data={[]} />
        </ScrollArea>
    )
}
