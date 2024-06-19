"use client"

import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { FormSubmitButton } from './FormElements';
import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { Label } from '@/components/ui/label';
import OTPInput from 'react-otp-input';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
import { ArrowLeft } from 'lucide-react';
const CustomCount = dynamic(() => import('./FormElements').then((mod) => mod.CustomCount), { ssr: false });


export default function OTPVerification({ setStep, email }) {
    const { handleSubmit, formState: { errors }, control, watch } = useForm({
        mode: "onBlur"
    });

    const [isLoading, setLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const [num, setNum] = useState(0);
    const onSubmit = (e) => {
        console.log(e);

        setLoading(true);
        setTimeout(() => {
            setLoading(false)
            setStep(3);
        }, 2000)
    }

    const handleResend = () => {
        setNum(pre => pre + 1);
        setDisabled(true);
    }
    return (
        <section className='h-[calc(100vh-66px)] flex pl-28 pt-28'>
            <form onSubmit={handleSubmit(onSubmit)} className='max-w-md w-full'>
                <div className='text-sm mb-6 flex items-center'>
                    <ArrowLeft className='w-5 cursor-pointer' onClick={() => setStep(1)} /><span className='text-black font-light ml-2 '>Back</span>
                </div>
                <h3 className='font-bold text-2xl'>
                    OTP Verification
                </h3>
                <p className='text-base font-light mt-1.5'>
                    Please enter the OTP (One-time Password) sent to your registered email address to complete your verification
                </p>
                <p className='text-base mt-4'>
                    {email}<span className='text-primary underline font-semibold ml-5 cursor-pointer'
                        onClick={() => setStep(1)}>Change</span>
                </p>


                <div className="grid w-full items-center gap-2 mt-10">
                    <Label htmlFor='otp' className={`text-black text-sm `}>
                        Enter the OTP
                    </Label>
                    <Controller
                        control={control}
                        name="otp"
                        render={({ field }) => <OTPInput
                            inputStyle={{
                                width: '44px',
                                height: '40px',
                                fontSize: '16px',
                            }}
                            className='text-primary'
                            placeholder="000000"
                            value={watch('otp')}
                            name="otp"
                            onChange={field.onChange}
                            numInputs={6}
                            renderSeparator={<div className='w-3'></div>}
                            renderInput={(props) => <Input {...props} />}
                        />}
                    />
                </div>
                <p className='text-xs mt-2 mb-10'>
                    Didn't receive the code? <button onClick={handleResend} disabled={isDisabled} className='disabled:text-black/50 text-primary underline'>Resend</button><CustomCount sec={10} onComplete={() => setDisabled(false)} key={num} num={num} />
                    {/* //TODO 60 secs */}
                </p>


                <FormSubmitButton
                    isLoading={isLoading}
                    text="Verify" />
            </form>
        </section>
    )
}
