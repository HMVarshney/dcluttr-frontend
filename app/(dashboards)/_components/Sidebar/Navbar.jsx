import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import necessary hooks
import { setSideBarClose } from "@/lib/store/features/userSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { CaretDoubleRight } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchOrganizationDetails } from "@/lib/store/features/organizationSlice";
import NewButton from "./NewButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar({ isOpen }) {
  const dispatch = useDispatch();
  const { allOrganization, organizationDetails, allOrganizationStatus } = useSelector((state) => state.organization);

  const handleBrandChange = (brandId) => {
    const selected = allOrganization.find((brand) => brand.id === brandId);
    dispatch(fetchOrganizationDetails(selected?.id));
  };

  const handleToggle = () => {
    dispatch(setSideBarClose(!isOpen));
  };
  return (
    <div
      className={cn("w-full py-4 flex gap-4 transition-all", {
        "max-w-[78px] w-[78px] -ml-2 gap-2": isOpen
      })}
    >
      {allOrganizationStatus === "loading" ? (
        <Skeleton className="w-full h-9 border" />
      ) : (
        <Select value={organizationDetails?.id} onValueChange={handleBrandChange}>
          <SelectTrigger className="w-full p-1.5 h-9">
            <SelectValue placeholder="Select a org" />
          </SelectTrigger>
          <SelectContent>
            {allOrganization.map((option, i) => (
              <SelectItem key={i} value={option.id}>
                <div className="flex items-center gap-3">
                  <Avatar className={cn("border rounded-[5.5px] cursor-pointer transition h-6 w-6")}>
                    <AvatarImage src={option.organizationLogo} alt={option.name} />
                    <AvatarFallback className="text-xs rounded-[5.5px]">{option.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="line-clamp-1">{option.name}</span>
                </div>
              </SelectItem>
            ))}
            <NewButton />
          </SelectContent>
        </Select>
      )}
      <Button
        variant="icon"
        className={cn("min-w-4 h-9 transition-all p-0", !isOpen ? "rotate-180" : "rotate-0")}
        onClick={handleToggle}
      >
        <CaretDoubleRight size={16} weight="bold" color="#027056" />
      </Button>
    </div>
  );
}
