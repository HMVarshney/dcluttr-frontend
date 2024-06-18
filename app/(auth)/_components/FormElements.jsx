import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function InputErrorMessage({ message }) {
    return (
        <p className={`text-xs text-destructive ml-1 ${message ? '' : 'py-1'}`}>
            {message}
        </p>
    )
}


export function InputText({ label, placeholder, required, register, name, errors, className }) {
    return (
        <div className={cn("grid w-full items-center gap-2", className)}>
            <Label htmlFor={name}
                className={`text-black text-sm ${required && "after:content-['*'] after:ml-0.5 after:text-destructive"}`}>
                {label}
            </Label>
            <Input
                {...register(name, { required })}
                id={name}
                type="text"
                placeholder={placeholder}
                className={errors?.message ? 'border-destructive ring-4 ring-destructive/30 ring-offset-destructive/40 ' : ''} />
            <InputErrorMessage message={errors?.message} />
        </div>
    )
}
export function InputEmail({ label, placeholder, required, register, name, errors, className }) {
    return (
        <div className={cn("grid w-full items-center gap-2", className)}>
            <Label htmlFor={name}
                className={`text-black text-sm ${required && "after:content-['*'] after:ml-0.5 after:text-destructive"}`}>
                {label}
            </Label>
            <Input
                {...register(name, {
                    required,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email format"
                    },
                    validate: {
                        notGmail: value => !value.endsWith("@gmail.com") || "Please enter a different email address. This form does not accept addresses from gmail.com."
                    }
                })}
                id={name}
                type="email"
                placeholder={placeholder}
                className={errors?.message ? 'border-destructive ring-4 ring-destructive/30 ring-offset-destructive/40 ' : ''} />
            <InputErrorMessage message={errors?.message} />
        </div>
    )
}

export function InputNumber({ label, placeholder, required, register, name, errors, className }) {
    return (
        <div className={cn("grid w-full items-center gap-2", className)}>
            <Label htmlFor={name}
                className={`text-black text-sm flex items-center ${required && "after:content-['*'] after:ml-0.5 after:text-destructive"}`}>
                {label} <div className="text-xs text-black/50 ml-auto">We won’t spam call you!</div>
            </Label>
            <Input
                {...register(name, { required })}
                id={name}
                type="tel"
                placeholder={placeholder}
                className={errors?.message ? 'border-destructive ring-4 ring-destructive/30 ring-offset-destructive/40 ' : ''} />
            <InputErrorMessage message={errors?.message} />
        </div>
    )
}
export function InputPassword({ label, placeholder, required, register, name, errors, className }) {
    return (
        <div className={cn("grid w-full items-center gap-2", className)}>
            <Label htmlFor={name}
                className={`text-black text-sm ${required && "after:content-['*'] after:ml-0.5 after:text-destructive"}`}>
                {label}
            </Label>
            <Input
                {...register(name, {
                    required,
                    minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters"
                    }
                })}
                id={name}
                type="password"
                placeholder={placeholder}
                className={errors?.message ? 'border-destructive ring-4 ring-destructive/30 ring-offset-destructive/40 ' : ''} />
            <InputErrorMessage message={errors?.message} />
        </div>
    )
}


export function FormSubmitButton({ isLoading, text }) {
    return (
        <Button className="w-full" disabled={isLoading} >
            {isLoading ?
                <Image
                    src="/icons/spinner.svg"
                    alt="loader"
                    width={20}
                    height={20}
                    className="animate-spin" />
                : text}
        </Button>
    )
}
