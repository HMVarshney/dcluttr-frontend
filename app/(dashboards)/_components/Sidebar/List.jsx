"use client";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hint from "@/components/Hint";
import { cn, getConstructorTextColor } from "@/lib/utils";
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
      <div className="flex flex-col gap-3">
        <Skeleton className="aspect-square" />
        <Skeleton className="aspect-square" />
        <Skeleton className="aspect-square" />
        <Skeleton className="aspect-square" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {currentOrgBrands.map((brand, i) => (
        <div className="aspect-square relative" key={i}>
          <Hint label={brand?.brandName} side="right">
            <Avatar
              className={cn(
                "border rounded-lg cursor-pointer transition",
                selectedBrand === brand?.id && "border-[3px] border-primary/70"
              )}
              onClick={() => dispatch(setBrand(brand?.id))}
            >
              <AvatarImage src={brand?.brandLogo} alt={brand?.brandName} />
              <AvatarFallback
                className="text-xl rounded"
                style={{ backgroundColor: brand?.randomColor, color: getConstructorTextColor(brand?.randomColor) }}
              >
                {brand?.brandName?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Hint>
        </div>
      ))}
    </div>
  );
}
