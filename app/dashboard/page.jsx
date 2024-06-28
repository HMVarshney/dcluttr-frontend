"use client"

import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useState } from 'react'
import SimpleAreaChart from './_components/Home/SimpleAreaChart'
import AreaChart from './_components/Home/AreaChart';
import TestChart from './_components/Home/TestChart';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const data = {
    title: 'Spends',
    series: [
        {
            name: "Spends",
            dataKey: "s",
            id: 1,
            color: '#2EB76F',
            type: 'area'
        },
        {
            name: "Revenue",
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

const data1 = {
    title: 'Spends',
    series: [
        {
            name: "Spends",
            dataKey: "s",
            id: 3,
            color: '#DB3500CC',
            type: 'line'
        },
        {
            name: "Revenue",
            dataKey: "r",
            id: 4,
            color: '#2EB76F',
            type: 'area'
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
    const [titles, setTitles] = useState(['ROAS', 'Revenue', 'Spends'])
    const handleOnDragEnd = (result) => {
        console.log(result);
        if (!result.destination) return;
        const items = titles;
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTitles(items);

    }
    return (
        <ScrollArea className='rounded-md bg-[#FAFAFA] h-full '>

            <TestChart />


            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="imageUrls" direction='horizontal'>
                    {provided => (
                        <div className='m-8 flex gap-8' {...provided.droppableProps} ref={provided.innerRef}>
                            {titles.map((title, i) => (
                                <Draggable key={i} draggableId={`image-${i}`} index={i}>
                                    {provided => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} className=" w-full">
                                            <AreaChart data={data1} details={{ title }} dragHandleProps={provided.dragHandleProps} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>


            <div className='m-8 flex gap-8'>
                <SimpleAreaChart data={data} details={{ title: 'Spends and Revenue Performance', }} />
                <SimpleAreaChart data={data} details={{ title: 'ROAS', }} />
            </div>
            {/*  <div className='h-screen' />
            <div className='h-screen' />
            <div className='h-screen' />*/}
        </ScrollArea>
    )
}
