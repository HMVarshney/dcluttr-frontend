"use client"


import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormSubmitButton, InputEmail, InputNumber, InputPassword, InputText } from './FormElements';
import Link from 'next/link';
import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';

export default function OtherDetails({ setStep, setEmail }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const [isLoading, setLoading] = useState(false);
    const onSubmit = (e) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
            setEmail(e.email)
            setStep(2)
        }, 2000)
        // axiosInterceptorInstance.post('/auth/signup',
        //     {
        //         "name": e.name,
        //         "email": e.email,
        //         "password": e.password,
        //         "mobile": e.mobile,
        //     })
        //     .then((res) => {
        //         console.log(res);
        //         setEmail(e.email)
        //         axiosInterceptorInstance.post('/auth/otp/generate',
        //             {
        //                 "email": e.email
        //             }).then((res) => {
        //                 setStep(2)
        //             }).catch((err) => {
        //                 console.log(err);
        //             }).finally(() => {
        //                 setLoading(false)
        //             })
        //     })
        //     .catch((err) => {
        //         setLoading(false)
        //         console.log(err);
        //     })
    }
    return (
        <section className='h-[calc(100vh-66px)] flex items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl w-full'>
                <h3 className='font-bold text-2xl'>
                    Other details
                </h3>
                <p className='text-base mt-1.5'>
                    Please provide your personal details, they will be used to complete your profile
                </p>
                <InputText
                    label="What’s your organization name?"
                    placeholder="Enter organization name"
                    register={register}
                    required="Please enter this input field"
                    name="organization name"
                    errors={errors['organization name']}
                    className="mt-10" />

                <InputText
                    label="Are you a brand or an agency / freelancer?"
                    placeholder="Select an option"
                    register={register}
                    required="Please enter this input field"
                    name="type"
                    errors={errors['type']}
                    className="mt-2" />

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

                <FormSubmitButton
                    isLoading={isLoading}
                    text="Sign up" />
            </form>
        </section>
    )
}
