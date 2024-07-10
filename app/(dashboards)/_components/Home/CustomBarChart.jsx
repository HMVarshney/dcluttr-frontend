"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartHeader from './ChartHeader';
import ChartFooter from './ChartFooter';
import CustomTooltip from './CustomTooltip';

// const data = [
//   { name: 'A', uv: 4000, pv: 2400 },
//   { name: 'B', uv: 4000, pv: 2400 },
//   { name: 'C', uv: 4000, pv: 2400 },
//   { name: 'D', uv: 4000, pv: 2400 },
//   { name: 'E', uv: 4000, pv: 2400 },
//   { name: 'F', uv: 4000, pv: 2400 },
// ];

export default function CustomBarChart({ data, details, dragHandleProps }) {
  return (
    <div className='shadow rounded-lg bg-white w-full overflow-hidden group'>
      <ChartHeader details={details} dragHandleProps={dragHandleProps} />
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={data?.data}
          margin={{
            top: 10, right: 16, left: -20, bottom: 0,
          }}
        >
          <CartesianGrid
            strokeWidth={1}
            stroke="#D1D3DA8F"
          />
          <XAxis axisLine={false} tickLine={false}
            tick={{ fill: '#6B7583', fontSize: 10, fontWeight: 400 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7583', fontSize: 10, fontWeight: 400 }} />
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Bar dataKey="s" fill="url(#colorGreen)" />
          <Bar dataKey="r" fill="url(#colorPurple)" />

          <defs>
            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#66CB96" stopOpacity={1} />
              <stop offset="95%" stopColor="#1C8E52" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#BA8FFF" stopOpacity={1} />
              <stop offset="95%" stopColor="#784DBD" stopOpacity={1} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
      <ChartFooter data={data} />
    </div>
  )
};

