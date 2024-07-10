"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

export default function AllDoneStartUsingDcluttr() {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            <h2 className='text-4xl font-bold mt-20'>
                All Done, Start using Dcluttr!
            </h2>
            <p className='text-xs mt-4 mb-10 w-1/2 text-center'>
                Need further assistance? Reach out to support
            </p>
            <Button className='w-1/4'>
                Take me to my Dashboard
            </Button>
        </div>
    )
}
