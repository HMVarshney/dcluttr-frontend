"use client";

import React, { Fragment } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CustomActiveDot from "@/components/CustomActiveDot";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartHeader } from "./Elements";

const colors = ["#05732d", "#9A66ED"];

function labelFormatter(value, name) {
  return [value, name];
}

function AreaChart1({ isLoading = false, gaugeData, chartData, details }) {
  return (
    <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white w-full h-full group">
      <ChartHeader gaugeData={gaugeData} details={details} />
      {isLoading ? (
        <Skeleton className="w-[calc(100%-32px)] h-[128px] my-4 rounded-md mx-auto" />
      ) : (
        <ResponsiveContainer width="100%" height="70%">
          <AreaChart
            data={chartData.results}
            margin={{
              top: 10,
              right: 16,
              left: -20,
              bottom: 0
            }}
          >
            <CartesianGrid strokeWidth={1} stroke="#D1D3DA8F" />
            <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: "#6B7583", fontSize: 10, fontWeight: 400 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7583", fontSize: 10, fontWeight: 400 }} />
            <Tooltip formatter={labelFormatter} />

            {chartData.columns.map((ele, index) => (
              <Fragment key={ele.key}>
                <Area
                  type="monotone"
                  dataKey={ele.key}
                  stroke={colors[index]}
                  fillOpacity={1}
                  fill={`url(#${ele.key.replace(/\s+/g, "")})`}
                  activeDot={<CustomActiveDot />}
                />
                <defs>
                  <linearGradient id={ele.key.replace(/\s+/g, "")} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[index]} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={colors[index]} stopOpacity={0} />
                  </linearGradient>
                </defs>
              </Fragment>
            ))}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default AreaChart1;
