
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function HeroSection() {
    return (
        <section className='flex flex-col justify-center items-center'>
            <Button variant="outline" size="sm" className="text-xs font-bold mb-4 mt-20">
                Dcluttr v1 is live now
            </Button>
            <h1 className='flex items-center gap-3 font-extrabold text-center text-7xl'>
                Advertise better<Image src={"/icons/megaphone.png"} alt="logo" width={100} height={100} className="w-20 object-contain" />
            </h1>
            <h1 className='font-extrabold text-center text-7xl'>
                using first-party data
            </h1>
            <p className='text-center text-xl my-6'>
                Relying on third party cookies in 2024 is reckless. Stop the Guesswork.
            </p>
            <Button className="text-base font-bold">
                Book a demo
            </Button>
        </section>
    )
}
