"use client"

import { InputText } from '@/app/(auth)/_components/FormElements';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

export default function StoresSettings({ organizationDetails }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: "onBlur"
    });
    const onSubmit = (e) => {
        var data = new FormData();
        data.append('name', e.name);
        data.append('email', e.email);
        data.append('website', e.website);
        data.append('id', organizationDetails?.id);
        data.append('organizationType', organizationDetails?.organizationType);
        console.log(data);
    }

    useEffect(() => {
        setValue('name', organizationDetails?.name)
        // setValue('email', organizationDetails?.email)//TODO
        setValue('website', organizationDetails?.website)
    }, [organizationDetails?.id])

    return (
        <div className="px-6">
            <h3 className='text-xl font-bold mt-4'>
                Settings
            </h3>
            <p className='text-xs mt-1 text-[#4F4D55]'>
                Find all the brand for store
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className='mt-8 mb-12'>
                <InputText
                    label="Organization Name"
                    placeholder="Organization Name"
                    register={register}
                    required={false}
                    name="name"
                    errors={errors['name']}
                    className="" />
                <p className='text-xs -mt-3 mb-8 text-[#031B15CC]'>
                    Use a name the describes the group or team or agency. It appears in notification, invoices, and other team-specific areas.
                </p>
                <InputText
                    label="Owner Email"
                    placeholder="Owner Email"
                    register={register}
                    required={false}
                    name="email"
                    errors={errors['email']}
                    className="" />
                <p className='text-xs -mt-3 mb-8 text-[#031B15CC]'>
                    Thus will be used for all organization releated communication including emergencies and mission-critical tasks.
                </p>
                <InputText
                    label="Company Website"
                    placeholder="Company Website"
                    register={register}
                    required={false}
                    name="website"
                    errors={errors['website']}
                    className="" />
                <p className='text-xs -mt-3 text-[#031B15CC]'>
                    Thus will be used for all organization releated communication including emergencies and mission-critical tasks.
                </p>
                <Button
                    type="submit"
                    className="mt-8"
                >
                    Save changes
                </Button>
            </form>
        </div>
    )
}
