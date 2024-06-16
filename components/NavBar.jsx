import React from 'react'
import { Button } from './ui/button'
import Hint from './Hint'
import Image from 'next/image'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AlignRight } from 'lucide-react'
import Link from 'next/link'



export default function NavBar() {
    return (
        <nav className="flex flex-row justify-between py-2 px-4 sticky top-0 bg-white z-[10] border-b">
            <div className='w-[240px] flex items-center'>
                <Link href='/'>
                    <Image
                        src="/logo.svg"
                        alt="logo"
                        width={100}
                        height={25}
                        className="w-32 object-contain"
                    />
                </Link>
            </div>
            <div className='hidden lg:flex gap-4'>
                <Link href='/pricing'>
                    <Button variant="ghost" className="text-base font-bold">
                        Pricing
                    </Button>
                </Link>
                <Link href='/blogs'>
                    <Button variant="ghost" className="text-base font-bold">
                        Blog
                    </Button>
                </Link>
            </div>
            <div className='flex gap-4'>
                <Hint
                    label={'Have a account?'}
                    side="bottom"
                >
                    <Button variant="ghost" className="hidden lg:block text-base font-bold">
                        Login
                    </Button>
                </Hint>
                <Button className="text-base font-bold">
                    Book a demo
                </Button>
                <Sheet>
                    <SheetTrigger>
                        <AlignRight className='text-3xl text-primary lg:hidden block ' />
                    </SheetTrigger>
                    <SheetContent>
                        <div className='flex flex-col items-start justify-stretch gap-4 mt-8'>
                            <Link href='/pricing'>
                                <Button variant="ghost" className="text-base font-bold">
                                    Pricing
                                </Button>
                            </Link>
                            <Link href='/blogs'>
                                <Button variant="ghost" className="text-base font-bold">
                                    Blog
                                </Button>
                            </Link>
                            <Button variant="ghost" className="text-base font-bold">
                                Login
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
