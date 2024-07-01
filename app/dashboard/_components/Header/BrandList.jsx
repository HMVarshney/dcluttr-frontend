"use client"
import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, PcCase, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BrandList() {
    const buttonContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scrollRight = () => {
        if (buttonContainerRef.current) {
            buttonContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };

    const scrollLeft = () => {
        if (buttonContainerRef.current) {
            buttonContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (buttonContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = buttonContainerRef.current;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
            }
        };

        if (buttonContainerRef.current) {
            buttonContainerRef.current.addEventListener('scroll', handleScroll);
            handleScroll();
        }

        return () => {
            if (buttonContainerRef.current) {
                buttonContainerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className='relative w-[calc(100vw-772px)] scrollbar-hide'>
            <div
                ref={buttonContainerRef}
                className='w-full border rounded-xl flex gap-2 bg-[#FAFAFA] p-[3px] overflow-x-auto scrollbar-hide'
            >
                <Button variant={'default'} size="xs">
                    <Home className='w-4 h-4 mr-1' />
                    <div className='font-medium text-sm'>
                        Home
                    </div>
                </Button>
                {[...Array(8)].map((_, index) => (
                    <Button key={index} variant={'ghost'} size="xs" className={'text-[#031B15B2]'}>
                        <PcCase className='w-4 h-4 mr-1' />
                        <div className='font-medium text-sm'>
                            Dcluttr Pixel
                        </div>
                    </Button>
                ))}
            </div>


            <div className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10 rounded border overflow-hidden flex items-center'>
                <button onClick={scrollLeft} className='disabled:text-[#031B154D] bg-white disabled:bg-[#FAFAFA]' disabled={!canScrollLeft}>
                    <ChevronLeft className='w-5 h-5' />
                </button>
                <button onClick={scrollRight} className='disabled:text-[#031B154D] bg-white disabled:bg-[#FAFAFA]' disabled={!canScrollRight}>
                    <ChevronRight className='w-5 h-5' />
                </button>
            </div>

        </div>
    );
}
