"use client";

import React, { useState } from "react";
import { RadioGroup } from "@/components/ui/radio-group";
import StepBox from "@/components/StepBox";
import { ChangePassword, EnterEmail, OTPVerification } from "../_components/ForgotPasswordForms";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    return (
        <main className="h-full">
            <div className="flex items-center justify-between py-5 px-12 border-b">
                <RadioGroup defaultValue={"true"} className="flex items-center space-x-2 ">
                    <StepBox isDisabled={step !== 1} label="Enter email id" isDone={step > 1} />
                    <hr className="w-4 border-black/20" />
                    <StepBox isDisabled={step !== 2} label="Verify OTP" isDone={step > 2} />
                    <hr className="w-4 border-black/20" />
                    <StepBox isDisabled={step !== 3} label="Change password" isDone={step > 3} />
                </RadioGroup>
            </div>

            <section className="h-[calc(100vh-66px)] flex flex-col items-stretch pt-44">
                {step === 1 && (
                    <Link href="/log-in">
                        <div className="text-sm mb-6 flex items-center w-2/3 mx-auto">
                            <ArrowLeft className="w-5 cursor-pointer" />
                            <span className="text-black font-light ml-2 ">Back</span>
                        </div>
                    </Link>
                )}
                {step === 2 && (
                    <div className="text-sm mb-6 flex items-center w-2/3 mx-auto" onClick={() => setStep(1)}>
                        <ArrowLeft className="w-5 cursor-pointer" />
                        <span className="text-black font-light ml-2 ">Back</span>
                    </div>
                )}
                <div className="w-2/3 mx-auto">
                    {step === 1 && <EnterEmail setStep={setStep} setEmail={setEmail} />}
                    {step === 2 && <OTPVerification setStep={setStep} email={email} />}
                    {step === 3 && <ChangePassword setStep={setStep} />}
                </div>
            </section>
        </main>
    );
}
