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
        <div className={cn('h-full min-w-[236px] w-[236px] transition-all', { 'min-w-[60px] w-[60px]': isOpen })}>
            <Navbar isOpen={isOpen} />
            <div className='hidden lg:flex flex-col gap-y-6 w-full p-4 bg-[#F8F8F8] h-[calc(100%-70px)]'>
                <div className='space-y-1 w-full'>
                    <Button className={cn('bg-primary rounded-full h-7 w-7 p-1 transition-all', isOpen ? 'rotate-180 ' : 'rotate-0 ')} onClick={() => setOpen(!isOpen)}>
                        <CaretDoubleRight size={16} weight="bold" />
                    </Button>
                    <Button asChild variant={"ghost"} size={"lg"} className={cn('w-full font-normal justify-start transition-all', isOpen ? 'px-1' : 'px-4')}>
                        <Link href={"/dashboard"}>
                            <Home className='h-5 w-5 text-icon' />
                            <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1 ml-2', { 'max-w-0 opacity-0 ml-0': isOpen })}>Dashboard</span>
                        </Link>
                    </Button>
                    <Button asChild variant={"ghost"} size={"lg"} className={cn('w-full font-normal justify-start transition-all', isOpen ? 'px-1' : 'px-4')}>
                        <Link href={"/"}>
                            <TvMinimal className='h-5 w-5 text-icon' />
                            <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1 ml-2', { 'max-w-0 opacity-0 ml-0': isOpen })}>Performance</span>
                        </Link>
                    </Button>
                    <Button asChild variant={"ghost"} size={"lg"} className={cn('w-full font-normal justify-start transition-all', isOpen ? 'px-1' : 'px-4')}>
                        <Link href={"/"}>
                            <Box className='h-5 w-5 text-icon' />
                            <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1 ml-2', { 'max-w-0 opacity-0 ml-0': isOpen })}>Products</span>
                        </Link>
                    </Button>
                    <Button asChild variant={"ghost"} size={"lg"} className={cn('w-full font-normal justify-start transition-all', isOpen ? 'px-1' : 'px-4')}>
                        <Link href={"/"}>
                            <ImagesIcon className='h-5 w-5 text-icon' />
                            <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1 ml-2', { 'max-w-0 opacity-0 ml-0': isOpen })}>Creatives</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
