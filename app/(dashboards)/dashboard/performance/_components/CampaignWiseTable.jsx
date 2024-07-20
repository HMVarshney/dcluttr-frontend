import React from 'react';
import Image from 'next/image';
import { MoreHorizontal, MoveRight } from 'lucide-react';

export default function CampaignWiseTable({ usersList }) {
  const slMarketOrderTypeEnum = {
    MKT: "Market",
    LMT: "Limit",
    SL: "SL",
    SLM: "SLM",
    "": ""
  };

  const columnNames = [
    { name: 'Time', minWidth: '200px', sticky: false },
    { name: 'Type', minWidth: '92px', sticky: false },
    { name: 'Instrument', minWidth: '250px', sticky: false },
    { name: 'Product', minWidth: '200px', sticky: false },
    { name: 'Quantity', minWidth: '120px', sticky: false },
    { name: 'LTP', minWidth: '120px', sticky: false },
    { name: 'Price', minWidth: '100px', sticky: false },
    { name: 'Order Type', minWidth: '100px', sticky: false },
    { name: 'Trgr. Price', minWidth: '120px', sticky: false },
    { name: 'Market protection', minWidth: '200px', sticky: false },
    { name: 'Status', minWidth: '120px', sticky: true },
  ];

  return (
    <section className='w-[1000px] bg-[#FFF]'>
      <div className='overflow-x-auto'>
        <div className='min-w-max flex flex-col items-start whitespace-nowrap'>
          <div className='flex w-full flex-row justify-between bg-[#EDEDED] items-center self-stretch border-b-[0.5px] border-[#EDEDED]'>
            {columnNames.map((column, i) => (
              <div key={i} className={`flex justify-center self-stretch items-center gap-2.5 flex-[1_0_0] py-[12px] text-sm font-medium leading-1 text-[#747474] ${column?.sticky ? 'sticky right-0 bg-[#F5F5F5] ' : ''} `} style={{ minWidth: column.minWidth }}>
                {column.name}
                {column.sticky && <div className='flex w-6 h-6 justify-center items-center shrink-0 rounded border-[#9D9D9D] hover:bg-slate-100 cursor-pointer bg-[#FFF] p-[4.5px] border-[0.6px] border-solid'>
                  <MoveRight />
                </div>}
              </div>
            ))}
          </div>
          <div className='flex flex-col items-start gap-px bg-[#DFDFDF]'>
            {usersList?.map((ele, i) => (
              <div key={i} className='flex w-full justify-between items-start bg-[#FFF]'>
                <div className='flex flex-col justify-center py-[13px] px-[16px] items-center' style={{ minWidth: columnNames[0].minWidth }}>
                  <p className='text-[#414141] text-sm font-medium leading-6'>
                    {ele?.order_date_time}
                  </p>
                </div>
                <div className='flex flex-col justify-center py-[13px] px-[16px] items-center self-stretch' style={{ minWidth: columnNames[1].minWidth }}>
                  <p style={{ borderColor: ele?.txn_type === 'B' ? '#26A649' : '#EB4E2C', color: ele?.txn_type === 'B' ? '#26A649' : '#EB4E2C' }} className='flex justify-center items-center gap-2.5 rounded border px-2 py-0 border-solid text-[10px] font-bold leading-4'>
                    {ele?.txn_type === 'B' ? 'Buy' : 'Sell'}
                  </p>
                </div>
                <div className='flex flex-row justify-center py-[13px] px-[16px] items-center self-stretch' style={{ minWidth: columnNames[2].minWidth }}>
                  <span className='text-[#202020] text-sm font-semibold leading-6'>{ele?.display_name} <span className='text-[#414141] font-normal'>|</span> <span className='text-[#606060] text-[10px] font-normal leading-4'>{ele?.exchange}</span> </span>
                </div>
                <div className='flex flex-row justify-center py-[13px] px-[16px] items-center self-stretch' style={{ minWidth: columnNames[3].minWidth }}>
                  <span className='text-[#414141] text-sm font-medium leading-6'>'sss'</span>
                </div>
                <div className='flex flex-col justify-center py-[13px] px-[16px] items-center self-stretch' style={{ minWidth: columnNames[4].minWidth }}>
                  <p className='text-[#414141] text-sm font-medium leading-6'>{ele?.rem_qty_tot_qty}</p>
                </div>
                <div className='flex flex-col justify-center py-[13px] px-[16px] items-center self-stretch' style={{ minWidth: columnNames[5].minWidth }}>
                  <p className='text-[#414141] text-sm font-medium leading-6'>{ele?.ref_ltp}</p>
                </div>
                <div className='flex flex-col justify-center py-[13px] px-[16px] items-center self-stretch' style={{ minWidth: columnNames[6].minWidth }}>
                  <p className='text-[#414141] text-sm font-medium leading-6'>{ele?.price}</p>
                </div>
                <div className='flex flex-col justify-center py-[13px] px-[16px] items-center self-stretch' style={{ minWidth: columnNames[7].minWidth }}>
                  <p className='text-[#414141] text-sm font-medium leading-6'>{slMarketOrderTypeEnum[ele?.order_type]}</p>
                </div>
                <div className='flex flex-col justify-center py-[13px] px-[16px] items-center self-stretch' style={{ minWidth: columnNames[8].minWidth }}>
                  <p className='text-[#414141] text-sm font-medium leading-6'>{ele?.trigger_price}</p>
                </div>
                <div className='flex flex-col justify-center py-[13px] px-[16px] items-center self-stretch' style={{ minWidth: columnNames[9].minWidth }}>
                  <p className='text-[#414141] text-sm font-medium leading-6'>{ele?.mkt_pro_flag !== 'N' ? ele?.mkt_pro_value : 'NA'}</p>
                </div>
                <div className=' sticky right-0 flex justify-center items-center self-stretch bg-[#FCFCFC]' style={{ minWidth: columnNames[10].minWidth }}>
                  <p className='flex h-5 justify-center items-center gap-2.5 rounded border-[#0862BC] bg-[#ECF6FE] px-2 py-0 border-0 border-solid text-[#0862BC] text-center text-[10px] font-bold leading-4'></p>
                  <div className='flex items-center gap-2.5 bg-[#FCFCFC] pl-6 py-5' >
                    <div className='flex w-6 h-6 justify-center items-center shrink-0 rounded border-[#9D9D9D] hover:bg-slate-100 cursor-pointer bg-[#FFF] p-[4.5px] border-[0.6px] border-solid'>
                      <MoreHorizontal />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
