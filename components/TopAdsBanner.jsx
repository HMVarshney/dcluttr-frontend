import React from 'react'
import Image from 'next/image';

export default function TopAdsBanner() {
    return (
        <div className=' py-3 px-6'>
            <Image src="/temp/header_banner.png"
                alt="header"
                className='w-full  object-contain'
                width={2000}
                height={400}
                priority
            />
        </div>
    )
}
