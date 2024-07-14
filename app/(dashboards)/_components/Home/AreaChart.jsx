"use client"

import React, { Fragment } from 'react';
import { AreaChart as Charts, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomActiveDot from './CustomActiveDot';
import moment from 'moment';
import { Skeleton } from '@/components/ui/skeleton';
import ChartHeader from './ChartHeader';
import ChartFooter from './ChartFooter';
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  console.log(...args);
};

export default function AreaChart({ isLoading = false, data, details, dragHandleProps = {} }) {
  return (
    <div className='shadow rounded-lg bg-white w-full overflow-hidden group'>
      <ChartHeader details={details} dragHandleProps={dragHandleProps} />
      {isLoading
        ? <Skeleton className="w-[calc(100%-32px)] h-[128px] my-4 rounded-md mx-auto" />
        : <ResponsiveContainer width="100%" height={160}>
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
                ? (ele) => moment(ele["orders.created_at"]).format('D MMM YY')
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
        </ResponsiveContainer>}
      <ChartFooter data={data} />
    </div>
  );
}



