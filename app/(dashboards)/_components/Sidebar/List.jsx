"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hint from '@/components/Hint';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchOrganizationDetails } from '@/lib/store/features/dashboardSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { setStep } from '@/lib/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function List() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { allOrganization, organizationDetails, allOrganizationStatus } = useSelector((state) => state.dashboard);


    useEffect(() => {
        if (!allOrganization?.length && allOrganizationStatus === "succeeded") {
            dispatch(setStep(3));
            router.push('/sign-up');
        }
    }, [allOrganization?.length, allOrganizationStatus])


    if (allOrganizationStatus === "loading") {
        return (
            <ul className='space-y-4'>
                <Skeleton className="aspect-square" />
                <Skeleton className="aspect-square" />
                <Skeleton className="aspect-square" />
                <Skeleton className="aspect-square" />
            </ul>
        )
    };



    return (
        <ul className='space-y-4'>
            {allOrganization.map((org, i) => (
                <div className='aspect-square relative' key={i}>
                    <Hint
                        label={org?.name}
                        side="right"
                    >
                        <Avatar
                            className={cn('border rounded-lg cursor-pointer transition', organizationDetails?.id === org?.id && 'border-2 border-primary/50')}
                            onClick={() => dispatch(fetchOrganizationDetails(org?.id))}
                        >
                            <AvatarImage src={org?.organizationLogo} alt={org?.name} />
                            <AvatarFallback className="text-xl rounded-lg">{org?.name?.[0]}</AvatarFallback>
                        </Avatar>
                    </Hint>
                </div>))}
        </ul>
    );
}
