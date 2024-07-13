

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { Gear } from 'phosphor-react'
import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AreaChart from '../../_components/Home/AreaChart'

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
export default function BrandDetails() {
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
        <>
            <div className='flex items-center justify-center gap-2 p-6 '>
                <div className='mr-auto'>
                    <div className=' text-xl font-bold'>
                        All Brands
                    </div>
                    <div className='text-[#4F4D55] text-xs'>
                        Find all the brand for store
                    </div>
                </div>
                <Button variant="default" >
                    <Plus className='w-4 h-4 mr-2' />
                    <div className='font-medium text-sm'>
                        Add a new store
                    </div>
                </Button>
            </div>

            <div className='flex flex-col items-stretch justify-center gap-6  px-6 '>
                <div className='bg-white shadow rounded-lg'>
                    <div className='flex items-center justify-center gap-2 py-6 px-4'>
                        <Image
                            src="/temp/mama_earth_logo.png"
                            width={400}
                            height={400}
                            className='rounded-lg border w-36 h-20 object-contain'
                        />
                        <div className='mr-auto ml-4'>
                            <div className=' text-base font-semibold'>
                                Mama earth
                            </div>
                            <div className='text-[#919191] text-sm underline'>
                                www.mamaearth.com
                            </div>
                        </div>
                        <Button variant="outline" >
                            Go to dashboard
                        </Button>
                        <Button variant="icon" >
                            <Gear size={24} />
                        </Button>
                    </div>

                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="imageUrls" direction='horizontal'>
                            {provided => (
                                <div className='flex gap-3' {...provided.droppableProps} ref={provided.innerRef}>
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
                </div>
            </div>
        </>
    )
}
