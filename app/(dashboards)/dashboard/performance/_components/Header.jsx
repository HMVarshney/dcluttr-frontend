"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Switcher from "@/components/Switcher";
import DatePickerWithRange from "@/components/DatePickerWithRange";
import TopAdsBanner from "@/components/TopAdsBanner";

export default function Header({ dateRange, setDateRange }) {
  const pathname = usePathname();

  return (
    <>
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-center gap-2 py-3 px-6 bg-white border-b">
          <div className="mr-auto">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>Performance</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{pathname.includes("meta") ? "Meta" : "Google"} ads</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="text-[#919191] text-xs">Last updated: 12:56 PM</div>
          </div>
          <Switcher />
          <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
        </div>
      </div>
      <TopAdsBanner />
    </>
  );
}
