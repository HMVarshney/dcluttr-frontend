import { ChevronsUpDown } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'


export default function Navbar({ isOpen }) {
    return (
        <div className='w-full p-4 border-b flex gap-4'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='h-9 border rounded-md w-full flex items-center gap-2 p-1.5 cursor-pointer' >
                        <div className='text-[10px] bg-[#309E96] aspect-square min-w-6 content-center text-center rounded-md text-white'>
                            SS
                        </div>
                        <div className={cn('text-sm font-semibold transition-all max-w-96 opacity-100 line-clamp-1', { 'max-w-0 opacity-0': isOpen })}>Start Struck by...</div>
                        <ChevronsUpDown className='w-4 h-4 ml-auto' />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                    <DropdownMenuLabel>Select brand</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Perfora</DropdownMenuItem>
                    <DropdownMenuItem>Boat</DropdownMenuItem>
                    <DropdownMenuItem>Mama Earth</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}


