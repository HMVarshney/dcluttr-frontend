"use client";

import { InputText } from "@/app/(auth)/_components/FormElements";
import { Button } from "@/components/ui/button";
import { resetState, updateOrganization } from "@/lib/store/features/organizationSlice";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function StoresSettings({ organizationDetails }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    mode: "onChange"
  });
  const onSubmit = (e) => {
    const data = new FormData();

    data.append("file", file);
    data.append("name", e?.name);
    data.append("website", e?.website);
    data.append("id", organizationDetails?.id);
    data.append("organizationType", organizationDetails?.organizationType ?? "AGENCY"); //TODO
    dispatch(updateOrganization(data))
      .unwrap()
      .then(() => {});
  };

  useEffect(() => {
    setValue("name", organizationDetails?.name);
    setValue("website", organizationDetails?.website);
  }, [organizationDetails?.id]);

  return (
    <div className="px-6">
      <h3 className="text-xl font-bold mt-4">Org settings</h3>
      <p className="text-xs mt-1 text-[#4F4D55]">Manage organisation settings</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-12">
        <div className="flex mb-6 items-center cursor-pointer" onClick={() => ref.current.click()}>
          <Image
            src={file ? URL.createObjectURL(file) : organizationDetails?.organizationLogo ?? "/image_placeholder.svg"}
            width={56}
            height={56}
            alt="dcluttr logo"
            className="rounded-xl border object-contain h-14 w-14"
          />
          <div className="ml-3">
            <div className="text-sm text-[#031B15] font-semibold">Image</div>
            <div className="text-xs text-primary font-semibold">Update image</div>
          </div>
          <input ref={ref} onChange={(e) => setFile(e.target.files[0])} type="file" className="hidden" />
        </div>
        <InputText
          label="Organisation name"
          placeholder="Organisation name"
          register={register}
          required={false}
          name="name"
          errors={errors["name"]}
          className=""
        />
        <p className="text-xs -mt-3 mb-8 text-[#031B15CC]">
          Use a name that describes the group or team or agency. It appears in notification, invoices, and other
          team-specific views.
        </p>
        <InputText
          label="Company website"
          placeholder="Company website"
          register={register}
          required={false}
          name="website"
          errors={errors["website"]}
          className=""
        />
        <p className="text-xs -mt-3 text-[#031B15CC]">
          This will be used to learn more about your team, products, or services
        </p>
        <Button
          type="submit"
          className="mt-8"
          disabled={watch("name") === organizationDetails?.name && watch("website") === organizationDetails?.website}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}
