"use client"

import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormSubmitButton, InputEmail, InputNumber, InputPassword, InputText } from './FormElements';
import Link from 'next/link';
import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';

export default function OTPVerification({ setStep, email }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const [isLoading, setLoading] = useState(false);
    const onSubmit = (e) => {
        setLoading(true);
    }
    return (
        <section className='h-[calc(100vh-66px)] flex items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl w-full'>
                <h3 className='font-bold text-2xl'>
                    OTP Verification
                </h3>
                <p className='text-base mt-1.5'>
                    Please enter the OTP (One-time Password) sent to your registered email address to complete your verification
                </p>
                <p className='text-base mt-4'>
                    {email}
                </p>






                <FormSubmitButton
                    isLoading={isLoading}
                    text="Verify" />

                <Button className="w-full mt-3" variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <path d="M18.6712 8.368H18V8.33342H10.5V11.6667H15.2096C14.5225 13.6072 12.6762 15.0001 10.5 15.0001C7.73874 15.0001 5.49999 12.7613 5.49999 10.0001C5.49999 7.23883 7.73874 5.00008 10.5 5.00008C11.7746 5.00008 12.9342 5.48091 13.8171 6.26633L16.1742 3.90925C14.6858 2.52216 12.695 1.66675 10.5 1.66675C5.89791 1.66675 2.16666 5.398 2.16666 10.0001C2.16666 14.6022 5.89791 18.3334 10.5 18.3334C15.1021 18.3334 18.8333 14.6022 18.8333 10.0001C18.8333 9.44133 18.7758 8.89592 18.6712 8.368Z" fill="#FFC107" />
                        <path d="M3.12747 6.12133L5.86539 8.12925C6.60622 6.29508 8.40039 5.00008 10.5 5.00008C11.7746 5.00008 12.9341 5.48091 13.8171 6.26633L16.1741 3.90925C14.6858 2.52216 12.695 1.66675 10.5 1.66675C7.29914 1.66675 4.52331 3.47383 3.12747 6.12133Z" fill="#FF3D00" />
                        <path d="M10.5 18.3331C12.6525 18.3331 14.6084 17.5094 16.0871 16.1698L13.5079 13.9873C12.6432 14.645 11.5865 15.0007 10.5 14.9998C8.33252 14.9998 6.4921 13.6177 5.79877 11.689L3.08127 13.7827C4.46043 16.4815 7.26127 18.3331 10.5 18.3331Z" fill="#4CAF50" />
                        <path d="M18.6713 8.36784H18V8.33325H10.5V11.6666H15.2096C14.8809 12.5901 14.2889 13.3971 13.5067 13.9878L13.5079 13.987L16.0871 16.1695C15.9046 16.3353 18.8333 14.1666 18.8333 9.99992C18.8333 9.44117 18.7758 8.89575 18.6713 8.36784Z" fill="#1976D2" />
                    </svg>
                    <span className='ml-2'>Login with Google</span>
                </Button>
            </form>
        </section>
    )
}
