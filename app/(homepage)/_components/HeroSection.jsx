"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";


export default function HeroSection() {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.scrollY);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const calcX = offsetY => Math.min(100 + (offsetY / 3), window.innerWidth);
    const calcRotate = offsetY => offsetY / 50;

    const [{ x, rotate }, set] = useSpring(() => ({
        x: calcX(0),
        rotate: calcRotate(0)
    }));

    useEffect(() => {
        set({
            x: calcX(offsetY),
            rotate: calcRotate(offsetY)
        });
    }, [offsetY, set]);
    return (
        <section className='flex flex-col justify-center items-center'>
            <Button variant="outline" size="sm" className="text-xs font-bold mb-4 mt-28 shadow-sm">
                Dcluttr v1 is live now
            </Button>
            <h1 className='flex items-center gap-2 lg:gap-3 font-extrabold text-center text-2xl lg:text-7xl'>
                Advertise better<Image src={"/icons/megaphone.png"} alt="logo" width={100} height={100} className="w-8 lg:w-20 object-contain" />
            </h1>
            <h1 className='font-extrabold text-center text-2xl lg:text-7xl'>
                using first-party data
            </h1>
            <p className='text-center text-base lg:text-xl my-6'>
                Relying on third party cookies in 2024 is reckless. Stop the Guesswork.
            </p>
            <Button className="text-base font-bold">
                Book a demo
            </Button>


            <Marquee
                play={true}
                speed={90}
                delay={1}
                gradient={true}
                gradientWidth={10}
                gradientColor={[245, 245, 245]}
            // pauseOnHover
            >
                <div className='flex overflow-y-auto gap-x-12 py-16 lg:py-32 mx-4'>
                    {[...Array(20)]
                        .map((ele, i) =>
                            <Image key={i} src="/logo.svg" width={100} height={100} className='w-28 lg:w-40 object-contain' alt='icon' />
                        )}
                </div>
            </Marquee>




            <animated.img
                src="/bottom_right.webp"
                className="fixed w-0 lg:w-60"
                style={{
                    bottom: x.to(x => `${150 - x}px`),
                    right: x.to(x => `-${x - 200}px`),
                    transform: rotate.to(r => `rotate(${-r}deg)`),
                }}
                alt="Animated Scroll Image"
            />
            <animated.img
                src="/top_right.webp"
                className="fixed w-0 lg:w-52"
                style={{
                    bottom: x.to(x => `${300 - x}px`),
                    right: x.to(x => `-${(x * 1.2) - 100}px`),
                    transform: rotate.to(r => `rotate(${-r}deg)`),
                }}
                alt="Animated Scroll Image"
            />
            {/* <animated.img
                src="/logo.svg"
                className="fixed w-0 lg:w-52"
                style={{
                    bottom: x.to(x => `${600 - x}px`),
                    right: x.to(x => `-${(x * 1.2) - 100}px`),
                    transform: rotate.to(r => `rotate(${-r}deg)`),
                }}
                alt="Animated Scroll Image"
            /> */}

            <animated.img
                src="/bottom_left.webp"
                className="fixed w-0 lg:w-60"
                style={{
                    bottom: x.to(x => `${150 - x}px`),
                    left: x.to(x => `-${x - 200}px`),
                    transform: rotate.to(r => `rotate(${r}deg)`),
                }}
                alt="Animated Scroll Image"
            />
            <animated.img
                src="/top_left.webp"
                className="fixed w-0 lg:w-52"
                style={{
                    bottom: x.to(x => `${300 - x}px`),
                    left: x.to(x => `-${(x * 1.2) - 100}px`),
                    transform: rotate.to(r => `rotate(${r}deg)`),
                }}
                alt="Animated Scroll Image"
            />
            {/* <animated.img
                src="/logo.svg"
                className="fixed w-0 lg:w-52"
                style={{
                    bottom: x.to(x => `${500 - (x * 0.9)}px`),
                    left: x.to(x => `-${(x * 1.2) - 10}px`),
                    transform: rotate.to(r => `rotate(${r}deg)`),
                }}
                alt="Animated Scroll Image"
            /> */}
        </section>
    )
}

