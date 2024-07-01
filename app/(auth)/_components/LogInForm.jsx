"use client"


import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormSubmitButtonWithIcon, InputEmail, InputNumber, InputPassword, InputText } from './FormElements';
import Link from 'next/link';
import axiosInterceptorInstance from '@/lib/axiosInterceptorInstance';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from '@/lib/utils';

export default function LogInForm({ }) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        mode: "onBlur"
    });
    useEffect(() => {
        if (searchParams.get('token')) {
            setCookie('accessToken', searchParams.get('token'))
            router.replace(`/dashboard`)
        }
    }, [])


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

                <Button className="w-full mt-3" variant="outline" onClick={() => {
                    window.open(`${process.env.NEXT_PUBLIC_API_URL}oauth2/authorize/google?redirect_uri=http://localhost:3000/log-in`, "_self")
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                        <path d="M18.6712 8.368H18V8.33342H10.5V11.6667H15.2096C14.5225 13.6072 12.6762 15.0001 10.5 15.0001C7.73874 15.0001 5.49999 12.7613 5.49999 10.0001C5.49999 7.23883 7.73874 5.00008 10.5 5.00008C11.7746 5.00008 12.9342 5.48091 13.8171 6.26633L16.1742 3.90925C14.6858 2.52216 12.695 1.66675 10.5 1.66675C5.89791 1.66675 2.16666 5.398 2.16666 10.0001C2.16666 14.6022 5.89791 18.3334 10.5 18.3334C15.1021 18.3334 18.8333 14.6022 18.8333 10.0001C18.8333 9.44133 18.7758 8.89592 18.6712 8.368Z" fill="#FFC107" />
                        <path d="M3.12747 6.12133L5.86539 8.12925C6.60622 6.29508 8.40039 5.00008 10.5 5.00008C11.7746 5.00008 12.9341 5.48091 13.8171 6.26633L16.1741 3.90925C14.6858 2.52216 12.695 1.66675 10.5 1.66675C7.29914 1.66675 4.52331 3.47383 3.12747 6.12133Z" fill="#FF3D00" />
                        <path d="M10.5 18.3331C12.6525 18.3331 14.6084 17.5094 16.0871 16.1698L13.5079 13.9873C12.6432 14.645 11.5865 15.0007 10.5 14.9998C8.33252 14.9998 6.4921 13.6177 5.79877 11.689L3.08127 13.7827C4.46043 16.4815 7.26127 18.3331 10.5 18.3331Z" fill="#4CAF50" />
                        <path d="M18.6713 8.36784H18V8.33325H10.5V11.6666H15.2096C14.8809 12.5901 14.2889 13.3971 13.5067 13.9878L13.5079 13.987L16.0871 16.1695C15.9046 16.3353 18.8333 14.1666 18.8333 9.99992C18.8333 9.44117 18.7758 8.89575 18.6713 8.36784Z" fill="#1976D2" />
                    </svg>
                    <span className='ml-2'>Login with Google</span>
                </Button>
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
