"use client";

import React, { useState } from "react";
import moment from "moment";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Switcher from "@/components/Switcher";
// import { Button } from '@/components/ui/button';
// import Notifications from '@/components/Notifications';
// import ExportFileFormat from '@/components/ExportFileFormat';
// import { SquareHalf } from 'phosphor-react';
import TopAdsBanner from "@/components/TopAdsBanner";
// import { Input } from '@/components/ui/input';
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setMainChart } from "@/lib/store/features/userSlice";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import Image from "next/image";
const DatePickerWithRange = dynamic(() => import("@/components/DatePickerWithRange"), { ssr: false });

export default function Header() {
  const dispatch = useDispatch();
  const { groupBy, showMainChart } = useSelector((state) => state.user);
  const [dateRange, setDateRange] = useState({
    from: moment("2019-01-01", "YYYY-MM-DD")._d,
    to: moment("2022-12-23", "YYYY-MM-DD")._d,
    value: null
  });

  return (
    <>
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-center gap-2 py-3 px-6 bg-white border-b">
          <div className="mr-auto">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>Creative</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="text-[#919191] text-xs">Last updated: 12:56 PM</div>
          </div>

          <Switcher
            checked={showMainChart}
            onCheckedChange={(e) => {
              console.log(e);
              dispatch(setMainChart(e));
            }}
          />
          {/* <Button variant="outline" className="px-2.5">
                        <SquareHalf className='w-5 h-5' />
                    </Button>
                    <ExportFileFormat />
                    <Notifications /> */}
          <DatePickerWithRange dateRange={dateRange} setDateRange={setDateRange} />
        </div>
      </div>
      <div className="flex justify-start gap-2 py-3 px-6 bg-white border-b">
        <div className="flex items-center justify-start border rounded-xl p-1.5">
          <div
            className={cn("flex gap-2 items-center px-4 py-1.5 bg-white rounded-md cursor-grab", {
              "bg-primary text-white": true
            })}
          >
            <Image src="/icons/meta_icon.svg" alt="Meta" width={100} height={100} className="w-4 object-contain" />
            <div className="font-medium text-sm">Meta ads</div>
          </div>
        </div>
      </div>
      <TopAdsBanner />
    </>
  );
}
