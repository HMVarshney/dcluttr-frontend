"use client";

import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Forward } from "lucide-react";
import { Share } from "phosphor-react";

export default function ExportFileFormat({ children, variant = "outline" }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant={variant}>
            <Share className="w-4 h-4 mr-2 " />
            <div className="font-medium text-sm">Export</div>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={(e) => e.stopPropagation()} side="bottom" sideOffset={0} className="w-52 mr-10 mt-1 p-2">
        <div className="flex items-center p-1.5 text-[#7F7D83]">
          <Forward className="w-4 h-4 mr-2" />
          <div className="text-xs ">Export File Format</div>
        </div>
        <DropdownMenuItem>CSV</DropdownMenuItem>
        <DropdownMenuItem>XLSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
