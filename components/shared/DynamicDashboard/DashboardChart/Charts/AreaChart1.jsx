"use client";

import React, { Fragment, memo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import moment from "moment";
import CustomActiveDot from "@/components/CustomActiveDot";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartHeader } from "./Elements";
import CustomTooltip from "@/components/CustomTooltip";
import { numberTrim } from "@/lib/utils";

const colors = ["#2EB76F", "#9A66ED"];

function tickFormatter(value) {
  if (moment(value).isValid()) {
    return moment(value).format("D MMM");
  }
  return value;
}

function AreaChart1({ isLoading = false, gaugeData, chartData, details }) {
  return (
    <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white w-full group overflow-hidden">
      <ChartHeader gaugeData={gaugeData} details={details} />
      {isLoading ? (
        <Skeleton className="w-[calc(100%-32px)] h-[132px] my-4 rounded-md mx-auto" />
      ) : (
        <ResponsiveContainer width="100%" height={166} className="not-draggable">
          <AreaChart
            data={chartData.results}
            margin={{
              top: 10,
              right: 16,
              left: -14,
              bottom: 0
            }}
          >
            <CartesianGrid strokeWidth={1} stroke="#D1D3DA8F" />
            <XAxis
              tickFormatter={tickFormatter}
              dataKey="x"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7583", fontSize: 10, fontWeight: 400 }}
              minTickGap={20}
              interval="equidistantPreserveStart"
            />
            <YAxis
              tickFormatter={numberTrim}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7583", fontSize: 10, fontWeight: 400 }}
            />
            {/* <Tooltip formatter={labelFormatter} /> */}
            <Tooltip content={<CustomTooltip title={details?.title} />} />

            {chartData.columns.map((ele, index) => (
              <Fragment key={ele.key}>
                <Area
                  type="bump"
                  dataKey={ele.key}
                  stroke={colors[index]}
                  fillOpacity={1}
                  strokeDasharray={index === 0 ? null : "2 2"}
                  fill={`url(#${ele.key.replace(/[\s.,:]+/g, "")})`}
                  activeDot={<CustomActiveDot />}
                />

                {index === 0 && (
                  <defs>
                    <linearGradient id={ele.key.replace(/[\s.,:]+/g, "")} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={colors[index]} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={colors[index]} stopOpacity={0} />
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

export default memo(AreaChart1);
