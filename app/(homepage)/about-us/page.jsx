

import CarouselOfBrands from '../_components/CarouselOfBrands'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <main className="h-full my-16 mx-auto max-w-5xl px-4 flex flex-col items-center">
            <h1 className='font-extrabold text-4xl lg:text-7xl'>
                About us
            </h1>
            <p className='text-base lg:text-xl my-6 lg:my-10 text-center'>
                We’re a rapidly growing global company helping organizations improve the quality of their products and services through the power of customer understanding.
            </p>
            <div className='w-full flex gap-4 lg:gap-12 justify-center'>
                <div className='w-[240px]'>
                    <Image
                        src="https://www.dcluttr.tech/images/team/ritvik.png"
                        alt="logo" width={1000} height={1000}
                        className="w-full object-contain rounded-xl overflow-hidden " />
                    <div className='w-full py-4 text-base lg:text-lg '>
                        <p className='font-bold'>Ritvik Nagpal</p>
                        <p className='font-medium'>Co-Founder</p>
                        <p className='font-medium text-[#004125]'>
                            Ex Microsoft
                        </p>
                    </div>
                </div>
                <div className='w-[240px]'>
                    <Image
                        src="https://www.dcluttr.tech/images/team/satwik.png"
                        alt="logo" width={1000} height={1000}
                        className="w-full object-contain rounded-xl overflow-hidden " />
                    <div className='w-full py-4 text-base lg:text-lg '>
                        <p className='font-bold'>Satwik Bhardwaj</p>
                        <p className='font-medium'>Co-Founder</p>
                        <p className='font-medium text-[#004125]'>
                            Ex Walmart, Acciojob
                        </p>
                    </div>
                </div>
            </div>
            <Button className="text-base font-bold my-6 lg:my-8 px-8">
                Join us
            </Button>

            <div className='flex flex-col lg:flex-row gap-4 lg:gap-12 w-full my-12'>
                <Image
                    src="https://images.ctfassets.net/mmu68mmhtb17/1baDaNvteg9Tj0DGlEHKbX/e42ff21fac1c5651a6b8fa91e6625bc2/founders-one.jpg"
                    alt="logo" width={1000} height={1000}
                    className="w-full object-contain rounded-xl overflow-hidden order-1" />

                <div className='w-full order-2'>
                    <p className='font-extrabold text-xl lg:text-4xl lg:mb-6'>It all started in 2017</p>
                    <p className='font-medium text-base lg:text-lg'>Dovetail was started in 2017 by Benjamin Humphrey and Bradley Ayers. They founded Dovetail with a belief that deep customer understanding is the secret ingredient to building great products.</p>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-4 lg:gap-12 w-full my-12'>
                <Image
                    src="https://images.ctfassets.net/mmu68mmhtb17/2eR9FgK1LlSfdDJEYASjkS/6898261c1eaceae3a1ce9a2b61019051/company.png"
                    alt="logo" width={1000} height={1000}
                    className="w-full object-contain rounded-xl overflow-hidden order-1 lg:order-2 " />
                <div className='w-full order-2 lg:order-1'>
                    <p className='font-extrabold text-xl lg:text-4xl lg:mb-6'>We’re on a mission</p>
                    <p className='font-medium text-base lg:text-lg'>Dovetail has grown a lot thanks to our 3,200+ happy customers. We believe that every single organization conducts research of some form. Our mission is to improve the quality of every thing.</p>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-4 lg:gap-12 w-full my-12'>
                <Image
                    src="https://images.ctfassets.net/mmu68mmhtb17/17zHRkEIMZ7mBsdAD8kUeQ/edd666f3a46ceee584974e1b18c8338e/Company-Join-the-team.png"
                    alt="logo" width={1000} height={1000}
                    className="w-full object-contain rounded-xl overflow-hidden order-1" />

                <div className='w-full order-2'>
                    <p className='font-extrabold text-xl lg:text-4xl lg:mb-6'>Join our team</p>
                    <p className='font-medium text-base lg:text-lg'>Help us build the future of research and work on an exciting platform with thousands of fans worldwide, from our Sydney and San Francisco offices.</p>
                    <Button className="text-base font-bold my-8 px-8">
                        Join us
                    </Button>
                </div>
            </div>
            <div className='font-extrabold text-2xl lg:text-5xl mt-12'>
                A few of our customers
            </div>
            <CarouselOfBrands my="my-12" />

        </main>
    )
}
