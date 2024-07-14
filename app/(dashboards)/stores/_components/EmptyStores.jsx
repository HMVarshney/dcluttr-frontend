"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function EmptyStores() {
    const router = useRouter()
    return (
        <div className='mt-60 w-full flex flex-col justify-center items-center'>
            <Image
                src="/icons/empty-stores.svg"
                width={78}
                height={78}
            />
            <h2 className='text-base font-bold mt-4'>
                Connect your first brand now.
            </h2>
            <p className='text-xs mt-1 mb-8'>
                You don't have any brands in this organisation.
            </p>
            <Button onClick={() => { router.push('/welcome'); }}>
                Create a brand
            </Button>
        </div>
    )
}
