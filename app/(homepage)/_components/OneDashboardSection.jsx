


import Image from 'next/image'
import React from 'react'


export default function OneDashboardSection() {
    return (
        <section className='my-24 lg:my-52'>
            <h1 className='flex items-center justify-center gap-2 lg:gap-3 font-extrabold text-center text-2xl lg:text-7xl'>
                One dashboard<Image src={"/icons/increasing.png"} alt="logo" width={100} height={100} className="w-6 lg:w-14 object-contain" />
            </h1>
            <h1 className='font-extrabold text-center text-2xl lg:text-7xl'>
                to rule them all
            </h1>
            <p className='text-center text-base lg:text-xl my-6 px-4 max-w-lg mx-auto'>
                Unified dashboard which seamlessly integrates with your preferred ecommerce platform and marketing channels
            </p>
            <div className='flex items-center justify-center gap-6 lg:gap-10 '>
                <Image
                    src="https://www.dcluttr.tech/images/graphics/google.png"
                    alt="logo" width={100} height={100}
                    className="w-8 lg:w-12 object-contain" />
                <Image
                    src="https://www.dcluttr.tech/images/graphics/meta.png"
                    alt="logo" width={100} height={100}
                    className="w-8 lg:w-12 object-contain" />
                <Image
                    src="https://www.dcluttr.tech/images/graphics/amazon.png"
                    alt="logo" width={100} height={100}
                    className="w-8 lg:w-12 object-contain" />
                <Image
                    src="https://www.dcluttr.tech/images/graphics/flipkart.png"
                    alt="logo" width={100} height={100}
                    className="w-8 lg:w-12 object-contain" />
                <Image
                    src="https://www.dcluttr.tech/images/graphics/shopify.png"
                    alt="logo" width={100} height={100}
                    className="w-8 lg:w-12 object-contain" />
            </div>
            {/* TODO/// carousel */}
        </section>
    )
}
