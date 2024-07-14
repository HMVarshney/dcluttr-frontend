"use client"


import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FormSubmitButton, InputEmail, InputNumber, InputPassword, InputText } from './FormElements';
import Link from 'next/link';
import LoginWithGoogle from './LoginWithGoogle';
import { signUp } from "@/lib/store/features/authSlice";
import { useDispatch, useSelector } from 'react-redux';

export default function CreateAccount() {
    const dispatch = useDispatch();
    const ref = useRef()
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const isLoading = useSelector((state) => state.auth.loading);

    const onSubmit = (e) => {
        const data = { ...e, file: ref.current };
        dispatch(signUp(data));
    };
    return (
        <section className='h-[calc(100vh-66px)] flex items-center justify-center'>
            <div className='max-w-xl w-full'>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <h3 className='font-bold text-2xl'>
                        Create an Account
                    </h3>
                    <p className='text-sm font-light mt-1.5'>
                        Please provide your personal details, they will be used to complete your profile
                    </p>

                    {/* <input id="file" type="file" onChange={(e) => ref.current = e.target.files[0]} /> */}
                    <InputText
                        label="What's your name?"
                        placeholder="Enter your name"
                        register={register}
                        required="Please enter this input field"
                        name="name"
                        errors={errors['name']}
                        className="mt-10" />
                    <InputEmail
                        label="What's your business email?"
                        placeholder="Enter your business email"
                        register={register}
                        required="Please enter this input field"
                        name="email"
                        errors={errors['email']}
                        className="mt-2.5" />

                    <InputNumber
                        label="What’s your phone number?"
                        placeholder="Enter your phone number"
                        register={register}
                        required={false}
                        name="mobile"
                        errors={errors['mobile']}
                        className="mt-2.5" />

                    <InputPassword
                        label="Password"
                        placeholder="Enter your password"
                        register={register}
                        required="Please enter this input field"
                        name="password"
                        errors={errors['password']}
                        className="mt-2.5" />


                    <p className='text-xs my-3 text-center'>
                        By submitting this form, I acknowledge Dcluttr's <Link href={'/user-terms-of-service'} className='underline text-primary'>Terms of Service</Link> and <Link href={'/privacy-policy'} className='underline text-primary'>Privacy Policy</Link>
                    </p>

                    <FormSubmitButton
                        isLoading={isLoading}
                        text="Continue" />
                </form>
                <LoginWithGoogle />
            </div>
        </section>
    )
}
