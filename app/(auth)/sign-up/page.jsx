"use client"
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CreateAccount from "../_components/CreateAccount";
import { useState } from "react";
import OTPVerification from "../_components/OTPVerification";
import OtherDetails from "../_components/OtherDetails";


export default function Home() {
  const [step, setStep] = useState(1);
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


export function StepBox({ label, isDisabled, isDone }) {
  return (
    <div className="flex items-center space-x-2">
      {isDone ?
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className="fill-primary">
          <path d="M9 0.875C7.39303 0.875 5.82214 1.35152 4.486 2.24431C3.14985 3.1371 2.10844 4.40605 1.49348 5.8907C0.87852 7.37535 0.717618 9.00901 1.03112 10.5851C1.34463 12.1612 2.11846 13.6089 3.25476 14.7452C4.39106 15.8815 5.8388 16.6554 7.4149 16.9689C8.99099 17.2824 10.6247 17.1215 12.1093 16.5065C13.594 15.8916 14.8629 14.8502 15.7557 13.514C16.6485 12.1779 17.125 10.607 17.125 9C17.1227 6.84581 16.266 4.78051 14.7427 3.25727C13.2195 1.73403 11.1542 0.877275 9 0.875ZM12.5672 7.56719L8.19219 11.9422C8.13415 12.0003 8.06522 12.0464 7.98934 12.0779C7.91347 12.1093 7.83214 12.1255 7.75 12.1255C7.66787 12.1255 7.58654 12.1093 7.51067 12.0779C7.43479 12.0464 7.36586 12.0003 7.30782 11.9422L5.43282 10.0672C5.31554 9.94991 5.24966 9.79085 5.24966 9.625C5.24966 9.45915 5.31554 9.30009 5.43282 9.18281C5.55009 9.06554 5.70915 8.99965 5.875 8.99965C6.04086 8.99965 6.19992 9.06554 6.31719 9.18281L7.75 10.6164L11.6828 6.68281C11.7409 6.62474 11.8098 6.57868 11.8857 6.54725C11.9616 6.51583 12.0429 6.49965 12.125 6.49965C12.2071 6.49965 12.2884 6.51583 12.3643 6.54725C12.4402 6.57868 12.5091 6.62474 12.5672 6.68281C12.6253 6.74088 12.6713 6.80982 12.7027 6.88569C12.7342 6.96156 12.7504 7.04288 12.7504 7.125C12.7504 7.20712 12.7342 7.28844 12.7027 7.36431C12.6713 7.44018 12.6253 7.50912 12.5672 7.56719Z" />
        </svg>
        : <RadioGroupItem value={(!isDisabled)?.toString()} id={label} disabled={isDisabled} />
      }
      <Label className={`text-xs ${isDone ? 'text-primary' : (isDisabled ? "text-black/50" : "text-black")}`} htmlFor={label}>{label}</Label>
    </div>
  )
}
