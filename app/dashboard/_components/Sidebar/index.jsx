import React from 'react'
import NewButton from './NewButton'
import List from './List'
import Profile from './Profile'




export default function SideBar() {
    return (
        <aside className='bg-white w-14 flex py-4 px-2 flex-col gap-y-4'>
            <List />
            <NewButton />
            <div className='h-full' />
            <Profile />
        </aside>
    )
}
