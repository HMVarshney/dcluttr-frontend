"use client"

import React, { useState } from 'react'
import { RadioGroup } from "@/components/ui/radio-group"
import StepBox from '@/components/StepBox';
import { ChangePassword, EnterEmail, OTPVerification } from '../_components/ForgotPasswordForms';


export default function Home() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  return (
    <main className="h-full">
      <div className="flex items-center justify-between py-5 px-12 border-b">
        <RadioGroup defaultValue={"true"} className="flex items-center space-x-2 ">
          <StepBox
            isDisabled={step !== 1}
            label="Enter email id"
            isDone={step > 1}
          />
          <hr className="w-4 border-black/20" />
          <StepBox
            isDisabled={step !== 2}
            label="OTP verification"
            isDone={step > 2}
          />
          <hr className="w-4 border-black/20" />
          <StepBox
            isDisabled={step !== 3}
            label="Change password"
            isDone={step > 3}
          />
        </RadioGroup>

      </div>
      <section className='h-[calc(100vh-66px)] flex items-center justify-center'>
        {step === 1 && <EnterEmail setStep={setStep} setEmail={setEmail} />}
        {step === 2 && <OTPVerification setStep={setStep} email={email} />}
        {step === 3 && <ChangePassword setStep={setStep} />}
      </section>
    </main>
  );
}
