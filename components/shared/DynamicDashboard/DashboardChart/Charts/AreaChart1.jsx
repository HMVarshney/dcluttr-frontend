"use client";

import React, { Fragment } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CustomTooltip from "@/components/CustomTooltip";
import CustomActiveDot from "@/components/CustomActiveDot";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartHeader } from "./Elements";

function AreaChart1({ isLoading = false, data, details }) {
  return (
    <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white w-full h-full overflow-hidden group">
      <ChartHeader details={details} />
      {isLoading ? (
        <Skeleton className="w-[calc(100%-32px)] h-[128px] my-4 rounded-md mx-auto" />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data.results.slice(-10)}
            margin={{
              top: 10,
              right: 16,
              left: -20,
              bottom: 0
            }}
          >
            <CartesianGrid strokeWidth={1} stroke="#D1D3DA8F" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7583", fontSize: 10, fontWeight: 400 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7583", fontSize: 10, fontWeight: 400 }} />
            <Tooltip content={<CustomTooltip />} />

            {data.columns.map((ele) => (
              <Fragment key={ele.name}>
                <Area
                  type="monotone"
                  dataKey={ele.dataKey}
                  stroke={ele.color}
                  strokeDasharray={ele.type !== "area" ? "2 2" : null}
                  fillOpacity={1}
                  fill={`url(#${ele.name}-${ele.id})`}
                  activeDot={<CustomActiveDot />}
                />
                {ele.type === "area" && (
                  <defs>
                    <linearGradient id={`${ele.name}-${ele.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ele.color} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={ele.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                )}
              </Fragment>
            ))}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default AreaChart1;
