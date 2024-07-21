"use client"

import React, { useEffect, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getAdsTypeGoogle } from '@/lib/store/features/googleAdsSlice';


const COLORS = ['#74EED8', '#78C77B', '#DF6EFB', '#FFCF54'];

const CampaignWiseDonutChart = () => {
  const { loading, error, data: allData } = useSelector((state) => state.googleAds.adsType);

  const data = useMemo(() => {
    return allData?.results?.[0]?.data?.map((item) => {
      return {
        name: item.google_campaign_type_campaign_type,
        value: parseInt(item.google_campaign_type_clicks_sum)
      }
    })
  }, [allData])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdsTypeGoogle())
  }, [])
  return (
    <div className='w-full'>
      <div className='text-xl font-bold mb-4'>
        Channel overlap
      </div>
      <div className='shadow rounded-lg bg-white w-full h-[calc(100%-44px)] overflow-hidden group flex flex-col justify-between items-stretch'>
        <div className='flex gap-2.5 items-center p-4 border-b border-[#F1F1F1]'>
          <div className='text-base font-bold'>
            Attribution model: Linear
          </div>
          <div className='flex-1'></div>
          <Select>
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
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={282}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            {/* <Legend /> */}
          </PieChart>
        </ResponsiveContainer>
        <div className='py-4 px-5 text-xs font-semibold border-t border-[#F1F1F1] flex items-center gap-4'>
          <div className='py-2.5 px-4 rounded-full border flex items-center gap-2 bg-white'>
            <Image
              src="/icons/google.svg"
              alt="logo" width={100} height={100}
              className="w-5 object-contain" />
            <div className='text-sm font-semibold'>
              Google Ads
            </div>
          </div>
          <div className='py-2.5 px-4 rounded-full border flex items-center gap-2 bg-white'>
            <Image
              src="/icons/meta.svg"
              alt="logo" width={100} height={100}
              className="w-5 object-contain" />
            <div className='text-sm font-semibold'>
              Meta Ads
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignWiseDonutChart;
