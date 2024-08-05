"use client";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hint from "@/components/Hint";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setBrand } from "@/lib/store/features/brandSlice";
import { Skeleton } from "@/components/ui/skeleton";

export default function List() {
  const dispatch = useDispatch();
  const { brandsList, selectedBrand, isLoadingBrandsList } = useSelector((state) => state.brand);
  const { organizationDetails, status } = useSelector((state) => state.organization);

  const isLoading = status === "loading" || isLoadingBrandsList;

  const currentOrgBrands = useMemo(() => {
    if (!organizationDetails) return [];
    return brandsList.filter((brand) => brand.organizationId === organizationDetails.id);
  }, [brandsList, organizationDetails]);

  if (isLoading) {
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
      {currentOrgBrands.map((band, i) => (
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
