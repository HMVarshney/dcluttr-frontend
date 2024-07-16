


import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import Header from './_components/Header';
import AllPerformanceChart from './_components/AllPerformanceChart';
import VennChart from './_components/VennChart';

const data = {
    title: 'Spends',
    series: [
        {
            name: "Spends",
            dataKey: "r",
            id: 2,
            color: '#9A66ED',
            type: 'area'
        },
    ],
    data: [
        {
            name: 'A',
            s: 8,
            r: 1,
            amt: 24,
        },
        {
            name: 'B',
            s: 5,
            r: 10,
            amt: 22,
        },
        {
            name: 'C',
            s: 12,
            r: 10,
            amt: 22,
        },
        {
            name: 'D',
            s: 10,
            r: 17,
            amt: 20,
        },
        {
            name: 'E',
            s: 14,
            r: 25,
            amt: 21,
        },
        {
            name: 'F',
            s: 10,
            r: 19,
            amt: 25,
        },
        {
            name: 'G',
            s: 20,
            r: 25,
            amt: 21,
        },
    ]
};
export default function page() {
    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full border'>
            <Header />
            <div className='m-6'>
                <AllPerformanceChart data={data} details={{ title: '' }} />
            </div>
            <div className='m-6'>
                <VennChart />
            </div>
        </ScrollArea>
    )
}
