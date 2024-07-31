"use client"


import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { X } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DotsSixVertical, PushPinSimple } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const defaultColumns = [
    {
        header: "Campaign Type",
        accessorKey: "campaign_type",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Purchase Value Sum",
        accessorKey: "purchase_value_sum",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Ad Spend Sum",
        accessorKey: "ad_spend_sum",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Purchase Sum",
        accessorKey: "purchase_sum",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Impressions Sum",
        accessorKey: "impressions_sum",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Clicks Sum",
        accessorKey: "clicks_sum",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Vtc Sum",
        accessorKey: "vtc_sum",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Ctr",
        accessorKey: "ctr",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Cpc",
        accessorKey: "cpc",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Cpm",
        accessorKey: "cpm",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Roas",
        accessorKey: "roas",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Aov",
        accessorKey: "aov",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    },
    {
        header: "Cpa",
        accessorKey: "cpa",
        cell: (info) => <div className="min-w-32">{info.getValue()}</div>
    }
];

export default function EditTableAttribution({ children, columns }) {
    const [isOpen, setOpen] = useState(false)
    const [titles, setTitles] = useState((columns ?? defaultColumns)?.map(i => i.header))
    const handleOnDragEnd = (result) => {
        console.log(result);
        if (!result.destination) return;
        const items = titles;
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTitles(items);
    }
    return (
        <Popover open={isOpen} onOpenChange={e => setOpen(e)}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-[340px] max-h-[600px] -mt-40 mr-10 p-0 overflow-y-auto" align="end">
                <div className='w-full flex items-center justify-between gap-2 p-6 border-b sticky top-0 bg-white'>
                    <div className=' text-base font-bold'>
                        Edit: Dcluttr Preset
                    </div>
                    <X className='w-5 h-5' onClick={() => setOpen(false)} />
                </div>
                <div className='py-3 px-6 text-sm font-medium text-[#031B1599]'>
                    INCLUDED ITEMS
                </div>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="imageUrls" direction='vertical'>
                        {provided => (
                            <div className='flex flex-col' {...provided.droppableProps} ref={provided.innerRef}>
                                {titles.map((title, i) => (
                                    <Draggable key={i} draggableId={`image-${i}`} index={i}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`border-b py-3.5 px-6 w-full flex items-center ${snapshot.isDragging ? "bg-blue-100 shadow-lg z-50" : ""}`}
                                                style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                                            >
                                                <DotsSixVertical size={16} color="#031B15" className='mr-4' />
                                                <div className="text-base font-semibold"> {title}</div>
                                                <input
                                                    type="checkbox"
                                                    className={cn("min-w-4 h-4 accent-primary hover:accent-primary/80 rounded ml-auto", ' cursor-pointer')}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                <div className='w-[340px] bg-[#dbdbdb8c]'>
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                    <div className='w-full flex items-center justify-end gap-2.5 p-4 border-t sticky bottom-0 bg-white'>
                        <Button variant="outline" >
                            Cancel
                        </Button>
                        <Button variant="" >
                            Save
                        </Button>
                    </div>
                </DragDropContext>
            </PopoverContent>
        </Popover>
    )
}
