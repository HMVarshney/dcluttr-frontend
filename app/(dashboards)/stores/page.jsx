"use client"
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useState } from 'react'
import EmptyStores from './_components/EmptyStores'
import MembersTable from './_components/MembersTable'
import StoresSettings from './_components/StoresSettings'
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import DatePickerWithRange from '../_components/Header/DatePickerWithRange'
import { Button } from '@/components/ui/button'
import { Plus } from 'phosphor-react'
import Notifications from '../_components/Header/Notifications'
import moment from 'moment'
import AllBrands from './_components/AllBrands'
import BrandDetails from './_components/BrandDetails'

export default function page() {
    const [dateRange, setDateRange] = useState({
        from: moment('2019-01-01', "YYYY-MM-DD")._d,
        to: moment('2022-12-23', "YYYY-MM-DD")._d,
        value: null
    });

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
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className='text-[#919191] text-xs'>
                            Last updated: 12:56 PM
                        </div>
                    </div>
                    <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
                    <Button variant="outline" className="px-2.5">
                        <Plus className='w-5 h-5' />
                    </Button>
                    <Notifications />
                </div>
            </div>
            {/* <EmptyStores /> */}
            {/* <AllBrands /> */}
            <BrandDetails />
        </ScrollArea>
    )
}
