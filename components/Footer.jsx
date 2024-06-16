import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div className="bg-black text-[#A1A1A1]">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={1280}
                            height={400}
                            className="w-32 object-contain invert"
                        />
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
                            <li className='text-base leading-7'>
                                <Link href="/blogs">Blogs</Link>
                            </li>
                            <li className='text-base leading-7'>
                                <Link href="/pricing">Pricing</Link>
                            </li>
                            <li className='text-base leading-7'>
                                <Link href="/privacy-policy">Privacy policy</Link>
                            </li>
                            <li className='text-base leading-7'>
                                <Link href="/user-terms-of-service">Terms & Conditions</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
