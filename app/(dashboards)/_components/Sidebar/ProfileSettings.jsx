"use client";

import { setSettingsOpen, updateUser } from "@/lib/store/features/userSlice";
import { addDelay, cn, deleteCookie } from "@/lib/utils";
import { FileText, GearSix, Lock, LockKey, Plug, Storefront, Truck, UserCircle, X } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { InputNumber, InputText } from "@/app/(auth)/_components/FormElements";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import BrandsTable from "./BrandsTable";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import MembersTable from "../../stores/_components/MembersTable";
import { toast } from "sonner";
import Link from "next/link";

const sideBarList = [
  {
    name: "Personal details",
    icon: UserCircle
  },
  {
    name: "Access",
    icon: Storefront
  },
  {
    name: "Logout",
    icon: LogOut
  }
];

export default function ProfileSettings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [active, setActive] = useState("Personal details");
  const userDetails = useSelector((state) => state.user.userDetails);
  const { usersList } = useSelector((state) => state.organization);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch
  } = useForm({
    mode: "onChange"
  });
  const onSubmit = (e) => {
    const updateUserRequest = JSON.stringify({ fullName: e.fullName, email: e.email, mobileNumber: e.mobileNumber });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("updateUserRequest", updateUserRequest);

    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        toast("Updated successfully", {
          duration: 5000,
          // description: data?.message,
          variant: "success"
        });
      })
      .catch((error) => setError("mobileNumber", { message: error.message }));
  };

  useEffect(() => {
    setValue("fullName", userDetails?.fullName);
    setValue("email", userDetails?.email);
    setValue("mobileNumber", userDetails?.mobileNumber);
  }, [userDetails?.id]);
  return (
    <div className="">
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-between gap-2 py-3 px-6 bg-white border-b">
          <div className={cn("flex justify-start transition-all")}>
            <UserCircle className="h-5 w-5 text-[#202020]" />
            <span className={cn("text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1 ml-2")}>
              Profile
            </span>
          </div>
          <X onClick={() => dispatch(setSettingsOpen(false))} className="cursor-pointer" />
        </div>
      </div>
      <div className="flex items-start justify-between px-8 gap-6">
        <div className="my-8 rounded-xl bg-white w-[212px] border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
          <div className="px-6 rounded-t-xl py-4 text-sm font-medium w-full bg-[#FAFAFA] flex gap-2">
            <Avatar className={cn("border rounded-full cursor-pointer transition h-11 w-11")}>
              <AvatarImage src={userDetails?.image} alt={userDetails?.fullName} />
              <AvatarFallback className="text-base rounded text-black">
                {userDetails?.fullName?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="">
              <span className="text-black text-sm line-clamp-1">{userDetails?.fullName}</span>
              <span className="text-[#031B1580] text-xs">{userDetails?.email}</span>
            </div>
          </div>
          <div className="px-6 py-4 flex flex-col gap-2">
            {sideBarList.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant={"ghost"}
                  size={"lg"}
                  className={cn("w-full font-normal justify-start transition-all mx-auto px-3 focus:ring-0", {
                    "bg-[#DFEEE6]": active === item.name
                  })}
                  onClick={async () => {
                    if (item.name === "Logout") {
                      deleteCookie("accessToken");
                      await addDelay(1000);
                      router.replace("/log-in");
                    } else {
                      setActive(item.name);
                    }
                  }}
                >
                  <Icon
                    className={cn("h-5 w-5 text-[#7E8986] ", {
                      "text-primary": active === item.name
                    })}
                  />
                  <span
                    className={cn("text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1 ml-2", {
                      "text-primary": active === item.name
                    })}
                  >
                    {item.name}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="py-8 w-full max-h-[85vh] overflow-y-auto">
          {active === "Personal details" && (
            <>
              <div className="rounded-xl p-5 bg-white border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
                <h3 className="text-xl font-bold">Personal details</h3>
                <p className="text-xs mt-1 text-[#4F4D55]">Manage your personal details</p>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 ">
                  <div className="flex mb-6 items-center cursor-pointer" onClick={() => ref.current.click()}>
                    <Image
                      src={file ? URL.createObjectURL(file) : userDetails?.image ?? "/image_placeholder.svg"}
                      width={56}
                      height={56}
                      alt="dcluttr logo"
                      className="rounded-full border object-contain h-14 w-14"
                    />
                    <div className="ml-3">
                      <div className="text-sm text-[#031B15] font-semibold">Profile picture</div>
                      <div className="text-xs text-primary font-semibold">Change image</div>
                    </div>
                    <input ref={ref} onChange={(e) => setFile(e.target.files[0])} type="file" className="hidden" />
                  </div>
                  <InputText
                    label="Name"
                    placeholder="Name"
                    register={register}
                    required={false}
                    name="fullName"
                    errors={errors["fullName"]}
                    className=""
                  />

                  <InputText
                    label="Email Address"
                    placeholder="Email Address"
                    register={register}
                    required={false}
                    name="email"
                    errors={errors["email"]}
                    className=""
                    disabled={true}
                  />

                  <InputNumber
                    label="Phone number"
                    placeholder="Enter your phone number"
                    register={register}
                    required={false}
                    name="mobileNumber"
                    errors={errors["mobileNumber"]}
                    className="my-6"
                    disabled={true}
                  />
                  <div className="flex items-center">
                    <LockKey className="text-xl" />
                    <span className="text-sm font-semibold ml-2">Password</span>
                    <Link href="/forgot-password" className="ml-auto">
                      <Button variant="outline" className="ml-auto">
                        Reset Password
                      </Button>
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className="mt-8"
                    disabled={
                      watch("fullName") === userDetails?.fullName && watch("mobileNumber") === userDetails?.mobileNumber
                    }
                  >
                    Save changes
                  </Button>
                </form>
              </div>
            </>
          )}

          {active === "Access" && (
            <div className="mt-6 rounded-xl p-5 bg-white border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)]">
              <h3 className="text-xl font-bold">Access</h3>
              <p className="text-xs mt-1 text-[#4F4D55]">View all the stores and organisations that you can access</p>
              <BrandsTable brandsList={userDetails?.brands} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
