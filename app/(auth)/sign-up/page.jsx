"use client";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RadioGroup } from "@/components/ui/radio-group";
import CreateAccount from "../_components/CreateAccount";
import { useState } from "react";
import OTPVerification from "../_components/OTPVerification";
import OtherDetails from "../_components/OtherDetails";
import StepBox from "@/components/StepBox";
import { useSelector } from "react-redux";

export default function Home() {
    const { step } = useSelector((state) => state.auth);

    return (
        <main className="h-full">
            <div className="flex items-center justify-between py-2.5 px-12 border-b">
                <RadioGroup defaultValue={"true"} className="flex items-center space-x-2 ">
                    <StepBox isDisabled={step !== 1} label="Create account" isDone={step > 1} />
                    <hr className="w-4 border-black/20" />
                    <StepBox isDisabled={step !== 2} label="Verify" isDone={step > 2} />
                    <hr className="w-4 border-black/20" />
                    <StepBox isDisabled={step !== 3} label="TBD" isDone={step > 3} />
                </RadioGroup>

                <div className="mr-4 ml-auto text-sm">Already have an account?</div>
                <Hint label={"Already have an account?"} side="bottom">
                    <Link href="/log-in">
                        <Button className="hidden lg:block text-base font-bold">Login</Button>
                    </Link>
                </Hint>
            </div>
            {step === 1 && <CreateAccount />}
            {step === 2 && <OTPVerification />}
            {step === 3 && <OtherDetails />}
        </main>
    );
}
