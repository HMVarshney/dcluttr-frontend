"use client"


import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormSubmitButtonWithIcon, InputEmail, InputNumber, InputPassword, InputText } from './FormElements';
import Link from 'next/link';
import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { setCookie } from '@/lib/utils';
import LoginWithGoogle from './LoginWithGoogle';

export default function LogInForm({ }) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        mode: "onBlur"
    });



    const [isLoading, setLoading] = useState(false);
    const onSubmit = (e) => {
        setLoading(true);
        axiosInterceptorInstance.post('/auth/login', e)
            .then((res) => {
                if (res.data?.accessToken) {
                    setCookie('accessToken', res.data?.accessToken)
                    router.replace(`/dashboard`)
                }
            }).catch((err) => {
                console.log(err)
                setError('password', {
                    type: 'manual',
                    message: err.response.data.message
                })
            }).finally(() => setLoading(false))
    }
    return (
        <section className='h-[calc(100vh-66px)] flex pt-28 justify-center'>
            <div className='max-w-xl w-full'>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h3 className='font-bold text-2xl'>
                        Login to your account
                    </h3>
                    <p className='text-sm font-light mt-1.5'>
                        Please provide your personal details, they will be used to complete your profile
                    </p>
                    <InputEmail
                        label="Email ID"
                        placeholder="Enter email ID"
                        register={register}
                        required="Please enter this input field"
                        name="email"
                        errors={errors['email']}
                        className="mt-10" />

                    <InputPassword
                        label="Password"
                        placeholder="Enter password"
                        register={register}
                        required="Please enter this input field"
                        name="password"
                        errors={errors['password']}
                        className="mt-2.5 mb-8"
                        showForgetOption={true} />


                    <FormSubmitButtonWithIcon
                        isLoading={isLoading}
                        text="Login to Dcluttr" />
                </form>

                <LoginWithGoogle />
                <div className='my-6 flex items-center justify-evenly w-full'>
                    <hr className='w-1/3' /> OR <hr className='w-1/3' />
                </div>

                <div className=' mb-3 text-sm text-center font-semibold w-full'>
                    Don’t have an account?
                </div>
                <Link href='/sign-up'>
                    <Button className="w-full" variant="outline">
                        Sign In
                    </Button>
                </Link>
            </div>
        </section>
    )
}
