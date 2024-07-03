"use client"

import { CircleArrowDown, CircleArrowUp, Clock3, TimerOff } from 'lucide-react';
import React from 'react'
import CountUp from 'react-countup';




const starts = [
    {
        icon: <CircleArrowDown className='mt-1 min-w-7 min-h-7 lg:min-w-11 lg:min-h-11 object-contain text-primary' />,
        text: 'average decrease in Customer Acquisition Cost (CAC)',
        num: 18,
        suffix: '%',
    },
    {
        icon: <Clock3 className='mt-1 min-w-7 min-h-7 lg:min-w-11 lg:min-h-11 object-contain text-primary ' />,
        text: 'average time saved per month with automated first-party data analytics',
        num: 60,
        suffix: 'h',
    },
    {
        icon: <CircleArrowUp className='mt-1 min-w-7 min-h-7 lg:min-w-11 lg:min-h-11 object-contain text-primary' />,
        text: 'average increase in Average Order Value (AOV)',
        num: 20,
        suffix: '%',
    }]



export default function PerformanceSection() {

    return (
        <section className='px-4 mx-auto my-24 lg:my-52 max-w-5xl'>
            {/* <div className='font-extrabold text-center text-3xl lg:text-5xl pb-8 lg:pb-14'>
                Real Performance that impact Bottomline
            </div> */}
            <div className='flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto items-start justify-between'>
                {starts?.map((start, i) =>
                    <div key={i} className='flex w-full gap-2'>
                        {start.icon}
                        <div
                            className='flex lg:flex-col flex-row justify-start gap-4 w-full'>
                            <CountUp
                                className='text-2xl lg:text-5xl font-extrabold'
                                start={0}
                                suffix={start.suffix}
                                end={start.num}
                                duration={5}
                                delay={2} />
                            <p className={`text-base leading-snug font-medium lg:basis-1/3 basis-2/3`}
                                dangerouslySetInnerHTML={{ __html: start.text }}>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
