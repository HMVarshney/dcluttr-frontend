"use client";

import React, { useEffect, useMemo, useState } from "react";
import { parseRawLoadResponse } from "@/lib/utils/cubejs.utils";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import cubeJsApi from "@/lib/cubeJsApi";

const COLORS = [
  { color: "#B1BA88", campaign_type: "PERFORMANCE_MAX", active: true },
  { color: "#C3D8CC", campaign_type: "SEARCH", active: true },
  { color: "#E87C67", campaign_type: "VIDEO", active: true },
  { color: "#EDA2A2", campaign_type: "DISCOVERY", active: true }
];

async function fetchCubejsQuery(query) {
  const cubejsClient = cubeJsApi();
  const response = await cubejsClient.load(query);
  return { raw: response.loadResponse, parsed: parseRawLoadResponse(response.loadResponse) };
}

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

const DonutChart = ({ title, description, query }) => {
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(COLORS);

  const data = useMemo(() => {
    return results.map((item) => {
      if (selected.find((i) => i.campaign_type === item.name && i.active)) {
        return {
          name: item.name,
          value: parseInt(item.value)
        };
      }
    });
  }, [results, selected]);

  useEffect(() => {
    (async function () {
      try {
        const { parsed } = await fetchCubejsQuery(query);
        setResults(parsed.results.map((r) => ({ name: r.name, value: r.clicks_sum })));
        setColumns(parsed.columns);
      } catch (err) {
        console.error("Error in piechart:", err);
      }
    })();
  }, [query]);

  return (
    <div className="w-full">
      <div className="text-xl font-bold mb-4">{title}</div>
      <div className="border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white w-full h-[calc(100%-44px)] overflow-hidden group flex flex-col justify-between items-stretch">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={110} fill="#8884d8" paddingAngle={0} dataKey="value">
              {selected?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
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
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.active ? entry.color : "#747373" }} />
              <div className="text-sm font-semibold">{entry.campaign_type}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
