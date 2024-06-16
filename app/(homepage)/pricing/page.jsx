


import React from 'react'
import ScaleItSection from '../_components/ScaleItSection'
import FAQsSection from '../_components/FAQsSection'
import TestimonialSection from '../_components/TestimonialSection'
import HeroSection from './_HeroSection'
import CarouselOfBrands from '../_components/CarouselOfBrands'

export default function page() {
    return (
        <main className="h-full">
            <HeroSection />
            <CarouselOfBrands />
            <TestimonialSection />
            <FAQsSection />
            <ScaleItSection />
        </main>
    )
}
