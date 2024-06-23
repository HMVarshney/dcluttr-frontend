"use client"

import React, { useState } from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import moment from "moment"

const timePeriods = [
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last 365 days",
    "Last month",
    "Last 12 months",
    "Last year",
    "Week to date",
    "Month to date",
    "Quarter to date",
    "Year to date",
    "Quarters"
];

export function DatePickerWithRange({ className, dateRange, setDateRange }) {
    const [isOpen, setOpen] = useState(false)

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover open={isOpen} onOpenChange={e => setOpen(e)}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[260px] justify-start text-left font-normal",
                            !dateRange && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                            dateRange.to ? (
                                <>
                                    {moment(dateRange.from).format("MMM DD, YYYY")} -{" "}
                                    {moment(dateRange.to).format("MMM DD, YYYY")}
                                </>
                            ) : (
                                moment(dateRange.from).format("MMM DD, YYYY")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 flex items-stretch overflow-hidden" align="start">
                    <div className="w-40 bg-slate-50 p-4" >
                        {timePeriods?.map(ele =>
                            <Button
                                onClick={() => setOpen(false)}
                                size="sm"
                                variant={"outline"}
                                key={ele}
                                className="w-full justify-start text-left text-sm border-none bg-transparent">
                                {ele}
                            </Button>)}
                    </div>
                    <div className="px-6 flex flex-col justify-end">
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
                            onSelect={setDateRange}
                            numberOfMonths={2}
                            className="px-0"
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
    )
}
