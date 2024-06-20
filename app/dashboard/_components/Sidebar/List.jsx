"use client";

import React, { useState } from 'react'
import Hint from '@/components/Hint';
import Image from 'next/image';
import { cn } from '@/lib/utils';


export default function List({ data }) {
    const [active, setActive] = useState(0)

    if (!data?.length) return null
    return (
        <ul className='space-y-4'>
            {data.map((org) => (
                <div className='aspect-square relative'>
                    <Hint
                        label={org.name}
                        side="right"
                    >
                        <Image
                            src={org.imageUrl}
                            alt={org.name}
                            fill
                            className={cn('border rounded-lg cursor-pointer transition', active === org.id && 'border-2 border-primary/50')}
                            onClick={() => {
                                setActive(org.id)
                            }}
                        />
                    </Hint>
                </div>))}
        </ul>
    )
}
