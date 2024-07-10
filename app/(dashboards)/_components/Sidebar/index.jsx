import React from 'react'
import NewButton from './NewButton'
import List from './List'
import Profile from './Profile'
import Link from 'next/link'
import Image from 'next/image'




export default function SideBar() {
    return (
        <div className='h-full'>
            <div className='border-b py-[9.3px]'>
                <Link href='/'>
                    <Image
                        src="/logoIcon.svg"
                        alt="logo"
                        width={100}
                        height={100}
                        className='min-w-12 w-12 mx-auto'
                    />
                </Link>
            </div>
            <aside className='bg-white w-14 flex py-4 px-2 flex-col gap-y-4 h-[calc(100%-70px)]'>
                <List />
                <NewButton />
                <div className='h-full' />
                <Profile />
            </aside>
        </div>
    )
}
