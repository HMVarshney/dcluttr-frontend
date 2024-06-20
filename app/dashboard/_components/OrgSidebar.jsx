"use client"
import { Button } from '@/components/ui/button'
import { Box, Home, Images as ImagesIcon, LayoutDashboard, Star, TvMinimal } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function OrgSideBar() {
    return (
        <div className='hidden lg:flex flex-col gap-y-6 w-[236px] p-4 bg-[#F8F8F8]'>
            <div className='space-y-1 w-full'>
                <Button asChild variant={"ghost"} size={"lg"} className='w-full font-normal justify-start px-2'>
                    <Link href={"/dashboard"}>
                        <Home className='h-5 w-5 text-icon mr-2' />
                        <span className='text-sm font-medium'>Dashboard</span>
                    </Link>
                </Button>
                <Button asChild variant={"ghost"} size={"lg"} className='w-full font-normal justify-start px-2'>
                    <Link href={"/"}>
                        <TvMinimal className='h-5 w-5 text-icon mr-2' />
                        <span className='text-sm font-medium'>Performance</span>
                    </Link>
                </Button>
                <Button asChild variant={"ghost"} size={"lg"} className='w-full font-normal justify-start px-2'>
                    <Link href={"/"}>
                        <Box className='h-5 w-5 text-icon mr-2' />
                        <span className='text-sm font-medium'>Products</span>
                    </Link>
                </Button>
                <Button asChild variant={"ghost"} size={"lg"} className='w-full font-normal justify-start px-2'>
                    <Link href={"/"}>
                        <ImagesIcon className='h-5 w-5 text-icon mr-2' />
                        <span className='text-sm font-medium'>Creatives</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
