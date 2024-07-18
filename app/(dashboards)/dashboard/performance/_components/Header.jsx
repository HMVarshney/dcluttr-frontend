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
import Switcher from '@/components/Switcher'
import DatePickerWithRange from '@/components/DatePickerWithRange';
import { Button } from '@/components/ui/button';
import Notifications from '@/components/Notifications';
import ExportFileFormat from '@/components/ExportFileFormat';
import { SquareHalf } from 'phosphor-react';
import TopAdsBanner from '@/components/TopAdsBanner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Header() {

    return (
        <>
            <div className='sticky top-0 z-10'>
                <div className='flex items-center justify-center gap-2 py-3 px-6 bg-white border-b'>
                    <div className='mr-auto'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>Performance</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink>All</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className='text-[#919191] text-xs'>
                            Last updated: 12:56 PM
                        </div>
                    </div>

                    <Input
                        value={''}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="🔍  Filter source"
                        className="w-[152px] h-[38px]"
                    />
                    <Switcher />
                    <Button variant="outline" className="px-2.5">
                        <SquareHalf className='w-5 h-5' />
                    </Button>
                    <ExportFileFormat />
                    <Notifications />
                </div>
            </div>
            <TopAdsBanner />
        </>
    )
}
