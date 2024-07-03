"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';
import CarouselOfBrands from './CarouselOfBrands';


export default function HeroSection() {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleScroll = () => setOffsetY(window.scrollY);

            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);


    const [{ x, rotate }, set] = useSpring(() => ({
        x: 100,
        rotate: 0
    }));

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const calcX = offsetY => Math.min(100 + (offsetY / 1.5), window.innerWidth);
            const calcRotate = offsetY => offsetY / 30;

            set({
                x: calcX(offsetY),
                rotate: calcRotate(offsetY)
            });
        }
    }, [offsetY, set]);
    return (
        <section className='flex flex-col justify-center items-center'>
            <Button variant="outline" size="sm" className="text-xs font-bold mb-8 mt-32 lg:mt-40 shadow-sm">
                Dcluttr V1 is live now
            </Button>
            <h1 className='flex items-center justify-center gap-2 lg:gap-3 font-extrabold text-center text-3xl lg:text-7xl'>
                Advertise better<Image src={"/icons/megaphone.svg"} alt="logo" width={100} height={100} className="w-8 lg:w-20 object-contain" />
            </h1>
            <h1 className='font-extrabold text-center text-3xl lg:text-7xl'>
                using first-party data
            </h1>
            <p className='text-center text-base lg:text-xl my-8 font-medium'>
                Relying on third party cookies in 2024 is reckless. Stop the guesswork.
            </p>
            <Button className="text-base font-bold">
                Book a free demo
            </Button>

            {/* <CarouselOfBrands /> */}


            <animated.img
                src="/bottom_right.webp"
                className="fixed w-0 lg:w-72"
                style={{
                    bottom: x.to(x => `${100 - x}px`),
                    right: x.to(x => `${100 - x}px`),
                    transform: rotate.to(r => `rotate(${-r}deg)`),
                }}
                alt="Animated Scroll Image"
            />
            <animated.img
                src="/top_right.webp"
                className="fixed w-0 lg:w-56"
                style={{
                    bottom: x.to(x => `${260 - x}px`),
                    right: x.to(x => `${100 - x}px`),
                    transform: rotate.to(r => `rotate(${-r}deg)`),
                }}
                alt="Animated Scroll Image"
            />

            <animated.img
                src="/bottom_left.webp"
                className="fixed w-0 lg:w-72"
                style={{
                    bottom: x.to(x => `${100 - x}px`),
                    left: x.to(x => `${100 - x}px`),
                    transform: rotate.to(r => `rotate(${r}deg)`),
                }}
                alt="Animated Scroll Image"
            />
            <animated.img
                src="/top_left.webp"
                className="fixed w-0 lg:w-56"
                style={{
                    bottom: x.to(x => `${260 - x}px`),
                    left: x.to(x => `-${(x * 1.2) - 100}px`),
                    transform: rotate.to(r => `rotate(${r}deg)`),
                }}
                alt="Animated Scroll Image"
            />
        </section>
    )
}

