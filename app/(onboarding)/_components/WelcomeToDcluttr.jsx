"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function WelcomeToDcluttr() {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            <Image
                src="/logoIcon.svg"
                width={124}
                height={124}
            />
            <h2 className='text-4xl font-bold mt-20'>
                Welcome to Decluttr
            </h2>
            <p className='text-xs mt-4 mb-10 w-1/2 text-center'>
                You’re just minutes away from transforming your data into profitable growth. There are a few things that need to be set up first. Ready to get started?
            </p>
            <Button className='w-1/2'>
                Get Started
            </Button>
        </div>
    )
}
