import React from 'react'
import NewButton from './NewButton'
import List from './List'

export default function SideBar() {
    return (
        <aside className='fixed z-[1] left-0 bg-white h-full w-14 flex p-3 flex-col gap-y-4'>
            <List />
            <NewButton />
        </aside>
    )
}
