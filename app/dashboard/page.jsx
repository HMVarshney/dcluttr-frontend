

import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import SimpleAreaChart from './_components/Home/SimpleAreaChart'


const data = {
    title: 'Spends',
    series: [
        {
            name: "Spends",
            dataKey: "s",
            id: 1,
            color: '#2EB76F'
        },
        {
            name: "Revenue",
            dataKey: "r",
            id: 2,
            color: '#9A66ED'
        },
    ],
    data: [
        {
            name: 'A',
            s: 8,
            r: 0,
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
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full '>
            <div className='m-8 flex gap-8'>
                <SimpleAreaChart data={data} details={{ id: 1, title: 'Spends', color: '#2EB76F' }} />
                <SimpleAreaChart data={data} details={{ id: 2, title: 'ROAS', color: '#9A66ED' }} />
            </div>
            <div className='m-8 flex gap-8'>
                <SimpleAreaChart data={data} details={{ id: 3, title: 'Spends and Revenue Performance', color: '#2EB76F' }} />
                <SimpleAreaChart data={data} details={{ id: 4, title: 'ROAS', color: '#9A66ED' }} />
            </div>
            <div className='h-screen' />
            <div className='h-screen' />
            <div className='h-screen' />
        </ScrollArea>
    )
}
