


import Image from 'next/image'
import React from 'react'

export default function DecluttrNotWorksInPhone() {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center max-w-sm mx-auto lg:hidden'>
            <Image
                src="/designer-desk.png"
                alt="phone"
                width={1000}
                height={1000}
                className="w-2/3 object-contain"
            />
            <h1 className='font-semibold -mt-8 text-lg text-center'>
                Decluttr works in the<br />
                desktop/laptop browser
            </h1>
            <h3 className='w-2/3 mt-4 text-xs text-center text-[#031B1580]'>
                We noticed that you’re trying to access Decluttr from a mobile device. Please access Decluttr from a desktop / laptop browser
            </h3>
        </div>
    )
}
