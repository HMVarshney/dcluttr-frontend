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
import DatePickerWithRange from "@/components/DatePickerWithRange";
// import { Button } from "@/components/ui/button";
// import { RefreshCcw, HomeIcon, PcCase, Plus, TvMinimal } from "lucide-react";
// import Notifications from "@/components/Notifications";
import BrandList from "./BrandList";
import CreateSectionButton from "./CreateSectionButton";
import TopAdsBanner from "@/components/TopAdsBanner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GROUP_BY } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setGroupBy, setDateRange, setMainChart } from "@/lib/store/features/userSlice";

export default function Header() {
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
                    <Switcher
                        checked={showMainChart}
                        onCheckedChange={(e) => {
                            console.log(e);
                            dispatch(setMainChart(e));
                        }}
                    />
                    <Select
                        value={groupBy?.value}
                        onValueChange={(value) => {
                            dispatch(setGroupBy(GROUP_BY?.filter((f) => f.value === value)[0]));
                        }}
                    >
                        <SelectTrigger className="w-24 px-4 h-10">
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
                    <DatePickerWithRange dateRange={dateRange} setDateRange={(e) => dispatch(setDateRange(e))} />
                    {/* <Button variant="ghost" className="px-2.5">
                        <RefreshCcw className="w-5 h-5" />
                    </Button>
                    <Notifications /> */}
                </div>
                <div className="flex items-center justify-between gap-2 py-3 px-6 bg-white border-b">
                    <BrandList />
                    <CreateSectionButton />
                </div>
            </div>
            <TopAdsBanner />
        </>
    );
}
