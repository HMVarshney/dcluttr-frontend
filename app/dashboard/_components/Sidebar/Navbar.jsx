import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='w-full p-4 border-b flex gap-4'>
            <Link href='/'>
                <Image
                    src="/logoIcon.svg"
                    alt="logo"
                    width={100}
                    height={100}
                    className='min-w-12 w-12 -m-[5px]'
                />
            </Link>
            <div className='h-9 border rounded-md w-full' />
        </div>
    )
}


