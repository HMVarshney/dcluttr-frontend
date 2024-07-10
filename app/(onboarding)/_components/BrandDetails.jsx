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

export default function BrandDetails() {
    const router = useRouter()
    const ref = useRef()

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        mode: "onBlur"
    });

    const [isLoading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const onSubmit = (e) => {
        setLoading(true);
        // const formData = new FormData();
        // formData.append('file', file);
        // axiosInterceptorInstance
        //     .post(`/organization/add?name=${e.organization_name}`, formData)
        //     .then((res) => {
        setLoading(false)
        // router.replace(`/log-in`)
        // })
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
                    name="brand_name"
                    errors={errors['brand_name']}
                    className="mt-10" />

                <InputText
                    label="Brand Website"
                    placeholder="Enter website URL"
                    register={register}
                    required="Please enter this input field"
                    name="brand_website"
                    errors={errors['brand_website']}
                    className="mt-2" />

                <InputSelect
                    label="Monthly Ad Spend"
                    placeholder="Select an option"
                    control={control}
                    required="Please enter this input field"
                    name="spend"
                    errors={errors['spend']}
                    className="mt-2 mb-12"
                    options={[
                        { value: "50K", label: "50K" },
                        { value: "100K", label: "100K" },
                        { value: "500K", label: "500K" },
                    ]} />

                <Button className='w-full'>
                    Continue
                </Button>
            </form>
        </section>
    )
}
