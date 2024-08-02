"use client";

import { ArrowBigLeft, ChevronRight, LogOut, UserRound } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { addDelay, deleteCookie } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import { Users } from "phosphor-react";
import InvitePeopleButton from "../../stores/_components/InvitePeopleButton";

export default function Profile() {
    const { replace } = useRouter();
    const userDetails = useSelector((state) => state.user.userDetails);

    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <InvitePeopleButton>
                <Users className="text-icon cursor-pointer w-7 h-7" />
            </InvitePeopleButton>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={userDetails?.image} alt={userDetails?.fullName} />
                        <AvatarFallback>{userDetails?.fullName?.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    onClick={(e) => e.stopPropagation()}
                    side="top"
                    sideOffset={0}
                    className="w-48 ml-10 p-1.5"
                >
                    <div className="text-sm font-bold p-2.5">My Profile</div>

                    <DropdownMenuItem className="flex gap-2 p-2.5 cursor-pointer">
                        <Avatar className="w-5 h-5">
                            <AvatarImage src={userDetails?.image} alt={userDetails?.fullName} />
                            <AvatarFallback>{userDetails?.fullName?.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm line-clamp-1">{userDetails?.fullName}</div>
                        <div className="text-[10px] text-white px-2 bg-primary rounded">Admin</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-2 p-2.5 cursor-pointer">
                        <UserRound className="w-4 h-4" />
                        <div className="text-sm">My Profile</div>
                        <ChevronRight className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex gap-2 p-2.5 cursor-pointer"
                        onClick={async (e) => {
                            deleteCookie("accessToken");
                            await addDelay(1000);
                            replace("/log-in");
                        }}
                    >
                        <LogOut className="w-4 h-4" />
                        <div className="text-sm">Sign Out</div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
