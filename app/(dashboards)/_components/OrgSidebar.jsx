"use client"
import { Button } from '@/components/ui/button'
import { Box, Home, Images as ImagesIcon, LayoutDashboard, Star, TvMinimal } from 'lucide-react'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Navbar from './Sidebar/Navbar'
import { cn } from '@/lib/utils'
import { CaretDoubleRight } from 'phosphor-react'
import { DashboardContext } from '../layout'

export default function OrgSideBar() {
    const { sideBarClose: isOpen, setSideBarClose: setOpen } = useContext(DashboardContext)
    return (
        <div className={cn('h-full min-w-[236px] w-[236px] transition-all', { 'min-w-[74px] w-[74px]': isOpen })}>
            <Navbar isOpen={isOpen} />
            <div className='hidden lg:flex flex-col gap-y-6 w-full p-4 bg-[#F8F8F8] h-[calc(100%-70px)]'>
                <div className='space-y-1 w-full'>
                    <Button className="bg-primary rounded-full h-7 w-7 p-1" onClick={() => setOpen(!isOpen)}>
                        <CaretDoubleRight size={16} weight="bold" className={cn('transition-all', isOpen ? 'rotate-180' : 'rotate-0')} />
                    </Button>
                    <Button asChild variant={"ghost"} size={"lg"} className='w-full font-normal justify-start px-2'>
                        <Link href={"/dashboard"}>
                            <Home className='h-5 w-5 text-icon mr-2' />
                            <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1', { 'max-w-0 opacity-0': isOpen })}>Dashboard</span>
                        </Link>
                    </Button>
                    <Button asChild variant={"ghost"} size={"lg"} className='w-full font-normal justify-start px-2'>
                        <Link href={"/"}>
                            <TvMinimal className='h-5 w-5 text-icon mr-2' />
                            <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1', { 'max-w-0 opacity-0': isOpen })}>Performance</span>
                        </Link>
                    </Button>
                    <Button asChild variant={"ghost"} size={"lg"} className='w-full font-normal justify-start px-2'>
                        <Link href={"/"}>
                            <Box className='h-5 w-5 text-icon mr-2' />
                            <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1', { 'max-w-0 opacity-0': isOpen })}>Products</span>
                        </Link>
                    </Button>
                    <Button asChild variant={"ghost"} size={"lg"} className='w-full font-normal justify-start px-2'>
                        <Link href={"/"}>
                            <ImagesIcon className='h-5 w-5 text-icon mr-2' />
                            <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1', { 'max-w-0 opacity-0': isOpen })}>Creatives</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
