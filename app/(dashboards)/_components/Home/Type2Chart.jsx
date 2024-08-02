"use client";

import React, { Fragment } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "@/components/CustomTooltip";
import CustomActiveDot from "@/components/CustomActiveDot";
import { ArrowUp } from "lucide-react";
import ChartHeader from "./ChartHeader";

export default function Type2Chart({ data, details, dragHandleProps }) {
    return (
        <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white w-full overflow-hidden group">
            <ChartHeader details={details} dragHandleProps={dragHandleProps} />
            <ResponsiveContainer width="100%" height={160}>
                <AreaChart
                    data={data.data}
                    margin={{
                        top: 10,
                        right: 16,
                        left: -20,
                        bottom: 0
                    }}
                >
                    <CartesianGrid strokeWidth={1} stroke="#D1D3DA8F" />
                    <XAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7583", fontSize: 10, fontWeight: 400 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7583", fontSize: 10, fontWeight: 400 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {data.series?.map((ele) => (
                        <Fragment key={ele.name}>
                            <Area
                                type="monotone"
                                dataKey={ele.dataKey}
                                stroke={ele.color}
                                fillOpacity={1}
                                fill={`url(#${ele.name}-${ele.id})`}
                                activeDot={<CustomActiveDot />}
                            />
                            <defs>
                                <linearGradient id={`${ele.name}-${ele.id}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={ele.color} stopOpacity={0.15} />
                                    <stop offset="95%" stopColor={ele.color} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                        </Fragment>
                    ))}

                    {/* <Area type="monotone" dataKey="pv" stroke={details.color} fillOpacity={1} fill={`url(#${details.id})`}
          activeDot={<CustomActiveDot details={details} />} />
          <Area type="monotone" dataKey="pv" stroke="#DB3500" strokeDasharray="3 3" fill="#fff" fillOpacity={0} /> */}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
