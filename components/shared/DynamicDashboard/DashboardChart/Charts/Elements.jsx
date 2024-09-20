"use client";

import { ArrowUp, CircleHelp, Grip } from "lucide-react";
import { DotsNine, Question, Share } from "phosphor-react";
import Image from "next/image";
import ExportFileFormat from "@/components/ExportFileFormat";
import { cn, numberTrim } from "@/lib/utils";
import Hint from "@/components/Hint";

export function ChartHeader({ details, gaugeData }) {
  const diff = ((gaugeData[1] - gaugeData[0]) / (gaugeData[0] || 1)) * 100;
  return (
    <>
      <div className="flex items-center p-3 border-b border-[#F1F1F1]">
        <Image
          src={details.icon}
          alt={details.title}
          width={44}
          height={44}
          className="w-5 h-5 object-contain mr-2.5 not-draggable"
        />
        <div className="text-sm font-semibold text-[#515153] not-draggable">{details.title}</div>
        <div className="ml-auto flex gap-2 items-center">
          <Hint label={details?.description}>
            <Question className="duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 cursor-pointer" />
          </Hint>
          <ExportFileFormat>
            <Share className="duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 cursor-pointer" />
          </ExportFileFormat>
          <DotsNine className="duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 cursor-grab" />
        </div>
      </div>
      <div className="flex items-center justify-between px-3 pt-2.5 not-draggable">
        <Hint label={`₹${(gaugeData[1] ?? gaugeData[0])?.toFixed(2)}`}>
          <div className=" text-2xl font-bold text-black">₹{numberTrim(gaugeData[1] ?? gaugeData[0])}</div>
        </Hint>
        {gaugeData[1] !== null && (
          <div>
            <div
              className={cn("text-sm font-semibold text-green-600 flex items-center justify-end", {
                "text-[#DB3500CC]": diff < 0
              })}
            >
              <ArrowUp className={cn("w-4", { "rotate-180": diff < 0 })} />
              {diff?.toFixed(2)}%
            </div>
            <Hint label={`vs ₹${(gaugeData[0] ?? 0)?.toFixed(2)} last month`}>
              <div className="text-[10px] text-gray-400 text-right">vs ₹{numberTrim(gaugeData[0] ?? 0)} last month</div>
            </Hint>
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
