"use client";

import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import CustomTooltip from "@/components/CustomTooltip";
import CustomActiveDot from "@/components/CustomActiveDot";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn, DFA, GROUP_BY, numberTrim } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { setGroupBy } from "@/lib/store/features/userSlice";

console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  console.log(...args);
};

function ChartHeader({ selected, options, onChange }) {
  const dispatch = useDispatch();

  const { groupBy } = useSelector((state) => state.user);

  return (
    <div className="flex gap-2.5 items-center p-4 border-b border-[#F1F1F1]">
      <Select value={selected[0]} onValueChange={(newValue) => onChange(0, newValue)}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Choose metric" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(options).map(([key, value]) => (
            <SelectItem key={key} value={key} disabled={key === selected[1]}>
              {value.shortTitle}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={groupBy.value}
        onValueChange={(newValue) => dispatch(setGroupBy(GROUP_BY.find((gb) => gb.value === newValue)))}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Group by: Day" />
        </SelectTrigger>
        <SelectContent>
          {GROUP_BY.map((value) => (
            <SelectItem value={value.value}>{value.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="w-full"></div>
      <Select value={selected[1]} onValueChange={(newValue) => onChange(1, newValue)}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Choose metric" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(options).map(([key, value]) => (
            <SelectItem key={key} value={key} disabled={key === selected[0]}>
              {value.shortTitle}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ChartFooter({ data }) {
  return (
    <div className="py-4 px-5 text-xs font-semibold text-[#515153] border-t border-[#F1F1F1] flex items-center justify-end gap-4">
      {data.columns?.map((ele) => (
        <div
          key={ele.name}
          className=" rounded-xl border-2 aspect-square overflow-hidden bg-white"
          style={{ borderColor: ele.color }}
        >
          <Image
            src={`/temp/creative_p${Math.floor(Math.random() * 3)}.png`}
            alt="logo"
            width={100}
            height={100}
            className="w-14 object-contain"
          />
        </div>
      ))}
    </div>
  );
}

function DatatableChart({ isLoading = false, chartData, measures }) {
  const [selected, setSelected] = useState({ 0: "", 1: "" });

  useEffect(() => {
    if (Object.keys(measures).length) {
      setSelected((prev) => ({ 0: Object.keys(measures)[0], 1: prev[1] }));
    }
  }, [measures]);

  const handleOptionChange = (optionId, newValue) => {
    setSelected((prev) => ({ ...prev, [optionId]: newValue }));
  };

  const columnsToShow = useMemo(() => {
    if (!chartData?.columns) return DFA;
    if (!selected[0] && !selected[1]) return DFA;

    return chartData.columns.filter((col) => col.yValues.includes(selected[0]) || col.yValues.includes(selected[1]));
  }, [chartData.columns, selected]);

  return (
    <div
      className={cn(
        "m-6 border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white overflow-hidden group max-h-[600px] opacity-100 transition-all",
        { " border-none shadow-none max-h-0 m-0 opacity-0": false }
      )}
    >
      <ChartHeader selected={selected} options={measures} onChange={handleOptionChange} />
      {isLoading ? (
        <Skeleton className="w-[calc(100%-32px)] h-[256px] my-4 rounded-md mx-auto" />
      ) : (
        <ResponsiveContainer width="100%" height={256}>
          <AreaChart
            data={chartData.results}
            margin={{
              top: 24,
              right: 16,
              left: -20,
              bottom: 0
            }}
          >
            <CartesianGrid strokeWidth={1} stroke="#d1d3da33" />
            <XAxis dataKey="x" axisLine={false} tickLine={false} tick={{ fill: "#6B7583", fontSize: 12, fontWeight: 400 }} />
            <YAxis
              tickFormatter={numberTrim}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7583", fontSize: 12, fontWeight: 400 }}
            />
            <Tooltip content={<CustomTooltip />} />

            {columnsToShow.map((ele) => (
              <Fragment key={ele.key}>
                <Area
                  type="monotone"
                  dataKey={ele.key}
                  stroke={ele.color}
                  strokeWidth={2}
                  strokeDasharray={ele.yValues[1] === selected[1] ? "10 6" : null}
                  fillOpacity={1}
                  fill={`url(#${ele.key.replace(/[\s.,:]+/g, "")})`}
                  activeDot={<CustomActiveDot />}
                />
              </Fragment>
            ))}
          </AreaChart>
        </ResponsiveContainer>
      )}
      <ChartFooter data={chartData} />
    </div>
  );
}

export default DatatableChart;
