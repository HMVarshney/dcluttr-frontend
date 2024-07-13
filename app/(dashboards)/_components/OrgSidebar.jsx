"use client";

import { Button } from '@/components/ui/button';
import { CaretDoubleRight } from 'phosphor-react';
import Link from 'next/link';
import React from 'react';
import Navbar from './Sidebar/Navbar';
import { cn } from '@/lib/utils';
import { useSelector, useDispatch } from 'react-redux'; // Import necessary hooks
import { setSideBarClose } from '@/lib/store/features/dashboardSlice';

export default function OrgSideBar({ sideBarList }) {
    const isOpen = useSelector((state) => state.dashboard.sideBarClose); // Get isOpen from Redux store
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(setSideBarClose(!isOpen)); // Dispatch the action to toggle sidebar
    };

    return (
        <div className={cn('h-full min-w-[236px] w-[236px] transition-all', { 'min-w-[60px] w-[60px]': isOpen })}>
            <Navbar isOpen={isOpen} />
            <div className='hidden lg:flex flex-col gap-y-6 w-full py-6 px-4 bg-[#F8F8F8] h-[calc(100%-70px)]'>
                <div className='space-y-2.5 w-full'>
                    <Button className={cn('bg-primary rounded-full h-7 w-7 p-1 transition-all', isOpen ? 'rotate-180 ml-0' : 'rotate-0 ml-4')} onClick={handleToggle}>
                        <CaretDoubleRight size={16} weight="bold" />
                    </Button>
                    {sideBarList.map((item, index) => (
                        <Button key={index} asChild variant={"ghost"} size={"lg"} className={cn('w-full font-normal justify-start transition-all', isOpen ? 'px-1' : 'px-4')}>
                            <Link href={item.href}>
                                {item.icon}
                                <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1 ml-2', { 'max-w-0 opacity-0 ml-0': isOpen })}>{item.name}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
