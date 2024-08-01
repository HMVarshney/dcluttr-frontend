"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useMemo } from "react";
import EmptyStores from "./_components/EmptyStores";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "phosphor-react";
import Notifications from "@/components/Notifications";
import AllBrands from "./_components/AllBrands";
import { useSelector } from "react-redux";

function Page() {
  const { isLoadingBrandsList, brandsList } = useSelector((state) => state.brand);
  const { organizationDetails } = useSelector((state) => state.organization);

  const currentOrgBrands = useMemo(() => {
    if (!organizationDetails) return [];
    return brandsList.filter((brand) => brand.organizationId === organizationDetails.id);
  }, [brandsList, organizationDetails]);

  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-center gap-2 py-3 px-6 bg-white border-b">
          <div className="mr-auto">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/stores">All stores</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="text-[#919191] text-xs">Last updated: 12:56 PM</div>
          </div>
          <Button variant="outline" className="px-2.5">
            <Plus className="w-5 h-5" />
          </Button>
          <Notifications />
        </div>
      </div>
      {currentOrgBrands?.length > 0 || isLoadingBrandsList ? (
        <AllBrands
          brandList={currentOrgBrands}
          orgId={organizationDetails.id}
          isLoadingBrandsList={isLoadingBrandsList}
        />
      ) : (
        <EmptyStores />
      )}
    </ScrollArea>
  );
}

export default Page;
