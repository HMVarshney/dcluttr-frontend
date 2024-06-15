


import React from 'react'
import ScaleItSection from '../_components/ScaleItSection'
import FAQsSection from '../_components/FAQsSection'
import TestimonialSEction from '../_components/TestimonialSEction'
import HeroSection from './_HeroSection'
import CarouselOfBrands from '@/components/CarouselOfBrands'

export default function page() {
    return (
        <main className="h-full">
            <HeroSection />
            <CarouselOfBrands />
            <TestimonialSEction />
            <FAQsSection />
            <ScaleItSection />
        </main>
    )
}
