"use client";

import React, { useContext, useState } from 'react'
import Hint from '@/components/Hint';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DashboardContext } from '../../layout';


export default function List() {
    let { userDetails } = useContext(DashboardContext);
    let organizationAuthorities = userDetails?.organizationAuthorities?.organizationAuthorities
    const [active, setActive] = useState(0)

    if (!organizationAuthorities?.length) return null
    return (
        <ul className='space-y-4'>
            {organizationAuthorities.map((org) => (
                <div className='aspect-square relative' key={org.name}>
                    <Hint
                        label={org.organizationName}
                        side="right"
                    >
                        <Avatar className={cn('border rounded-lg cursor-pointer transition', active === org.organizationId && 'border-2 border-primary/50')}>
                            <AvatarImage src={org.imageUrl} alt={org.organizationName} />
                            <AvatarFallback className="text-xl rounded-lg">{org.organizationName?.[0]}</AvatarFallback>
                        </Avatar>
                    </Hint>
                </div>))}
        </ul>
    )
}
