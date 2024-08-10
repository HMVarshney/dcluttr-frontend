"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { useRouter } from "next/navigation";
import { FormSubmitButton, InputEmail, InputPassword } from "../_components/FormElements";
import OTPInput from "react-otp-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { setCookie } from "@/lib/utils";
const CustomCount = dynamic(() => import("./FormElements").then((mod) => mod.CustomCount), { ssr: false });

export function EnterEmail({ setStep, setEmail }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    mode: "onChange"
  });

  const [isLoading, setLoading] = useState(false);
  const onSubmit = (e) => {
    setLoading(true);
    axiosInterceptorInstance
      .post("/auth/otp/generate", {
        email: e.email
      })
      .then((res) => {
        setEmail(e.email);
        setStep(2);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full">
      <h3 className="font-bold text-2xl">Enter email id</h3>
      <p className="text-sm font-light mt-1.5">Please enter your registered email id</p>
      <InputEmail
        label="Email ID"
        placeholder="Enter email id"
        register={register}
        required="Please enter this input field"
        name="email"
        errors={errors["email"]}
        className="mt-10 mb-4"
      />

      <FormSubmitButton isLoading={isLoading} text="Submit" />
    </form>
  );
}

export function OTPVerification({ email, setStep }) {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    control,
    watch
  } = useForm({
    mode: "onChange"
  });

  const [isDisabled, setDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [num, setNum] = useState(0);
  const onSubmit = (e) => {
    setLoading(true);
    axiosInterceptorInstance
      .post("/auth/otp/verify", {
        email: email,
        otp: e.otp
      })
      .then((res) => {
        if (res.data?.status === "success") {
          setCookie("accessToken", res.data?.data?.accessToken);
          setStep(3);
        }
      })
      .catch((err) => {
        console.log(err?.response);
        setError("otp", { type: "manual", message: err?.response?.data?.message });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResend = () => {
    setNum((pre) => pre + 1);
    setDisabled(true);
    axiosInterceptorInstance
      .post("/auth/otp/resend", {
        email: email
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDisabled(false);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full">
      <h3 className="font-bold text-2xl">Verify OTP</h3>
      <p className="text-sm font-light mt-1.5">
        Please enter the OTP sent to your registered email address to reset your password
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

      <FormSubmitButton isLoading={isLoading} text="Verify" />
    </form>
  );
}

export function ChangePassword({ step, setStep }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch
  } = useForm({
    mode: "onChange"
  });

  const [isLoading, setLoading] = useState(false);
  const onSubmit = (e) => {
    if (e.n_password !== e.c_password) {
      setError("c_password", { type: "manual", message: "Password doesn't match" });
      return;
    } else {
      setLoading(true);
      axiosInterceptorInstance
        .post("/user/password/reset", {
          newPassword: e.c_password
        })
        .then((res) => {
          router.replace(`/log-in`);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl w-full">
      <h3 className="font-bold text-2xl">Change password</h3>
      <p className="text-sm font-light mt-1.5">Please enter and confirm your new password</p>

      <InputPassword
        label="New Password"
        placeholder="New Password"
        register={register}
        required="Please enter this input field"
        name="n_password"
        errors={errors["n_password"]}
        className="mt-10"
        showForgetOption={false}
      />

      <InputPassword
        label="Confirm Password"
        placeholder="Confirm Password"
        register={register}
        required="Please enter this input field"
        name="c_password"
        errors={errors["c_password"]}
        className="mt-2.5 mb-8"
        showForgetOption={false}
      />

      <FormSubmitButton isLoading={isLoading} text="Confirm" />
    </form>
  );
}
