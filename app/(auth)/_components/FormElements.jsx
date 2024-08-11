import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo } from "react";
import Countdown from "react-countdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function InputErrorMessage({ message }) {
  return <p className={`text-xs text-destructive ml-1 ${message ? "" : "py-1"}`}>{message}</p>;
}

export function InputText({ label, placeholder, required, register, name, errors, className }) {
  return (
    <div className={cn("grid w-full items-center gap-2", className)}>
      <Label
        htmlFor={name}
        className={`text-black text-sm ${required && "after:content-['*'] after:ml-0.5 after:text-destructive"}`}
      >
        {label}
      </Label>
      <Input
        {...register(name, { required })}
        id={name}
        type="text"
        placeholder={placeholder}
        errors={!!errors?.message}
      />
      <InputErrorMessage message={errors?.message} />
    </div>
  );
}
export function InputEmail({ label, placeholder, required, register, name, errors, className }) {
  return (
    <div className={cn("grid w-full items-center gap-2", className)}>
      <Label
        htmlFor={name}
        className={`text-black text-sm ${required && "after:content-['*'] after:ml-0.5 after:text-destructive"}`}
      >
        {label}
      </Label>
      <Input
        {...register(name, {
          required,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email format"
          }
          // validate: {
          //   notGmail: (value) =>
          //     !value.endsWith("@gmail.com") ||
          //     "Please enter a different email address. This form does not accept addresses from gmail.com."
          // }
        })}
        id={name}
        type="email"
        placeholder={placeholder}
        errors={!!errors?.message}
      />
      <InputErrorMessage message={errors?.message} />
    </div>
  );
}

export function InputWebsite({ label, placeholder, required, register, name, errors, className }) {
  return (
    <div className={cn("grid w-full items-center gap-2", className)}>
      <Label
        htmlFor={name}
        className={`text-black text-sm ${required && "after:content-['*'] after:ml-0.5 after:text-destructive"}`}
      >
        {label}
      </Label>
      <Input
        {...register(name, {
          required,
          pattern: {
            value: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
            message: "Invalid website url format"
          }
        })}
        id={name}
        type="text"
        placeholder={placeholder}
        errors={!!errors?.message}
      />
      <InputErrorMessage message={errors?.message} />
    </div>
  );
}

export function InputNumber({ label, placeholder, required, register, name, errors, className }) {
  return (
    <div className={cn("grid w-full items-center gap-2", className)}>
      <Label
        htmlFor={name}
        className={`text-black text-sm flex items-center ${
          required && "after:content-['*'] after:ml-0.5 after:text-destructive"
        }`}
      >
        {label} <div className="text-xs text-black/50 ml-auto">We won’t spam call you!</div>
      </Label>
      <Input
        {...register(name, { required })}
        id={name}
        type="tel"
        placeholder={placeholder}
        errors={!!errors?.message}
      />
      <InputErrorMessage message={errors?.message} />
    </div>
  );
}
export function InputPassword({
  label,
  placeholder,
  required,
  register,
  name,
  errors,
  className,
  showForgetOption = false
}) {
  return (
    <div className={cn("grid w-full items-center gap-2", className)}>
      <div className="flex items-center">
        <Label
          htmlFor={name}
          className={`text-black text-sm ${required && "after:content-['*'] after:ml-0.5 after:text-destructive"}`}
        >
          {label}
        </Label>
        {showForgetOption && (
          <Link href="/forgot-password" className="text-xs text-primary ml-auto cursor-pointer">
            Forgot Password?
          </Link>
        )}
      </div>
      <Input
        {...register(name, {
          required,
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          },
          maxLength: {
            value: 20,
            message: "Password must have at most 20 characters"
          }
        })}
        id={name}
        type="password"
        placeholder={placeholder}
        errors={!!errors?.message}
      />
      <InputErrorMessage message={errors?.message} />
    </div>
  );
}
export function InputSelect({ label, placeholder, required, control, name, errors, className, options }) {
  return (
    <div className={cn("grid w-full items-center gap-2", className)}>
      <Label
        htmlFor={name}
        className={`text-black text-sm ${required && "after:content-['*'] after:ml-0.5 after:text-destructive"}`}
      >
        {label}
      </Label>
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field }) => (
          <Select name={field.name} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <InputErrorMessage message={errors?.message} />
    </div>
  );
}

export function FormSubmitButton({ isLoading, text }) {
  return (
    <Button className="w-full" disabled={isLoading}>
      {isLoading ? (
        <Image src="/icons/spinner.svg" alt="loader" width={20} height={20} className="animate-spin" />
      ) : (
        text
      )}
    </Button>
  );
}

export function FormSubmitButtonWithIcon({ isLoading, text }) {
  return (
    <button
      disabled={isLoading}
      className="h-10 w-full py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
    >
      {isLoading ? (
        <Image src="/icons/spinner.svg" alt="loader" width={20} height={20} className="animate-spin" />
      ) : (
        <>
          {text}
          <ArrowRight className="w-4 ml-2" />
        </>
      )}
    </button>
  );
}

function CustomCount({ onComplete, sec, num }) {
  return (
    <Countdown
      date={Date.now() + 1000 * sec}
      renderer={({ seconds, completed }) => (completed ? <span /> : <span className="mx-1">({seconds} Secs)</span>)}
      onComplete={onComplete}
      key={num}
    />
  );
}
function isEqual(prevProps, nextProps) {
  return prevProps.number === nextProps.number;
}
const MemoizedCustomCount = memo(CustomCount, isEqual);
export { MemoizedCustomCount as CustomCount };
