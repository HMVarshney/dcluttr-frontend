"use client";

import { ArrowUp, CircleHelp, Grip } from "lucide-react";
import Image from "next/image";
import React, { Fragment } from "react";

export default function Type3Chart({ isLoading = false, data, details, dragHandleProps = {} }) {
    return (
        <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white w-full overflow-hidden group">
            <div className="flex items-center px-4 py-3">
                <div className="text-xs font-semibold text-[#515153]">Unique Customers</div>
                <div className="ml-auto flex gap-2 items-center">
                    <CircleHelp className="duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100" />
                    <div {...dragHandleProps}>
                        <Grip className="duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100" />
                    </div>
                </div>
            </div>
            <Type3SubChart icon={"/band-logo/shopify.png"} value={68.45} />
            <Type3SubChart icon={"/band-logo/google.png"} value={55.96} />
            <Type3SubChart icon={"/band-logo/shopify.png"} value={70.69} />
        </div>
    );
}

export function Type3SubChart({ icon, value }) {
    return (
        <>
            <div className="flex items-center gap-2 px-3 py-3.5 border-t border-[#F1F1F1]">
                <Image src={icon} alt={icon} width={24} height={24} className="w-6 h-6 object-contain" />
                <div className=" text-2xl font-bold text-black">{value}</div>
                <div className="ml-auto">
                    <div className="text-sm font-semibold text-green-600 flex items-center justify-end">
                        <ArrowUp className="w-4" />
                        2.4%
                    </div>
                    <div className="text-[10px] text-gray-400 text-right">vs 2.69 last month</div>
                </div>
            </div>
        </>
    );
}
