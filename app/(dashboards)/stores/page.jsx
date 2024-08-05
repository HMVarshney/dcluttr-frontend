"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useMemo, useState } from "react";
import EmptyStores from "./_components/EmptyStores";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "phosphor-react";
import AllBrands from "./_components/AllBrands";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";

function Page() {
  const [searchedName, setSearchedName] = useState("");
  const { isLoadingBrandsList, brandsList } = useSelector((state) => state.brand);
  const { organizationDetails, status } = useSelector((state) => state.organization);

  const isLoading = status === "loading" || isLoadingBrandsList;
  const currentOrgBrands = useMemo(() => {
    if (!organizationDetails) return [];
    return brandsList.filter((brand) => brand.organizationId === organizationDetails.id);
  }, [brandsList, organizationDetails]);

  const filteredBrands = useMemo(() => {
    if (!searchedName) return currentOrgBrands;
    return currentOrgBrands.filter((brand) => brand.brandName.toLowerCase().includes(searchedName.toLowerCase()));
  }, [currentOrgBrands, searchedName]);

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
          <Input
            className="w-[200px]"
            value={searchedName}
            onChange={(e) => setSearchedName(e.target.value)}
            placeholder="🔍 Search for brand"
          />
          <Button variant="outline" className="px-2.5">
            <Plus className="w-4 h-4 mr-2" />
            <div className="font-medium text-sm">Add a new store</div>
          </Button>
        </div>
      </div>
      {currentOrgBrands?.length > 0 || isLoading ? (
        <AllBrands brandList={filteredBrands} orgId={organizationDetails.id} isLoadingBrandsList={isLoading} />
      ) : (
        <EmptyStores />
      )}
    </ScrollArea>
  );
}

export default Page;
