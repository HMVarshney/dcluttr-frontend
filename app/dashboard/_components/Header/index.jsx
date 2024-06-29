"use client"

import React, { useState } from 'react'
import moment from 'moment';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Switcher from './Switcher'
import DatePickerWithRange from './DatePickerWithRange';
import { Button } from '@/components/ui/button';
import { Bell, RefreshCcw, Home, HomeIcon, PcCase, Plus, TvMinimal } from 'lucide-react';
import Image from 'next/image';



export default function Header() {
    const [dateRange, setDateRange] = useState({
        from: moment('2019-01-01', "YYYY-MM-DD")._d,
        to: moment('2022-12-23', "YYYY-MM-DD")._d,
        value: null
    });
    return (
        <div className=''>
            <div className='flex items-center justify-center gap-2 py-3 px-6 bg-white border-b'>
                <div className='mr-auto'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className='text-[#919191] text-xs'>
                        Last updated: 12:56 PM
                    </div>
                </div>
                <Switcher />
                <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
                <Button variant="ghost" className="px-2.5">
                    <RefreshCcw className='w-5 h-5' />
                </Button>
                <Button variant="ghost" className="px-2.5">
                    <Bell className='w-5 h-5' />
                </Button>
            </div>
            <div className='flex items-center justify-between gap-2 py-3 px-6 bg-white border-b'>
                <div className='border rounded-xl flex gap-2 bg-[#FAFAFA] p-[3px]'>
                    <Button variant="default" size="xs">
                        <HomeIcon className='w-4 h-4 mr-1' />
                        <div className='font-medium text-sm'>
                            Home
                        </div>
                    </Button>
                    <Button variant="ghost" size="xs" className=" text-[#031B15B2]">
                        <PcCase className='w-4 h-4 mr-1' />
                        <div className='font-medium text-sm'>
                            Dcluttr Pixel
                        </div>
                    </Button>
                </div>
                <div className='flex gap-2'>
                    <Button variant="outline" className=" text-[#031B15]">
                        <TvMinimal className='w-4 h-4 mr-2' />
                        <div className='font-medium text-sm'>
                            Customize Dashboard
                        </div>
                    </Button>
                    <Button variant="default" >
                        <Plus className='w-4 h-4 mr-2' />
                        <div className='font-medium text-sm'>
                            Create Section
                        </div>
                    </Button>
                </div>
            </div>
            <div className=' py-3 px-6'>
                <Image src="/temp/header_banner.png"
                    alt="header"
                    className='w-full  object-contain'
                    width={2000}
                    height={400}
                    priority
                />
            </div>
        </div>
    )
}