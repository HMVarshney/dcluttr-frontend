


import { UsersRound } from 'lucide-react'
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default function Profile() {
    return (
        <div className='flex flex-col items-center justify-center gap-5'>
            <UsersRound className='text-icon cursor-pointer w-8 h-8' />
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}
