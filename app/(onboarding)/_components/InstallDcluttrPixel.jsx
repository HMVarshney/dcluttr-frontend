"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import React from 'react'

export default function InstallDcluttrPixel() {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center px-14'>
            <h2 className='text-4xl font-bold mt-20'>
                Install Dcluttr Pixel
            </h2>
            <p className='text-xs mt-4 mb-10 w-1/2 text-center'>
                Dcluttr Pixel is essential for collecting data about your website visitors and customer journeys. It should be installed on every page you want to track.
            </p>
            <div className='border rounded-xl p-8 w-full'>
                <h4 className='text-base font-bold mb-5'>
                    Connect your Data
                </h4>
                <div className="grid grid-cols-2">
                    <div>
                        <p className='text-sm font-semibold mb-3'>
                            Shop Implementation
                        </p>
                        <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Hosted by Shopify / Standard" id="r2" />
                                <Label className="text-[#031b15d0] font-normal" htmlFor="r2">Hosted by Shopify / Standard</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Shopify Headless" id="r3" />
                                <Label className="text-[#031b15] font-normal" htmlFor="r3">Shopify Headless</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div>
                        <p className='text-sm font-semibold mb-3'>
                            Checkout
                        </p>
                        <RadioGroup defaultValue="comfortable">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Hosted by Shopify / Standard" id="r2" />
                                <Label className="text-[#031b15] font-normal" htmlFor="r2">Hosted by Shopify / Standard</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Shopify Headless" id="r3" />
                                <Label className="text-[#031b15] font-normal" htmlFor="r3">Shopify Headless</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <div className="my-8">
                    <p className='text-sm font-semibold mb-3'>
                        Do you have any third-party landing pages or other pages hosted on a sub-domain or different domain?
                    </p>
                    <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="r2" />
                            <Label className="text-[#031b15] font-normal" htmlFor="r2">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="r3" />
                            <Label className="text-[#031b15] font-normal" htmlFor="r3">No</Label>
                        </div>
                    </RadioGroup>
                </div>
                <Button>
                    Save Setup
                </Button>
            </div>
        </div>
    )
}
