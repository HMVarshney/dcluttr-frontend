"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, PcCase, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function BrandList() {
    const [titles, setTitles] = useState(["Home", "Google ads", "Meta ads", "Shopify"]);
    const handleOnDragEnd = (result) => {
        console.log(result);
        if (!result.destination) return;
        const items = titles;
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTitles(items);
    };
    {
        /* <Button variant={'default'} size="xs">
                    <Home className='w-4 h-4 mr-1' />
                    <div className='font-medium text-sm'>
                        Home
                    </div>
                </Button> */
    }
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="imageUrls" direction="horizontal">
                {(provided) => (
                    <div
                        className="w-full border rounded-xl flex gap-2 p-[3px] overflow-x-auto scrollbar-hide"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {titles.map((title, i) => (
                            <Draggable key={i} draggableId={`image-${i}`} index={i}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                    >
                                        <Button variant={"ghost"} size="xs" className={"text-[#031B15B2]"}>
                                            {/* <PcCase className='w-4 h-4 mr-1' /> */}
                                            <div className="font-medium text-sm">Dcluttr Pixel</div>
                                        </Button>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
