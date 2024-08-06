"use client";

import React, { useState } from "react";
import { CalendarDays, Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import moment from "moment";

const timePeriods = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "last 7 days" },
  { label: "Last 30 days", value: "last 30 days" },
  { label: "Last 90 days", value: "last 90 days" },
  { label: "Last 365 days", value: "last 365 days" },
  { label: "Last month", value: "last months" },
  { label: "Last 12 months", value: "last 12 months" },
  { label: "Last year", value: "last year" },
  { label: "Week to date", value: "this week" },
  { label: "Month to date", value: "this month" },
  { label: "Quarter to date", value: "this quarter" },
  { label: "Year to date", value: "this year" },
  { label: "Quarters", value: "this quarter" }
];

export default function DatePickerWithRange({ className, dateRange, setDateRange }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={(e) => setOpen(e)}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[240px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarDays className="mr-2 h-5 w-5" />
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
        <PopoverContent className="w-auto p-0 flex items-stretch overflow-hidden" align="start">
          <div className="w-40 bg-slate-50 p-4">
            {timePeriods?.map((ele) => (
              <Button
                onClick={() => {
                  setOpen(false);
                  setDateRange(ele);
                }}
                size="sm"
                variant={"outline"}
                key={ele.label}
                className="w-full justify-start text-left text-sm border-none bg-transparent"
              >
                {ele.label}
              </Button>
            ))}
          </div>
          <div className="px-6 flex flex-col pt-20">
            <div className="flex items-center gap-3 ">
              <Button variant={"outline"} className="w-full justify-start text-left">
                {moment(dateRange?.from).format("MMM DD, YYYY")}
              </Button>
              <Button variant={"outline"} className="w-full justify-start text-left">
                {moment(dateRange?.to).format("MMM DD, YYYY")}
              </Button>
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(range) => {
                if (range) {
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
