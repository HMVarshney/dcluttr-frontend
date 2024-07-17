"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { Fragment } from 'react';
import Navbar from './Sidebar/Navbar';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';

export default function OrgSideBar({ sideBarList }) {
    const isOpen = useSelector((state) => state.user.sideBarClose);
    return (
        <div className={cn('h-full min-w-[236px] w-[236px] transition-all', { 'min-w-[78px] w-[78px]': isOpen })}>
            <Navbar isOpen={isOpen} />
            <div className='hidden lg:flex flex-col gap-y-6 w-full py-6 px-4 bg-[#F8F8F8] h-[calc(100%-70px)] border-t'>
                <div className='space-y-2.5 w-full'>
                    {sideBarList.map((item, index) => (
                        <Fragment key={index}>
                            <Button asChild variant={"ghost"} size={"lg"} className={cn('w-full font-normal justify-start transition-all mx-auto px-4', { "px-0 gap-0 justify-center": isOpen })}>
                                <Link href={item.href}>
                                    {item.icon}
                                    <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1 ml-2', { 'max-w-0 opacity-0 ml-0': isOpen })}>{item.name}</span>
                                </Link>
                            </Button>
                            {item.level2 && (
                                <div className={cn('flex flex-col gap-y-1 pl-3 ml-6 border-s-2', { 'hidden': isOpen })}>
                                    {item.level2.map((item2, index2) => (
                                        <Button key={index2} asChild variant={"ghost"} size={"lg"} className={cn('w-full font-normal justify-start transition-all', isOpen ? 'px-1' : 'px-4')}>
                                            <Link href={item2.href}>
                                                {item2.icon}
                                                <span className={cn('text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1 ml-2', { 'max-w-0 opacity-0 ml-0': isOpen })}>{item2.name}</span>
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
