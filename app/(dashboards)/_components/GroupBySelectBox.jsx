"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { CaretDown } from "phosphor-react";

export function GroupBySelectBox({ value, onValueChange, options }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" outline-none focus:ring-0 focus:outline-none" asChild>
        <Button variant="outline" className="pr-2">
          Group by: {value?.label}
          <CaretDown className="min-w-3 w-3 h-3 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuRadioGroup
          value={value?.value}
          onValueChange={(value) => onValueChange(options?.filter((f) => f.value === value)[0])}
        >
          {options.map((option, i) => (
            <DropdownMenuRadioItem key={i} value={option.value}>
              <div className="flex items-center gap-3">{option.label}</div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
