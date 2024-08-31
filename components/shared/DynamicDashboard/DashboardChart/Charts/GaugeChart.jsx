"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, CircleHelp, Grip } from "lucide-react";
import Image from "next/image";

export default function GaugeChart({ isLoading = false, data, details }) {
  return (
    <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white w-full overflow-hidden group">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className="flex items-center px-4 py-3">
            <div className="text-xs font-semibold text-[#515153]">{details.title}</div>
            <div className="ml-auto flex gap-2 items-center">
              <CircleHelp className="duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100" />
              <div>
                <Grip className="duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100" />
              </div>
            </div>
          </div>
          <SubChart icon={details.icon} data={data} />
        </>
      )}
    </div>
  );
}

export function SubChart({ icon, data }) {
  return (
    <div className="flex items-center gap-2 px-3 py-3.5 border-t border-[#F1F1F1]">
      <Image src={icon} alt={icon} width={24} height={24} className="w-6 h-6 object-contain" />
      <div className=" text-2xl font-bold text-black">₹{data[1] ?? data[0]}</div>
      {data[1] !== null && (
        <div className="ml-auto">
          <div className="text-sm font-semibold text-green-600 flex items-center justify-end">
            <ArrowUp className="w-4" />
            {((data[1] - data[0]) / (data[0] || 1)) * 100}%
          </div>
          <div className="text-[10px] text-gray-400 text-right">vs ₹{data[0]} last month</div>
        </div>
      )}
    </div>
  );
}
