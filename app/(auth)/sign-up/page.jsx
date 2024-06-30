"use client"
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RadioGroup } from "@/components/ui/radio-group"
import CreateAccount from "../_components/CreateAccount";
import { useState } from "react";
import OTPVerification from "../_components/OTPVerification";
import OtherDetails from "../_components/OtherDetails";
import StepBox from "@/components/StepBox";


export default function Home() {
  const [step, setStep] = useState(3);
  const [email, setEmail] = useState('');
  return (
    <main className="h-full">
      <div className="flex items-center justify-between py-2.5 px-12 border-b">
        <RadioGroup defaultValue={"true"} className="flex items-center space-x-2 ">
          <StepBox
            isDisabled={step !== 1}
            label="Create Account"
            isDone={step > 1}
          />
          <hr className="w-4 border-black/20" />
          <StepBox
            isDisabled={step !== 2}
            label="Verification"
            isDone={step > 2}
          />
          <hr className="w-4 border-black/20" />
          <StepBox
            isDisabled={step !== 3}
            label="Other Details"
            isDone={step > 3}
          />
        </RadioGroup>

        <div className="mr-4 ml-auto text-sm">
          Already have an account?
        </div>
        <Hint label={'Already have an account?'} side="bottom">
          <Link href='/log-in'>
            <Button className="hidden lg:block text-base font-bold">
              Login
            </Button>
          </Link>
        </Hint>
      </div>
      {step === 1 && <CreateAccount setStep={setStep} setEmail={setEmail} />}
      {step === 2 && <OTPVerification setStep={setStep} email={email} />}
      {step === 3 && <OtherDetails setStep={setStep} />}
    </main>
  );
}


