"use client"

import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect } from 'react'
import CreativesChart from './_components/CreativesChart'
import Header from './_components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { cn } from '@/lib/utils'
import { fetchCreativeDetails } from '@/lib/store/features/creativeSlice'


export default function Page() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.user.sideBarClose);
    const creativeDetails = useSelector((state) => state.creative.creativeDetails);
    console.log(creativeDetails);
    useEffect(() => {
        dispatch(fetchCreativeDetails())
    }, [])

    return (
        <ScrollArea className={cn('rounded-md bg-[#FAFAFA] h-full border w-[calc(100vw-332px)]', { 'w-[calc(100vw-174px)]': isOpen })}>
            <Header />
            <div className='m-6 '>
                <CreativesChart data={creativeDetails?.results?.[0]} />
            </div>
        </ScrollArea>
    )
}
