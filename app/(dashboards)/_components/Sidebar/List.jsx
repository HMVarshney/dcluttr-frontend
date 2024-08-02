"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hint from "@/components/Hint";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setBrand } from "@/lib/store/features/brandSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { setStep } from "@/lib/store/features/authSlice";
import { useRouter } from "next/navigation";

export default function List() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { brandsList, selectedBrand, isLoadingBrandsList } = useSelector((state) => state.brand);

  useEffect(() => {
    if (!brandsList?.length && !isLoadingBrandsList) {
      dispatch(setStep(3));
      router.push("/sign-up");
    }
  }, [brandsList?.length, dispatch, isLoadingBrandsList, router]);

  if (isLoadingBrandsList) {
    return (
      <ul className="space-y-4">
        <Skeleton className="aspect-square" />
        <Skeleton className="aspect-square" />
        <Skeleton className="aspect-square" />
        <Skeleton className="aspect-square" />
      </ul>
    );
  }

  return (
    <ul className="space-y-4">
      {brandsList.map((band, i) => (
        <div className="aspect-square relative" key={i}>
          <Hint label={band?.brandName} side="right">
            <Avatar
              className={cn(
                "border rounded-lg cursor-pointer transition",
                selectedBrand === band?.id && "border-2 border-primary/50"
              )}
              onClick={() => dispatch(setBrand(band?.id))}
            >
              <AvatarImage src={band?.brandLogo} alt={band?.brandName} />
              <AvatarFallback className="text-xl rounded-lg">{band?.brandName?.[0]}</AvatarFallback>
            </Avatar>
          </Hint>
        </div>
      ))}
    </ul>
  );
}
