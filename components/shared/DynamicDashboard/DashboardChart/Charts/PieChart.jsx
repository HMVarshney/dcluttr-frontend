"use client";

import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#B1BA88", "#C3D8CC", "#E87C67", "#EDA2A2"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className=" border rounded shadow flex flex-col bg-white px-4 py-2">
        <div className="text-xs font-semibold text-[#0A090B4D]">{payload[0].name}</div>
        <div className="text-base font-bold text-[#0A090B]">{payload[0].value}</div>
      </div>
    );
  }
  return null;
};

const DonutChart = ({ details, chartData }) => {
  const [unselected, setUnselected] = useState({});

  const data = useMemo(() => {
    if (!Object.keys(unselected).length) return chartData.results;
    return chartData.results.filter((res) => !unselected[res.x]);
  }, [chartData.results, unselected]);

  return (
    <div className="w-full">
      <div className="text-xl font-bold mb-4">{details.title}</div>
      <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white w-full h-[calc(100%-44px)] overflow-hidden group flex flex-col justify-between items-stretch">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              fill="#8884d8"
              paddingAngle={0}
              nameKey="x"
              dataKey={chartData.columns?.[0]?.key}
            >
              {data.map((_, index) => {
                return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="py-4 px-5 text-xs font-semibold border-t border-[#F1F1F1] flex items-center gap-4 overflow-x-auto">
          {chartData.results?.map((entry, index) => (
            <div
              key={entry.x}
              className="py-2.5 px-4 rounded-full border flex items-center gap-2 bg-white cursor-pointer"
              onClick={() => {
                if (unselected[entry.x]) {
                  setUnselected((cur) => ({ ...cur, [entry.x]: false }));
                } else {
                  setUnselected((cur) => ({ ...cur, [entry.x]: true }));
                }
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: !unselected[entry.x] ? COLORS[index % COLORS.length] : "#747373" }}
              />
              <div className="text-sm font-semibold">{entry.x}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
