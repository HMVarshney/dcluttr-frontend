"use client"

import Image from 'next/image';
import React from 'react'
import CountUp from 'react-countup';




const starts = [
    {
        text: 'Average increase in<br/>Catalog Ad ROAS',
        num: 37,
        suffix: '%',
    },
    {
        text: 'Average increase in<br/>email Attribution revenue',
        num: 32,
        suffix: '%',
    },
    {
        text: 'Average return on<br/>Investment',
        num: 23,
        suffix: 'x',
    }]



export default function PerformanceSection() {

    return (
        <section className='px-4 mx-auto my-12 max-w-5xl'>
            <div className='font-extrabold text-center text-3xl lg:text-5xl pb-8 lg:pb-14'>
                Real Performance that impact Bottomline
            </div>
            <div className='flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto items-center justify-between'>
                {starts?.map((start, i) =>
                    <div key={i}
                        className='flex lg:flex-col flex-row items-center justify-center gap-4 lg:justify-start w-full'>
                        <CountUp
                            className='text-2xl lg:text-7xl font-extrabold'
                            start={0}
                            suffix={start.suffix}
                            end={start.num}
                            duration={5}
                            delay={2} />
                        <p className={`text-base text-center lg:text-xl leading-snug font-medium lg:basis-1/3 basis-2/3`}
                            dangerouslySetInnerHTML={{ __html: start.text }}>

                        </p>
                    </div>
                )}
            </div>
        </section>
    )
}
