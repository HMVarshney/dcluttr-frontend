"use client"
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import StoresSettings from '../_components/StoresSettings'
import MembersTable from '../_components/MembersTable'

export default function page() {

    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            <StoresSettings />
            <MembersTable data={[]} />
        </ScrollArea>
    )
}
