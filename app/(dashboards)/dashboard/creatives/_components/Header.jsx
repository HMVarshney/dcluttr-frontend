"use client";

import React, { useState } from "react";
import moment from "moment";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import Switcher from "@/components/Switcher";
// import { Button } from '@/components/ui/button';
// import Notifications from '@/components/Notifications';
// import ExportFileFormat from '@/components/ExportFileFormat';
// import { SquareHalf } from 'phosphor-react';
import TopAdsBanner from "@/components/TopAdsBanner";
// import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from "react-redux";
import { setMainChart } from "@/lib/store/features/userSlice";
import dynamic from "next/dynamic";
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
        <div className="flex items-center justify-center gap-2 py-1.5 px-6 bg-white border-b">
          <div className="mr-auto">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>Creative</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
      <TopAdsBanner />
    </>
  );
}
