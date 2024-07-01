import { ChevronsUpDown } from 'lucide-react'
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
            <div className='h-9 border rounded-md w-full flex items-center gap-2 p-1.5' >
                <div className='text-[10px] bg-[#309E96] aspect-square min-w-6 content-center text-center rounded-md text-white'>
                    SS
                </div>
                <div className='text-sm font-semibold'>Start Struck by...</div>
                <ChevronsUpDown className='w-4 h-4 ml-auto' />
            </div>
        </div>
    )
}


