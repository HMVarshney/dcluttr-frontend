"use client";

import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Switcher from "@/components/Switcher";
import DatePickerWithRange from "@/components/DatePickerWithRange";
import BrandList from "./BrandList";
import TopAdsBanner from "@/components/TopAdsBanner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GROUP_BY } from "@/lib/utils";
import { setGroupBy, setDateRange, setMainChart } from "@/lib/store/features/userSlice";
import { Label } from "@/components/ui/label";

export default function Header({ sections, activeSectionId, setActiveSectionId }) {
  const dispatch = useDispatch();
  const { groupBy, dateRange, showMainChart } = useSelector((state) => state.user);
  return (
    <>
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-center gap-2 py-3 px-6 bg-white border-b">
          <div className="mr-auto">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Overview</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="text-[#919191] text-xs">Last updated: 12:56 PM</div>
          </div>

          <div className="flex items-center gap-1">
            <Label htmlFor="groupBy">Group by</Label>
            <Select
              value={groupBy?.value}
              onValueChange={(value) => {
                dispatch(setGroupBy(GROUP_BY?.filter((f) => f.value === value)[0]));
              }}
            >
              <SelectTrigger id="groupBy" className="w-24 px-4 h-9">
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {GROUP_BY.map((option, i) => (
                  <SelectItem key={i} value={option.value}>
                    <div className="flex items-center gap-3">{option.label}</div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Switcher
            checked={showMainChart}
            onCheckedChange={(e) => {
              console.log(e);
              dispatch(setMainChart(e));
            }}
          />
          <DatePickerWithRange dateRange={dateRange} setDateRange={(e) => dispatch(setDateRange(e))} />
        </div>
        <BrandList sections={sections} activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId} />
      </div>
      <TopAdsBanner />
    </>
  );
}
