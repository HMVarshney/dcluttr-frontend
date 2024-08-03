"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { FormSubmitButtonWithIcon, InputEmail, InputPassword } from "./FormElements";
import Link from "next/link";
import { addDelay } from "@/lib/utils";
import LoginWithGoogle from "./LoginWithGoogle";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, resendOTP, setStep } from "@/lib/store/features/authSlice";
import { toast } from "sonner";

export default function LogInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({
        mode: "onBlur"
    });

    const isLoading = useSelector((state) => state.auth.loading);

    const onSubmit = (data) => {
        dispatch(login(data))
            .unwrap()
            .then(async () => {
                await addDelay(1000);
                router.replace(searchParams.get("redirect") || "/stores");
            })
            .catch(({ data, email }) => {
                console.log("after login", data, email);
                if (data?.errorCode === "EMAIL_NOT_VERIFIED") {
                    router.replace("/sign-up");
                    dispatch(setStep(2));
                    dispatch(resendOTP(email));
                    toast("", {
                        duration: 5000,
                        description: data?.message,
                        variant: "destructive"
                    });
                } else {
                    setError("password", {
                        type: "manual",
                        message: data?.message
                    });
                }
            });
    };

    return (
        <section className="h-[calc(100vh-66px)] flex pt-28 justify-center">
            <div className="max-w-xl w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-2xl">Login to your account</h3>
                    <p className="text-sm font-light mt-1.5">Please provide these details to login to your account</p>
                    <InputEmail
                        label="Email ID"
                        placeholder="Enter email id"
                        register={register}
                        required="Please enter this input field"
                        name="email"
                        errors={errors["email"]}
                        className="mt-10"
                    />
                    <InputPassword
                        label="Password"
                        placeholder="Enter password"
                        register={register}
                        required="Please enter this input field"
                        name="password"
                        errors={errors["password"]}
                        className="mt-2.5 mb-8"
                        showForgetOption={true}
                    />
                    <FormSubmitButtonWithIcon isLoading={isLoading} text="Login to Dcluttr" />
                </form>

                <LoginWithGoogle />
                <div className="my-6 flex items-center justify-evenly w-full">
                    <hr className="w-1/3" /> OR <hr className="w-1/3" />
                </div>

                <div className=" mb-3 text-sm text-center font-semibold w-full">Don't have an account?</div>
                <Link href="/sign-up">
                    <Button className="w-full" variant="outline">
                        Sign Up
                    </Button>
                </Link>
            </div>
        </section>
    );
}
