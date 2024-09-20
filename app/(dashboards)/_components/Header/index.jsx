"use client";

import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import DatePickerWithRange from "@/components/DatePickerWithRange";
import BrandList from "./BrandList";
import TopAdsBanner from "@/components/TopAdsBanner";
import { GROUP_BY } from "@/lib/utils";
import { setGroupBy, setDateRange } from "@/lib/store/features/userSlice";
import { GroupBySelectBox } from "../GroupBySelectBox";

export default function Header({ sections, activeSectionId, setActiveSectionId }) {
  const dispatch = useDispatch();
  const { groupBy, dateRange } = useSelector((state) => state.user);

  return (
    <>
      <div className="sticky top-0 z-10">
        <div className="flex items-center justify-center gap-2 py-1.5 px-6 bg-white border-b">
          <div className="mr-auto">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Overview</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <GroupBySelectBox
            value={groupBy}
            onValueChange={(value) => {
              dispatch(setGroupBy(value));
            }}
            options={GROUP_BY}
          />
          <DatePickerWithRange dateRange={dateRange} setDateRange={(e) => dispatch(setDateRange(e))} />
        </div>
        <BrandList sections={sections} activeSectionId={activeSectionId} setActiveSectionId={setActiveSectionId} />
      </div>
      <TopAdsBanner />
    </>
  );
}
