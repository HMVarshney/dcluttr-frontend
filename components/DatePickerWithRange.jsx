"use client";

import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import moment from "moment";
import { Mulish } from "next/font/google";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setDateRange, setEndDateRange, setIsCompareOn } from "@/lib/store/features/userSlice";
import { Switch } from "./ui/switch";

const mulish = Mulish({ subsets: ["latin"] });
const START_TIME_RANGES = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "last 7 days" },
  { label: "Last 30 days", value: "last 30 days" },
  { label: "Last 90 days", value: "last 90 days" },
  { label: "Last month", value: "last months" },
  { label: "This week", value: "this week" },
  { label: "This month", value: "last month" },
  { label: "This quarter", value: "this quarter" },
  { label: "This year", value: "this year" },
  { label: "Custom", value: "custom" }
];

const END_TIME_RANGES = [
  { label: "None", value: "today" },
  { label: "Previous period", value: "Previous period" },
  { label: "Previous week", value: "Previous week" },
  { label: "Previous month", value: "Previous month" },
  { label: "Previous quarter", value: "Previous quarter" },
  { label: "Previous year", value: "Previous year" },
  { label: "Custom", value: "custom" }
];

export default function DatePickerWithRange({ className }) {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const { isCompareOn, endDateRange, dateRange } = useSelector((state) => state.user);

  return (
    <div className={cn("grid gap-2 font", className, mulish.className)}>
      <Popover open={isOpen} onOpenChange={(e) => setOpen(e)}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[240px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarDays className="mr-2 min-h-4 min-w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {moment(dateRange.from).format("MMM DD, YYYY")} - {moment(dateRange.to).format("MMM DD, YYYY")}
                </>
              ) : (
                moment(dateRange.from).format("MMM DD, YYYY")
              )
            ) : (
              <span>{dateRange?.label ?? "Pick a date"}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 flex items-stretch overflow-hidden mr-20" align="start">
          <div className="w-40 bg-[#FAFAFA] border-e p-4 flex flex-col gap-1.5">
            {START_TIME_RANGES?.map((ele) => (
              <Button
                onClick={() => {
                  setOpen(false);
                  dispatch(setDateRange(ele));
                }}
                size="sm"
                variant={"outline"}
                key={ele.label}
                className="w-full justify-start text-left text-sm border-none bg-transparent font-normal"
              >
                {ele.label}
              </Button>
            ))}
          </div>
          <div className="">
            <div className="flex">
              <div className="px-6 flex flex-col pt-20">
                <div className="flex items-center gap-3 ">
                  <Button variant={"outline"} className="w-full justify-start text-left font-medium border-[#DFE0E5]">
                    {moment(dateRange?.from).format("MMM DD, YYYY")}
                  </Button>
                  <Button variant={"outline"} className="w-full justify-start text-left font-medium border-[#DFE0E5]">
                    {moment(dateRange?.to).format("MMM DD, YYYY")}
                  </Button>
                </div>
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(range) => {
                    // if (range.to && range.from) {
                    dispatch(
                      setDateRange({
                        from: moment(range.from).format("YYYY-MM-DD"),
                        to: moment(range.to).format("YYYY-MM-DD"),
                        value: null,
                        label: null
                      })
                    );
                    // }
                  }}
                  numberOfMonths={1}
                  className="px-0 pt-6"
                />
              </div>
              <div
                className={cn("px-6 flex flex-col pt-20 overflow-hidden transition-all opacity-100 max-w-[400px]", {
                  "max-w-0 px-0 opacity-0": !isCompareOn
                })}
              >
                <div className="flex items-center gap-3 ">
                  <Button variant={"outline"} className="w-full justify-start text-left font-medium border-[#DFE0E5]">
                    {moment(endDateRange?.from).format("MMM DD, YYYY")}
                  </Button>
                  <Button variant={"outline"} className="w-full justify-start text-left font-medium border-[#DFE0E5]">
                    {moment(endDateRange?.to).format("MMM DD, YYYY")}
                  </Button>
                </div>
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={endDateRange?.from}
                  selected={endDateRange}
                  onSelect={(range) => {
                    // if (range.to && range.from) {
                    dispatch(
                      setEndDateRange({
                        from: moment(range.from).format("YYYY-MM-DD"),
                        to: moment(range.to).format("YYYY-MM-DD"),
                        value: null,
                        label: null
                      })
                    );
                    // }
                  }}
                  numberOfMonths={1}
                  className="px-0 pt-6"
                />
              </div>
            </div>

            <div className="flex gap-2 justify-between items-center p-4 border-t border-[#DFE0E5]">
              <Button size="sm" onClick={() => setOpen(false)}>
                Apply Changes
              </Button>
              <div className="flex items-center space-x-2 py-2">
                <Label htmlFor="Compare">Compare</Label>
                <Switch
                  checked={isCompareOn}
                  onCheckedChange={(e) => {
                    dispatch(setIsCompareOn(e));
                  }}
                  id="Compare"
                  className="w-10 h-6"
                  iconClass="w-5 h-5 data-[state=checked]:translate-x-4"
                />
              </div>
            </div>
          </div>

          <div
            className={cn("w-40 bg-[#FAFAFA] border-e p-4 flex flex-col gap-1.5 overflow-hidden transition-all opacity-100", {
              "w-0 opacity-0 p-0": !isCompareOn
            })}
          >
            {END_TIME_RANGES?.map((ele) => (
              <Button
                onClick={() => {
                  setOpen(false);
                  dispatch(setEndDateRange(ele));
                }}
                size="sm"
                variant={"outline"}
                key={ele.label}
                className="w-full justify-start text-left text-sm border-none bg-transparent font-normal"
              >
                {ele.label}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
