import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setBrand } from "@/lib/store/features/brandSlice";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Gear } from "phosphor-react";
import React from "react";
import { useDispatch } from "react-redux";

export default function AllBrands({ brandList, isLoadingBrandsList }) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center justify-center gap-2 p-6 ">
        <div className="mr-auto">
          <div className=" text-xl font-bold">All Brands</div>
          <div className="text-[#4F4D55] text-xs">Find all the brand for store</div>
        </div>
        {isLoadingBrandsList ? (
          <Skeleton className="w-[164px] h-10" />
        ) : (
          <Button variant="default">
            <Plus className="w-4 h-4 mr-2" />
            <div className="font-medium text-sm">Add a new store</div>
          </Button>
        )}
      </div>
      <div className="flex flex-col items-stretch justify-center gap-6  px-6 ">
        {isLoadingBrandsList ? (
          <>
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
          </>
        ) : (
          brandList.map((item) => (
            <div key={item.id} className="flex items-center justify-center gap-2 py-6 px-4 bg-white rounded-lg shadow">
              <Image
                src={item.brandLogo || "/image_placeholder.svg"}
                width={400}
                height={400}
                className="rounded-lg border w-36 h-20 object-cover"
                alt={item.brandName}
              />
              <div className="mr-auto ml-4">
                <div className="text-base font-semibold">{item.brandName}</div>
                <div className="text-[#919191] text-sm underline">{item.brandWebsite}</div>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  dispatch(setBrand(item));
                  router.push(`/dashboard?brand=${item.id}`);
                }}
              >
                Go to dashboard
              </Button>
              <Button variant="icon">
                <Gear size={24} />
              </Button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
