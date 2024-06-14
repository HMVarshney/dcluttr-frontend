import Image from 'next/image'
import React from 'react'

export default function Footer() {
    return (
        <div className="bg-black text-[#A1A1A1]">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-4">
                            <Image
                                src="/logo.svg"
                                alt="logo"
                                width={100}
                                height={25}
                                className="w-24 object-contain invert"
                            />
                            <h1 className="text-2xl font-bold">Logo</h1>
                        </div>
                        <div className="mt-4">
                            <p className='text-base leading-7'>
                                RetainIQ Global Inc<br />
                                1007 N Orange St. 4th Floor Suite #1558<br />
                                Wilmington DE, 19801, United States
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <h2 className="text-xl font-bold">Product</h2>
                        <ul>
                            <li className='text-base leading-7'>Enhanced Catalog Ads</li>
                            <li className='text-base leading-7'>Personalized Email Widgets</li>
                            <li className='text-base leading-7'>Catalog Ad Examples</li>
                            <li className='text-base leading-7'>Email Widget Examples</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


    )
}
