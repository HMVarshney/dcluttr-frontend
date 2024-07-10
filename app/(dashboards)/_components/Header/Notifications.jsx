"use client"


import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Bell, ChevronRight, EllipsisVertical } from 'lucide-react'

export default function Notifications() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-2.5 right-0 hover:bg-none">
                    <Bell className='w-5 h-5' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side="bottom"
                sideOffset={0}
                className="w-80 mr-10 mt-1 p-0">
                <div className='text-sm font-bold px-4 py-2.5 border-b'>
                    Notifications
                </div>
                {[...Array(5)].map((_, i) => (
                    <DropdownMenuItem key={i} className='flex items-start gap-2 pl-2 pr-4 py-2.5 cursor-pointer rounded-none'>
                        <div className='flex items-center gap-1'>
                            <div className='w-1.5 h-1.5 bg-[#F95151] rounded-full' />
                            <div className='text-[10px] bg-[#9106FF] aspect-square w-6 content-center text-center rounded-full text-white'>
                                SS
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='text-sm font-semibold'>Primary notification text</div>
                            <div className='text-xs text-[#031B15B2]'>This is the description of the notification</div>
                            <div className='text-xs text-[#031B15B2] mt-1.5'>22 hours ago</div>
                        </div>
                        <EllipsisVertical className='w-4 h-4 ml-auto' />
                    </DropdownMenuItem>))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
