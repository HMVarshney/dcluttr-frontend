"use client";

import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import moment from "moment";
import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

const timePeriods = [
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

export default function DatePickerWithRange({ className, dateRange, setDateRange }) {
  const [isOpen, setOpen] = useState(false);

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
            {timePeriods?.map((ele) => (
              <Button
                onClick={() => {
                  setOpen(false);
                  setDateRange(ele);
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
                if (range.to && range.from) {
                  setDateRange({
                    from: moment(range.from).format("YYYY-MM-DD"),
                    to: moment(range.to).format("YYYY-MM-DD"),
                    value: null,
                    label: null
                  });
                }
              }}
              numberOfMonths={2}
              className="px-0 pt-6"
            />
            <div className="flex gap-2 justify-end items-center py-4">
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Apply Changes
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
