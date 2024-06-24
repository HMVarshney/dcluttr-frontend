

"use client"

import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { useRouter } from 'next/navigation';
import { FormSubmitButton, InputEmail, InputPassword } from '../_components/FormElements';
import OTPInput from 'react-otp-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import dynamic from 'next/dynamic';
const CustomCount = dynamic(() => import('./FormElements').then((mod) => mod.CustomCount), { ssr: false });


export function EnterEmail({ step, setStep }) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: "onBlur"
    });

    const [isLoading, setLoading] = useState(false);
    const onSubmit = (e) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
            // router.replace(`/dashboard`)
            setStep(2)
        }, 2000)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl w-full'>
            <h3 className='font-bold text-2xl'>
                Enter email id
            </h3>
            <p className='text-sm font-light mt-1.5'>
                Please enter your registered email id
            </p>
            <InputEmail
                label="Email ID"
                placeholder="Enter email ID"
                register={register}
                required="Please enter this input field"
                name="email"
                errors={errors['email']}
                className="mt-10 mb-4" />

            <FormSubmitButton
                isLoading={isLoading}
                text="Submit" />
        </form>
    );
}


export function OTPVerification({ step, setStep }) {
    const { handleSubmit, formState: { errors }, control, watch } = useForm({
        mode: "onBlur"
    });

    const [isDisabled, setDisabled] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [num, setNum] = useState(0);
    const onSubmit = (e) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
            // router.replace(`/dashboard`)
            setStep(3)
        }, 2000)
    }

    const handleResend = () => {
        setNum(pre => pre + 1);
        setDisabled(true);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl w-full'>
            <h3 className='font-bold text-2xl'>
                OTP Verification
            </h3>
            <p className='text-sm font-light mt-1.5'>
                Please enter the OTP (One-time Password) sent to your registered email address to complete your verification
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
    );
}

export function ChangePassword({ step, setStep }) {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: "onBlur"
    });

    const [isLoading, setLoading] = useState(false);
    const onSubmit = (e) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
            router.replace(`/log-in`)
        }, 2000)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl w-full'>
            <h3 className='font-bold text-2xl'>
                Change Password
            </h3>
            <p className='text-sm font-light mt-1.5'>
                Please enter and confirm your new password
            </p>

            <InputPassword
                label="New Password"
                placeholder="New Password"
                register={register}
                required="Please enter this input field"
                name="n_password"
                errors={errors['n_password']}
                className="mt-10"
                showForgetOption={false} />

            <InputPassword
                label="Confirm Password"
                placeholder="Confirm Password"
                register={register}
                required="Please enter this input field"
                name="c_password"
                errors={errors['c_password']}
                className="mt-2.5 mb-8"
                showForgetOption={false} />

            <FormSubmitButton
                isLoading={isLoading}
                text="Confirm" />
        </form>
    );
}
