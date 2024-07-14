"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hint from '@/components/Hint';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchOrganizationDetails } from '@/lib/store/features/dashboardSlice';

export default function List() {
    const dispatch = useDispatch();
    const { userDetails, organizationDetails } = useSelector((state) => state.dashboard);
    let organizationAuthorities = userDetails?.organizationAuthorities?.organizationAuthorities;
    if (!organizationAuthorities?.length) return null;

    return (
        <ul className='space-y-4'>
            {organizationAuthorities.map((org, i) => (
                <div className='aspect-square relative' key={i}>
                    <Hint
                        label={org.organizationName}
                        side="right"
                    >
                        <Avatar
                            className={cn('border rounded-lg cursor-pointer transition', organizationDetails?.id === org.organizationId && 'border-2 border-primary/50')}
                            onClick={() => dispatch(fetchOrganizationDetails(org.organizationId))}
                        >
                            <AvatarImage src={org.imageUrl} alt={org.organizationName} />
                            <AvatarFallback className="text-xl rounded-lg">{org.organizationName?.[0]}</AvatarFallback>
                        </Avatar>
                    </Hint>
                </div>))}
        </ul>
    );
}
