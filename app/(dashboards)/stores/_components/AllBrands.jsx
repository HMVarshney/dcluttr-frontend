

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { Gear } from 'phosphor-react'
import React from 'react'

export default function AllBrands() {
    return (
        <>
            <div className='flex items-center justify-center gap-2 p-6 '>
                <div className='mr-auto'>
                    <div className=' text-xl font-bold'>
                        All Brands
                    </div>
                    <div className='text-[#4F4D55] text-xs'>
                        Find all the brand for store
                    </div>
                </div>
                <Button variant="default" >
                    <Plus className='w-4 h-4 mr-2' />
                    <div className='font-medium text-sm'>
                        Add a new store
                    </div>
                </Button>
            </div>
            <div className='flex flex-col items-stretch justify-center gap-6  px-6 '>
                {[1, 2, 3,].map((item, index) => (
                    <div key={index} className='flex items-center justify-center gap-2 py-6 px-4 bg-white rounded-lg shadow'>
                        <Image
                            src="/temp/mama_earth_logo.png"
                            width={400}
                            height={400}
                            className='rounded-lg border w-36 h-20 object-contain'
                        />
                        <div className='mr-auto ml-4'>
                            <div className=' text-base font-semibold'>
                                Mama earth
                            </div>
                            <div className='text-[#919191] text-sm underline'>
                                www.mamaearth.com
                            </div>
                        </div>
                        <Button variant="outline" >
                            Go to dashboard
                        </Button>
                        <Button variant="icon" >
                            <Gear size={24} />
                        </Button>
                    </div>
                ))}
            </div>

        </>
    )
}
