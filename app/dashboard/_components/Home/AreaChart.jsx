"use client"

import React, { Fragment } from 'react';
import { AreaChart as Charts, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomActiveDot from './CustomActiveDot';
import { ArrowUp, CircleEllipsis, CircleHelp, Pin } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox"
import moment from 'moment';


export default function AreaChart({ data, details }) {
  return (
    <div className='shadow rounded-lg bg-white w-full overflow-hidden group'>
      <AreaChartHeader details={details} />
      <ResponsiveContainer width="100%" height={160}>
        <Charts
          data={data.data}
          margin={{
            top: 10, right: 16, left: -20, bottom: 0,
          }}
        >
          <CartesianGrid
            strokeWidth={1}
            stroke="#D1D3DA8F"
          />
          <XAxis
            dataKey={data.dataKeyXAxis
              ? (ele) => moment(ele["orders.created_at"]).format('DD MMM YY')
              : null} axisLine={false} tickLine={false}
            tick={{ fill: '#6B7583', fontSize: 10, fontWeight: 400 }} />

          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7583', fontSize: 10, fontWeight: 400 }} />

          <Tooltip content={<CustomTooltip />} />

          {data.series?.map(ele => <Fragment key={ele.name}>
            <Area
              type="monotone"
              dataKey={ele.dataKey}
              stroke={ele.color}
              strokeDasharray={ele.type !== 'area' ? "2 2" : null}
              fillOpacity={1} fill={`url(#${ele.name}-${ele.id})`}
              activeDot={<CustomActiveDot />}
            />
            {ele.type === 'area' &&
              <defs>
                <linearGradient id={`${ele.name}-${ele.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={ele.color} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={ele.color} stopOpacity={0} />
                </linearGradient>
              </defs>}
          </Fragment>)}

        </Charts>
      </ResponsiveContainer>
      <AreaChartFooter data={data} />
    </div>
  );
}



export function AreaChartHeader({ details }) {
  return (
    <>
      <div className='flex items-center px-4 py-3 border-b border-[#F1F1F1]'>
        <Checkbox
          className="duration-300 ease-in-out w-0 border-0 opacity-0 mr-0 
        group-hover:w-4 group-hover:border group-hover:opacity-100 group-hover:mr-3 " />
        <div className='text-xs font-semibold text-[#515153]'>
          {details.title}
        </div>
        <div
          className="ml-auto flex gap-2">
          <CircleHelp className='duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100' />
          <Pin className='duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100' />
          <CircleEllipsis className='duration-300 ease-in-out w-0 opacity-0 group-hover:w-4 group-hover:opacity-100' />
        </div>
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
    </>
  )
}

export function AreaChartFooter({ data }) {
  return (
    <div className='p-3 text-xs font-semibold text-[#515153] border-t border-[#F1F1F1] flex items-center gap-4'>
      {data?.series?.map(ele =>
        <div key={ele.name} className='flex items-center gap-2'>
          <div className='w-1.5 h-1.5 rounded-full' style={{ backgroundColor: ele.color }} />
          <div className='text-xs text-[#7D7D7E]'>{ele.name}</div>
        </div>)}
    </div>
  )
}
