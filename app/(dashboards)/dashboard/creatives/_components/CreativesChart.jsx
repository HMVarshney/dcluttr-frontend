"use client"

import React, { Fragment } from 'react';
import { AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { Skeleton } from '@/components/ui/skeleton';
import CustomTooltip from '@/components/CustomTooltip';
import CustomActiveDot from '@/components/CustomActiveDot';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowUp } from 'lucide-react';


console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  console.log(...args);
};

export default function CreativesChart({ data, isLoading = false, results = {}, }) {
  // const annotation = results?.annotation
  // const data = results?.data

  return (
    <div className='m-6 border border-[#F1F1F1] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.12)] rounded-lg bg-white overflow-hidden group'>
      <ChartHeader />
      <div className='flex items-center justify-between px-4 pt-2.5'>
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
      {isLoading
        ? <Skeleton className="w-[calc(100%-32px)] h-[212px] my-4 rounded-md mx-auto" />
        : <ResponsiveContainer width="100%" height={212}>
          <AreaChart
            data={data}
            margin={{
              top: 10, right: 16, left: -20, bottom: 0,
            }}
          >
            <CartesianGrid
              strokeWidth={1}
              stroke="#D1D3DA8F"
            />
            <XAxis
              dataKey={"date"} axisLine={false} tickLine={false}
              tick={{ fill: '#6B7583', fontSize: 10, fontWeight: 400 }} />

            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7583', fontSize: 10, fontWeight: 400 }} />

            <Tooltip content={<CustomTooltip />} />

            {Object.entries(data?.[0] ?? {})
              ?.map(([k, v], i) => {
                console.log(k, v);
                if (["purchase_value_sum", "count", "link_clicks_sum", ""].includes(k)) {
                  return (
                    <Fragment key={k}>
                      <Area
                        type="monotone"
                        dataKey={k}
                        // stroke={ele.color}
                        strokeDasharray={null}//"2 2"}
                        fillOpacity={1} fill={`url(#${k})`}
                        activeDot={<CustomActiveDot />}
                      />
                      <defs>
                        <linearGradient id={`${k}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stroke="#2EB76F" stopOpacity={0.15} />
                          <stop offset="95%" stroke="#2EB76F" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </Fragment>
                  )
                }
              })}
          </AreaChart>
        </ResponsiveContainer>}
      <ChartFooter data={data} />
    </div>
  );
}



export function ChartHeader() {
  return (
    <>
      <div className='flex gap-2.5 items-center p-4 border-b border-[#F1F1F1]'>
        <Select>
          <SelectTrigger className="w-[140px] ">
            <SelectValue placeholder="Group By 1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="O-1">Group By 1</SelectItem>
            <SelectItem value="O-2">Group By 2</SelectItem>
            <SelectItem value="O-3">Group By 3</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[100px] ">
            <SelectValue placeholder="CV 1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="O-1">CV 1</SelectItem>
            <SelectItem value="O-2">CV 2</SelectItem>
            <SelectItem value="O-3">CV 3</SelectItem>
          </SelectContent>
        </Select>
        <div className='flex-1'></div>
        <Select>
          <SelectTrigger className="w-[190px]">
            <SelectValue placeholder="Choose metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="O-1">Choose metric</SelectItem>
            <SelectItem value="O-2">Choose metric 2</SelectItem>
            <SelectItem value="O-3">Choose metric 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  )
}




export function ChartFooter() {
  return (
    <div className='py-4 px-5 text-xs font-semibold text-[#515153] border-t border-[#F1F1F1] flex items-center justify-end gap-4'>
      <div className='p-2.5 rounded-full border aspect-square'>
        <Image
          src="/icons/google.svg"
          alt="logo" width={100} height={100}
          className="w-5 object-contain" />
      </div>
      <div className='p-2.5 rounded-full border border-primary flex items-center aspect-square'>
        <Image
          src="/icons/meta.svg"
          alt="logo" width={100} height={100}
          className="w-5 object-contain" />
      </div>
      <div className='p-2.5 rounded-full border aspect-square'>
        <Image
          src="/icons/shopify.svg"
          alt="logo" width={100} height={100}
          className="w-5 object-contain" />
      </div>
    </div>
  )
}
