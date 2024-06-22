"use client"

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomActiveDot from './CustomActiveDot';
import { ArrowUp } from 'lucide-react';


export default function SimpleAreaChart({ data, details }) {
  return (
    <div className='shadow rounded-lg bg-white w-full overflow-hidden'>
      <div className='px-4 py-3 text-xs font-semibold text-[#515153] border-b border-[#F1F1F1]'>
        {details.title}
      </div>
      <div className='flex items-center justify-between px-3 pt-2.5'>
        <div className=' text-2xl font-bold text-black'>
          ₹2,45,982
        </div>
        <div className=''>
          <div className='text-sm font-semibold text-green-600 flex items-center justify-end'>
            <ArrowUp className='w-4' />
            2.4%
          </div>
          <div className='text-[10px] text-gray-400 text-right'>
            vs 2.69 last month
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart
          data={data.data}
          margin={{
            top: 10, right: 16, left: -20, bottom: 0,
          }}
        >
          <CartesianGrid
            strokeWidth={1}
            stroke="#D1D3DA8F"
          />
          <XAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7583', fontSize: 10, fontWeight: 400 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7583', fontSize: 10, fontWeight: 400 }} />
          <Tooltip content={<CustomTooltip />} />
          {data.series?.map(ele =>
            <Area key={ele.name}
              type="monotone"
              dataKey={ele.dataKey}
              stroke={ele.color}
              fillOpacity={1} fill={`url(#${ele.id})`}
              activeDot={<CustomActiveDot color={ele.color}
              />}
            />)}
          {/*         
        <Area type="monotone" dataKey="pv" stroke={details.color} fillOpacity={1} fill={`url(#${details.id})`}
          activeDot={<CustomActiveDot details={details} />} />

        <Area type="monotone" dataKey="pv" stroke="#DB3500" strokeDasharray="3 3" fill="#fff" fillOpacity={0} /> */}
          <defs>
            <linearGradient id={details.id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={details.color} stopOpacity={0.15} />
              <stop offset="95%" stopColor={details.color} stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
      <div className='p-3 text-xs font-semibold text-[#515153] border-t border-[#F1F1F1] flex items-center gap-4'>
        {data.series?.map(ele =>
          <div key={ele.name} className='flex items-center gap-2'>
            <div className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: ele.color }} />
            <div className='text-xs text-[#7D7D7E]'>{ele.name}</div>
          </div>)}
      </div>
    </div>
  );
}



