import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div className="bg-black text-[#A1A1A1]">
            <div className="container px-4 py-8 md:py-12 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={1280}
                            height={400}
                            className="w-32 object-contain invert"
                        />
                        <div className="mt-4">
                            <p className='text-base leading-7'>
                                Yehlo Solutions Private Limited<br />
                                F-20, F/F PL Dubey Near Police Apartment Pankaj Grand, Mayur Vihar, Phase I, East Delhi, Delhi-110091
                            </p>
                        </div>
                    </div>
                    <div className="">
                        {/* <h2 className="text-xl font-bold">Product</h2> */}
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
