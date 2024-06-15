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
        <div className='px-4 mx-auto my-12 max-w-5xl'>
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

            <div className='flex items-center justify-center mt-24 lg:mt-52 pb-4 lg:pb-6'>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="31" viewBox="0 0 48 31" fill="#027056">
                    <path d="M35.342 11.753c2.166-1.424 4.34-1.609 6.643-1.23 3.97.654 5.709 3.743 5.96 6.602a14.102 14.102 0 01-.925 6.404c-1.963 5.043-6.961 7.732-12.348 6.642a16.377 16.377 0 01-1.855-.5c-5.454-1.806-8.511-6.291-8.118-12.021.249-3.615 1.32-6.997 3.271-10.068 1.728-2.716 4.055-4.762 7.003-6.088C36.367.866 37.834.656 39.35.671c.522.006.89.246 1.163.642.83 1.2 1.156 2.595 1.45 3.987.099.467-.145.79-.622.98-.726.29-1.437.626-2.13.986-1.707.887-2.903 2.276-3.765 3.97-.043.083-.04.19-.102.515l-.002.002zM11.566 11.075c1.447.244 2.78.452 4.108.698.452.084.894.241 1.326.404 4.524 1.69 6.641 5.913 5.153 10.508-1.312 4.053-4.187 6.45-8.336 7.272-2.861.565-5.619.092-8.187-1.265C2.203 26.884.322 23.97.053 20.138c-.424-6.04 1.712-11.105 6.195-15.162A21.316 21.316 0 0112.546.998C13.593.57 14.708.283 15.82.058a2.923 2.923 0 013.399 2.065c.269.948.406 1.952.457 2.94.063 1.25-.188 1.498-1.425 1.637-2.685.3-4.739 1.634-6.318 3.775-.121.166-.216.353-.365.6h-.002z" >
                    </path>
                </svg>
            </div>
            <div className='font-extrabold text-center text-xl lg:text-3xl'>
                “To be able to see a user’s face, hear their voice, and sense their emotion when they’re talking—is incomparable.”
            </div>
            <p className="text-center text-sm lg:text-base font-bold mt-5">
                Becky White<br />
                <span className='text-xs font-normal'>Head of Design Research</span> <br />
                Canvas
            </p>
        </div>
    )
}
