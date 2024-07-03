"use client"


import Image from 'next/image'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


export default function OneDashboardSection() {
    const ref = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <section className='my-24 lg:my-52 mx-auto max-w-5xl px-4'>
            <h1 className='flex items-center justify-center gap-2 lg:gap-3 font-extrabold text-center text-2xl lg:text-7xl'>
                One dashboard<Image src={"/icons/increasing.svg"} alt="logo" width={100} height={100} className="w-6 lg:w-14 object-contain" />
            </h1>
            <h1 className='font-extrabold text-center text-2xl lg:text-7xl'>
                to rule them all
            </h1>
            <p className='text-center text-base lg:text-xl my-6 px-4 max-w-xl mx-auto'>
                Seamlessly integrates with your preferred e-commerce platform and marketing channels.
            </p>
            <div className='flex items-center justify-center gap-6 lg:gap-10 '>
                <Image
                    src="/icons/google.svg"
                    alt="logo" width={100} height={100}
                    className="w-8 lg:w-12 object-contain" />
                <Image
                    src="/icons/meta.svg"
                    alt="logo" width={100} height={100}
                    className="w-8 lg:w-12 object-contain" />
                <Image
                    src="/icons/amazon.svg"
                    alt="logo" width={100} height={100}
                    className="w-8 lg:w-12 object-contain" />
                <Image
                    src="/icons/flipkart.svg"
                    alt="logo" width={100} height={100}
                    className="w-8 lg:w-12 object-contain" />
                <Image
                    src="/icons/shopify.svg"
                    alt="logo" width={100} height={100}
                    className="w-8 lg:w-12 object-contain" />
            </div>

            <Swiper
                modules={[Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                allowTouchMove={false}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                onSwiper={(swiper) => (ref.current = swiper)}
                onSlideChange={(e) => setActiveSlide(e.activeIndex)}
                className='border rounded-2xl bg-[#f9f9f9] mt-8 lg:mt-16 select-none'
            >
                <SwiperSlide>
                    <Image
                        src="https://images.ctfassets.net/mmu68mmhtb17/1pTLhcA3biEDOomsSXRo9n/c783ab0066ebae5326e006b5eeddace6/channels-slice-1.png"
                        alt="logo" width={2000} height={2000}
                        className="w-full lg:w-2/3 object-contain mt-8 lg:mt-16 mx-auto select-none" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="https://images.ctfassets.net/mmu68mmhtb17/4zMMJ6kSKeDaNr8T6pkrYd/f8209623755876b5ba7a2944b3505e41/channels-slice-2.png"
                        alt="logo" width={2000} height={2000}
                        className="w-full lg:w-2/3 object-contain mt-8 lg:mt-16 mx-auto select-none" />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="https://images.ctfassets.net/mmu68mmhtb17/4xGOMZscdeAv5Levdt3V7o/d5fd33e349591fdf26aaedf0c9eedd00/channels-slice-3.png"
                        alt="logo" width={2000} height={2000}
                        className="w-full lg:w-2/3 object-contain mt-8 lg:mt-16 mx-auto select-none" />
                </SwiperSlide>
            </Swiper>
            <div className='flex items-center mt-4 pt-4 gap-6'>
                {[{
                    title: 'Centralised Metrics',
                    description: 'Gain a holistic understanding with metrics like Blended ROAS, NCPA, CLTV, and Total Ad spends.',
                }, {
                    title: 'Simple and Customizable',
                    description: 'Simply drag-and-drop to arrange sections to fit your needs.',
                }, {
                    title: 'Custom reports for everyone',
                    description: 'Create custom reports with metrics that matter to you.',
                }].map((ele, i) => (
                    <div key={i} className={`w-full lg:w-1/3 border-t-2 pt-4 cursor-pointer ${activeSlide === i ? 'border-animate' : 'border-gray-300 hidden lg:block'}`}
                        onClick={() => {
                            if (ref.current) {
                                ref.current.slideTo(i);
                            }
                        }}>
                        <p className='font-extrabold text-xl mb-2'>
                            {ele?.title}
                        </p>
                        <p className='text-base line-clamp-2'>
                            {ele?.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
