

import Image from 'next/image'
import React from 'react'
import Marquee from 'react-fast-marquee'

export default function CarouselOfBrands({ my = 'my-16 lg:my-32' }) {
    return (
        <Marquee
            play={true}
            speed={90}
            delay={0}
            gradient={true}
            gradientWidth={100}
            gradientColor={'white'}
            className={`max-w-2xl mx-auto ${my}`}
        >
            <div className='flex overflow-y-auto gap-x-12 mx-4'>
                {[...Array(20)]
                    .map((ele, i) =>
                        <Image key={i} src="/logo.svg" width={100} height={100} className='w-28 lg:w-40 object-contain' alt='icon' />
                    )}
            </div>
        </Marquee>
    )
}
