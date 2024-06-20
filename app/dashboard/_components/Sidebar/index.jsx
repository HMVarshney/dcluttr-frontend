import React from 'react'
import NewButton from './NewButton'
import List from './List'
import Profile from './Profile'



let data = [
    {
        id: 1,
        imageUrl: '/temp/boat_logo.png',
        name: 'Boat'
    }, {
        id: 2,
        imageUrl: '/temp/mama_earth_logo.png',
        name: 'Mama Earth'
    },
]
export default function SideBar() {
    return (
        <aside className='bg-white w-14 flex py-4 px-2 flex-col gap-y-4'>
            <List data={data} />
            <NewButton />
            <div className='h-full' />
            <Profile />
        </aside>
    )
}
