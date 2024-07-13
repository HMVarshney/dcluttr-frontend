"use client"


import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormSubmitButtonWithIcon, InputSelect, InputText } from '@/app/(auth)/_components/FormElements';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

export default function BrandDetails({ setStep }) {
    const router = useRouter()
    // const organizationDetails = useSelector((state) => state.dashboard.organizationDetails);
    // const orgId = organizationDetails?.id
    const ref = useRef()

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        mode: "onBlur"
    });

    const [isLoading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const onSubmit = (e) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        axiosInterceptorInstance
            .post(`/brand?name=${e.name}&monthlyAdSpend=${e.monthlyAdSpend}&website=${e.website}&orgId=${2}`, formData)
            .then((res) => {
                setLoading(false)
                setStep(3)
            })
    }
    return (
        <section className='h-[calc(100vh-66px)] flex items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl w-full'>
                <h3 className='font-bold text-2xl'>
                    Brand Details
                </h3>
                <p className='text-base mt-1.5'>
                    You’re just minutes away from transforming your data into profitable growth
                </p>
                <div className='flex mt-10 items-center' onClick={() => ref.current.click()}>
                    <Image
                        src={file ? URL.createObjectURL(file) : '/image_placeholder.svg'}
                        width={56}
                        height={56}
                        alt='dcluttr logo'
                        className="rounded-xl border"
                    />
                    <div className='ml-3'>
                        <div className='text-sm text-[#031B15] font-semibold'>Add Brand Image</div>
                        <div className='text-xs text-primary font-semibold'>Upload Image</div>
                    </div>
                    <input
                        ref={ref}
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        className="hidden"
                    />
                </div>
                <InputText
                    label="Enter Brand Name"
                    placeholder="Enter brand name"
                    register={register}
                    required="Please enter this input field"
                    name="name"
                    errors={errors['name']}
                    className="mt-10" />

                <InputText
                    label="Brand Website"
                    placeholder="Enter website URL"
                    register={register}
                    required="Please enter this input field"
                    name="website"
                    errors={errors['website']}
                    className="mt-2" />

                <InputSelect
                    label="Monthly Ad Spend"
                    placeholder="Select an option"
                    control={control}
                    required="Please enter this input field"
                    name="monthlyAdSpend"
                    errors={errors['monthlyAdSpend']}
                    className="mt-2 mb-12"
                    options={[
                        { value: "ZERO_TO_FOUR_LAC", label: "0-4L" },
                        { value: "FOUR_TO_TEN_LAC", label: "4-10L" },
                        { value: "TEN_TO_TWENTY_LAC", label: "10-20L" },
                        { value: "TWENTY_LAC_TO_ONE_CR", label: "20-100L" },
                        { value: "GREATER_THAN_ONE_CR", label: "100L+" },
                    ]} />

                <Button className='w-full'>
                    Continue
                </Button>
            </form>
        </section>
    )
}
