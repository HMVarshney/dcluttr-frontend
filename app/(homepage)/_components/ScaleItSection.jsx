

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function ScaleItSection() {
    return (
        <div className='flex flex-col justify-center items-center my-24 lg:my-52'>
            <h1 className='flex items-center justify-center gap-2 lg:gap-3 font-extrabold text-center text-2xl lg:text-7xl'>
                Scale<Image src={"/icons/graph.png"} alt="logo" width={100} height={100} className="w-8 lg:w-16 object-contain" />it to the moon
            </h1>
            <Button className="text-base font-bold mt-4 lg:mt-10">
                Book a demo
            </Button>
        </div>
    )
}
