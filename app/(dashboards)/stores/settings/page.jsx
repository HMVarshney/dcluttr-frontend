"use client"
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import StoresSettings from '../_components/StoresSettings'
import MembersTable from '../_components/MembersTable'
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function page() {

    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            <div className='sticky top-0 z-10'>
                <div className='flex items-center justify-center gap-2 py-3 px-6 bg-white border-b'>
                    <div className='mr-auto'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/stores">All stores</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/stores/settings">settings</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className='text-[#919191] text-xs'>
                            Last updated: 12:56 PM
                        </div>
                    </div>
                </div>
            </div>
            <StoresSettings />
            <MembersTable data={[]} />
        </ScrollArea>
    )
}
