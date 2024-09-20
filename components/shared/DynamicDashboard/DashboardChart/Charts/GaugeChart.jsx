"use client";

import ExportFileFormat from "@/components/ExportFileFormat";
import Hint from "@/components/Hint";
import { Skeleton } from "@/components/ui/skeleton";
import { numberTrim } from "@/lib/utils";
import { ArrowUp, CircleHelp, Grip } from "lucide-react";
import Image from "next/image";
import { DotsNine, Question, Share } from "phosphor-react";

export default function GaugeChart({ isLoading = false, data, details }) {
  return (
    <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white w-full overflow-hidden group">
      {isLoading ? (
        <Skeleton />
      ) : (
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
          <div className="flex items-center gap-2 p-3 border-t border-[#F1F1F1]">
            <div className=" text-2xl font-bold text-black">₹{numberTrim(data[1] ?? data[0])}</div>
            {data[1] !== null && (
              <div className="ml-auto">
                <div className="text-sm font-semibold text-green-600 flex items-center justify-end">
                  <ArrowUp className="w-4" />
                  {numberTrim(((data[1] - data[0]) / (data[0] || 1)) * 100)}%
                </div>
                <div className="text-[10px] text-gray-400 text-right">vs ₹{data[0]} last month</div>
              </div>
            )}
          </div>
          <SubChart data={data} name="NC ROAS" />
          <SubChart data={data} name="Returning Customers" />
          <SubChart data={data} name="Unique Customers" />
        </>
      )}
    </div>
  );
}

export function SubChart({ data, name }) {
  //TODO data integration
  return (
    <div className="flex items-center gap-2 p-3 border-t border-[#F1F1F1]">
      <div className="w-2/3 text-xs font-medium text-gray-600 line-clamp-1">{name}</div>
      <div className="w-1/3 text-xs font-semibold text-gray-600 flex items-center justify-end">
        4.88%
        <ArrowUp className="w-4 text-green-600 ml-3" />
        <span className="text-green-600">44%</span>
      </div>
    </div>
  );
}
