"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Switcher from "@/components/Switcher";
import DatePickerWithRange from "@/components/DatePickerWithRange";
import TopAdsBanner from "@/components/TopAdsBanner";
import { useSelector } from "react-redux";
import { setMainChart } from "@/lib/store/features/userSlice";
import { useDispatch } from "react-redux";

export default function Header({ dateRange, setDateRange }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { showMainChart } = useSelector((state) => state.user);

  return (
    <>
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-center gap-2 py-1.5 px-6 bg-white border-b">
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
          </div>
          <Switcher checked={showMainChart} onCheckedChange={(e) => dispatch(setMainChart(e))} />
          <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
        </div>
      </div>
      <TopAdsBanner />
    </>
  );
}
