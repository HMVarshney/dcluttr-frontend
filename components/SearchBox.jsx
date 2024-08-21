import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchBox({ value, onValueChange }) {
  return (
    <div className="relative overflow-hidden">
      <Input
        className={cn("w-[200px] pl-8 transition-all focus-visible:ring-0", {
          "pl-3": value.length > 0
        })}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="Search for brand"
      />
      <div
        className={cn("absolute left-2 top-1/2 transform -translate-y-1/2 transition-all", {
          "-left-5": value.length > 0
        })}
      >
        <Search className="w-4 h-4 text-icon" />
      </div>
    </div>
  );
}
