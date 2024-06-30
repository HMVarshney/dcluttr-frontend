"use client"


import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormSubmitButtonWithIcon, InputSelect, InputText } from './FormElements';
import Link from 'next/link';
import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function OtherDetails({ setStep, setEmail }) {
    const router = useRouter()
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
            .post(`/organization/add?name=${e.organization_name}`, formData)
            .then((res) => {
                setLoading(false)
                router.replace(`/log-in`)
            })
    }
    return (
        <section className='h-[calc(100vh-66px)] flex items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl w-full'>
                <div className='text-sm mb-6 flex items-center'>
                    <ArrowLeft className='w-5 cursor-pointer' onClick={() => setStep(2)} /><span className='text-black font-light ml-2 '>Back</span>
                </div>

                <h3 className='font-bold text-2xl'>
                    Other details
                </h3>
                <p className='text-base mt-1.5'>
                    Please provide your personal details, they will be used to complete your profile
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
                        <div className='text-sm text-[#031B15] font-semibold'>Image</div>
                        <div className='text-xs text-primary font-semibold'>Add Image</div>
                    </div>
                    <input
                        ref={ref}
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        className="hidden"
                    />
                </div>
                <InputText
                    label="What’s your organization name?"
                    placeholder="Enter organization name"
                    register={register}
                    required="Please enter this input field"
                    name="organization_name"
                    errors={errors['organization_name']}
                    className="mt-10" />

                <InputSelect
                    label="Are you a brand or an agency / freelancer?"
                    placeholder="Select an option"
                    control={control}
                    required="Please enter this input field"
                    name="type"
                    errors={errors['type']}
                    className="mt-2"
                    options={[
                        { value: "Agency", label: "Agency" },
                        { value: "Freelancer", label: "Freelancer" },
                    ]} />

                <InputText
                    label="What’s your company website?"
                    placeholder="Enter website URL"
                    register={register}
                    required="Please enter this input field"
                    name="company website"
                    errors={errors['company website']}
                    className="mt-2" />



                <p className='text-xs my-3 text-center'>
                    By submitting this form, I acknowledge Dcluttr's <Link href={'/user-terms-of-service'} className='underline text-primary'>Terms of Service</Link> and <Link href={'/privacy-policy'} className='underline text-primary'>Privacy Policy</Link>
                </p>

                <FormSubmitButtonWithIcon
                    isLoading={isLoading}
                    text="Sign up" />
            </form>
        </section>
    )
}
