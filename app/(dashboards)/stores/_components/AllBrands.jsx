import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Gear } from "phosphor-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getConstructorTextColor } from "@/lib/utils";

function getActionButton(brand, orgId) {
  if (
    brand.brandSourcesInfo?.isFacebookActive ||
    brand.brandSourcesInfo?.isGoogleActive ||
    brand.brandSourcesInfo?.isShopifyActive
  ) {
    return (
      <Link href={`/dashboard?brand=${brand.id}&orgId=${orgId}`}>
        <Button variant="outline">Go to dashboard</Button>
      </Link>
    );
  } else if (brand.brandSettings?.isApproved) {
    return (
      <Link href={`/welcome?brand=${brand.id}&orgId=${orgId}&step=4`}>
        <Button variant="outline">Connect your data</Button>
      </Link>
    );
  } else {
    return (
      <Link href={`/welcome?brand=${brand.id}&orgId=${orgId}&step=3`}>
        <Button variant="outline">Pending approval</Button>
      </Link>
    );
  }
}

export default function AllBrands({ brandList, isLoadingBrandsList, orgId }) {
  return (
    <>
      <div className="flex flex-col items-stretch justify-center gap-6  px-6 mt-6">
        {isLoadingBrandsList ? (
          <>
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
          </>
        ) : (
          brandList.map((brand) => (
            <div key={brand.id} className="flex items-center justify-center gap-2 py-6 px-4 bg-white rounded-lg shadow">
              <Link href={`/store-settings?brandId=${brand.id}`}>
                <Avatar className="border rounded-lg cursor-pointer transition w-36 h-20 ">
                  <AvatarImage src={brand.brandLogo} alt={brand?.brandName} />
                  <AvatarFallback
                    className="text-3xl rounded"
                    style={{
                      backgroundColor: brand?.randomColor,
                      color: getConstructorTextColor(brand?.randomColor ?? "")
                    }}
                  >
                    {brand?.brandName?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="mr-auto ml-4">
                <div className="text-base font-semibold">{brand.brandName}</div>
                <div className="text-[#919191] text-sm underline">{brand.brandWebsite}</div>
              </div>
              {getActionButton(brand, orgId)}
              <Link href={`/store-settings?brandId=${brand.id}`}>
                <Button variant="icon">
                  <Gear size={24} />
                </Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}
