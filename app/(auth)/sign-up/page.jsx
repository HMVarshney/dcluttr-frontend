"use client"
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CreateAccount from "../_components/CreateAccount";
import { useState } from "react";


export default function Home() {
  const [step, setStep] = useState(1);
  return (
    <main className="h-full">
      <div className="flex items-center justify-between py-2.5 px-12 border-b">
        <RadioGroup defaultValue="option-one" className="flex items-center space-x-2 ">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="step-1" id="step-1" />
            <Label className="text-xs text-black" htmlFor="step-1">Create Account</Label>
          </div>
          <hr className="w-4 border-black/20" />
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="step-2" id="step-2" disabled />
            <Label className="text-xs text-black/50" htmlFor="step-2">Verification</Label>
          </div>
          <hr className="w-4 border-black/20" />
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="step-3" id="step-3" disabled />
            <Label className="text-xs text-black/50" htmlFor="step-3">Other Details</Label>
          </div>
        </RadioGroup>

        <div className="mr-4 ml-auto text-sm">
          Already have an account?
        </div>
        <Hint label={'Have a account?'} side="bottom">
          <Link href='/log-in'>
            <Button className="hidden lg:block text-base font-bold">
              Login
            </Button>
          </Link>
        </Hint>
      </div>
      {step === 1 && <CreateAccount setStep={setStep} />}
      {step === 2 && <CreateAccount setStep={setStep} />}
    </main>
  );
}
