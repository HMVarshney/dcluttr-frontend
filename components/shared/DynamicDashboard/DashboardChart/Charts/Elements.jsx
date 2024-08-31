"use client";

import { ArrowUp, CircleHelp, Grip } from "lucide-react";
import { Share } from "phosphor-react";
import Image from "next/image";
import ExportFileFormat from "@/components/ExportFileFormat";

export function ChartHeader({ details, gaugeData }) {
  return (
    <>
      <div className="flex items-center p-3 border-b border-[#F1F1F1]">
        <Image src={details.icon} alt={details.title} width={16} height={16} className="w-4 h-4 object-contain mr-2.5" />
        <div className="text-xs font-semibold text-[#515153]">{details.title}</div>
        <div className="ml-auto flex gap-2 items-center">
          <CircleHelp className="duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100" />
          <ExportFileFormat>
            <Share className="duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 cursor-pointer" />
          </ExportFileFormat>
          <div>
            <Grip className="duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-3 pt-2.5">
        <div className=" text-2xl font-bold text-black">₹{gaugeData[1] ?? gaugeData[0]}</div>
        {gaugeData[1] !== null && (
          <div>
            <div className="text-sm font-semibold text-green-600 flex items-center justify-end">
              <ArrowUp className="w-4" />
              {((gaugeData[1] - gaugeData[0]) / (gaugeData[0] || 1)) * 100}%
            </div>
            <div className="text-[10px] text-gray-400 text-right">vs ₹{gaugeData[0]} last month</div>
          </div>
        )}
      </div>
    </>
  );
}

export function ChartFooter({ data }) {
  return (
    <div className="p-3 text-xs font-semibold text-[#515153] border-t border-[#F1F1F1] flex items-center gap-4">
      {data?.series?.map((ele) => (
        <div key={ele.name} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ele.color }} />
          <div className="text-xs text-[#7D7D7E]">{ele.name}</div>
        </div>
      ))}
    </div>
  );
}
