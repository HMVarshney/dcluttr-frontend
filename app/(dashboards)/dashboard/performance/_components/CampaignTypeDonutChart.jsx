"use client";

import React, { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getAdsTypeGoogle } from "@/lib/store/features/googleAdsSlice";

const COLORS = [
  { color: "#B1BA88", campaign_type: "PERFORMANCE_MAX", active: true },
  { color: "#C3D8CC", campaign_type: "SEARCH", active: true },
  { color: "#E87C67", campaign_type: "VIDEO", active: true },
  { color: "#EDA2A2", campaign_type: "DISCOVERY", active: true }
];

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

const CampaignTypeDonutChart = () => {
  const { data: allData } = useSelector((state) => state.googleAds.adsType);
  const [selected, setSelected] = useState(COLORS);

  const data = useMemo(() => {
    if (!allData.parsed) return [];
    return allData.parsed?.results?.map((item) => {
      if (selected.find((i) => i.campaign_type === item.campaign_type && i.active)) {
        return {
          name: item.campaign_type,
          value: parseInt(item.clicks_sum)
        };
      }
    });
  }, [allData, selected]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdsTypeGoogle());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="text-xl font-bold mb-4">Campaign Type</div>
      <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white w-full h-[calc(100%-44px)] overflow-hidden group flex flex-col justify-between items-stretch">
        <div className="flex gap-2.5 items-center p-4 border-b border-[#F1F1F1]">
          <div className="text-base font-bold">Campaign Type</div>
          <div className="flex-1"></div>
          {/* <Select>
            <SelectTrigger className="w-[140px] ">
              <SelectValue placeholder="Revenue 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="R-1">Revenue 1</SelectItem>
              <SelectItem value="R-2">Revenue 2</SelectItem>
              <SelectItem value="R-3">Revenue 3</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Orders 1" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="R-1">Orders 1</SelectItem>
              <SelectItem value="R-2">Orders 2</SelectItem>
              <SelectItem value="R-3">Orders 3</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
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
              dataKey="value"
            >
              {selected?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
          </PieChart>
        </ResponsiveContainer>
        <div className="py-4 px-5 text-xs font-semibold border-t border-[#F1F1F1] flex items-center gap-4 overflow-x-auto">
          {selected?.map((entry) => (
            <div
              key={entry.campaign_type}
              className="py-2.5 px-4 rounded-full border flex items-center gap-2 bg-white cursor-pointer"
              onClick={() =>
                setSelected(
                  selected.map((item) => ({
                    ...item,
                    active: item.campaign_type === entry.campaign_type ? !item.active : item.active
                  }))
                )
              }
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.active ? entry.color : "#747373" }}
              />
              <div className="text-sm font-semibold">{entry.campaign_type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignTypeDonutChart;
