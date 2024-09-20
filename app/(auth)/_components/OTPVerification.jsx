"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import OTPInput from "react-otp-input";
import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { FormSubmitButton } from "./FormElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { resendOTP, verifyOTP, setStep } from "@/lib/store/features/authSlice";

const CustomCount = dynamic(() => import("./FormElements").then((mod) => mod.CustomCount), { ssr: false });

export default function OTPVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();

  const { email, loading, error } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm({
    mode: "onChange"
  });

  const [isDisabled, setDisabled] = useState(true);
  const [num, setNum] = useState(0);

  const invitationId = searchParams.get("invitation_id");

  const onSubmit = (e) => {
    dispatch(verifyOTP({ email, otp: e.otp, invitationId }))
      .unwrap()
      .then(() => {
        if (invitationId) {
          router.replace("/stores");
        }
      });
  };

  const handleResend = () => {
    setDisabled(true);
    dispatch(resendOTP(email)).then(() => {
      setNum((prev) => prev + 1);
    });
  };

  return (
    <section className="h-[calc(100vh-66px)] flex pl-28 pt-28">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full">
        <div className="text-sm mb-6 flex items-center">
          <ArrowLeft className="w-5 cursor-pointer" onClick={() => dispatch(setStep(1))} />
          <span className="text-black font-light ml-2 ">Back</span>
        </div>
        <h3 className="font-bold text-2xl">OTP Verification</h3>
        <p className="text-base font-light mt-1.5">
          Please enter the OTP (One-time Password) sent to your registered email address to complete your verification
        </p>
        <p className="text-base mt-4">
          {email}
          <span className="text-primary underline font-semibold ml-5 cursor-pointer" onClick={() => dispatch(setStep(1))}>
            Change
          </span>
        </p>

        <div className="grid w-full items-center gap-2 mt-10">
          <Label htmlFor="otp" className={`text-black text-sm `}>
            Enter the OTP
          </Label>
          <Controller
            control={control}
            name="otp"
            render={({ field }) => (
              <OTPInput
                inputStyle={{
                  width: "44px",
                  height: "40px",
                  fontSize: "16px"
                }}
                className="text-primary"
                placeholder="000000"
                value={watch("otp")}
                name="otp"
                onChange={field.onChange}
                numInputs={6}
                renderSeparator={<div className="w-3"></div>}
                renderInput={(props) => <Input {...props} />}
              />
            )}
          />
        </div>
        <p className="text-xs mt-2 mb-10">
          Didn't receive the code?{" "}
          <button onClick={handleResend} disabled={isDisabled} className="disabled:text-black/50 text-primary underline">
            Resend
          </button>
          <CustomCount sec={10} onComplete={() => setDisabled(false)} key={num} num={num} />
          {/* //TODO 60 secs */}
        </p>

        <FormSubmitButton isLoading={loading} text="Verify" />
      </form>
    </section>
  );
}
