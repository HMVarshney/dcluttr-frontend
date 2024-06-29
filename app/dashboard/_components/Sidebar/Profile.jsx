"use client"


import { ArrowBigLeft, ChevronRight, LogOut, UserRound, UsersRound } from 'lucide-react'
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { deleteCookie } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function Profile() {
    const { replace } = useRouter()
    return (
        <div className='flex flex-col items-center justify-center gap-5'>
            <UsersRound className='text-icon cursor-pointer w-7 h-7' />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    onClick={(e) => e.stopPropagation()}
                    side="top"
                    sideOffset={0}
                    className="w-40 ml-10 p-1.5">
                    <div className='text-sm font-bold p-2.5'>
                        My Profile
                    </div>

                    <DropdownMenuItem className='flex gap-2 p-2.5 cursor-pointer'>
                        <Avatar className='w-5 h-5'>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='text-sm'>Shiva</div>
                        <div className='text-[10px] text-white px-2 bg-primary rounded'>Admin</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex gap-2 p-2.5 cursor-pointer'>
                        <UserRound className='w-4 h-4' />
                        <div className='text-sm'>My Profile</div>
                        <ChevronRight className='w-4 h-4 ml-auto' />
                    </DropdownMenuItem>
                    <DropdownMenuItem className='flex gap-2 p-2.5 cursor-pointer'
                        onClick={(e) => {
                            deleteCookie("accessToken")
                            replace("/log-in")
                        }}>
                        <LogOut className='w-4 h-4' />
                        <div className='text-sm'>Sign Out</div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
