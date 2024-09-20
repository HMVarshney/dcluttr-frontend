"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useDispatch, useSelector } from "react-redux"; // Import useSelector from react-redux
import { Users } from "phosphor-react";
import InvitePeopleButton from "../../stores/_components/InvitePeopleButton";
import ProfileSettings from "./ProfileSettings";
import { setSettingsOpen } from "@/lib/store/features/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { userDetails, isSettingsOpen } = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-4 ">
      <InvitePeopleButton>
        <Users className="text-icon cursor-pointer" size={24} />
      </InvitePeopleButton>

      <Popover open={isSettingsOpen} onOpenChange={(e) => dispatch(setSettingsOpen(e))}>
        <PopoverTrigger asChild>
          <Avatar className="w-7 h-7">
            <AvatarImage src={userDetails?.image} alt={userDetails?.fullName} />
            <AvatarFallback className="bg-[#6D4FED] text-white uppercase">{userDetails?.fullName?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent
          onClick={(e) => e.stopPropagation()}
          side="top"
          sideOffset={0}
          className="min-w-[90vw] min-h-[90vh] ml-[5vw] shadow-[4px_4px_100px_rgba(0,0,0,0.25)] p-0 bg-[#FAFAFA] overflow-y-auto overflow-x-hidden"
        >
          <ProfileSettings />
        </PopoverContent>
      </Popover>
    </div>
  );
}
