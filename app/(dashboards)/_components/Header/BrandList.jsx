"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, PcCase, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { cn } from "@/lib/utils";

export default function BrandList() {
    const [active, setActive] = useState("Home");
    const [titles, setTitles] = useState(["Home", "Google ads", "Meta ads", "Shopify"]);
    const handleOnDragEnd = (result) => {
        console.log(result);
        if (!result.destination) return;
        const items = titles;
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTitles(items);
    };
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
                                        className={cn(
                                            "flex gap-1 items-center px-4 py-1.5 bg-white rounded-md cursor-grab",
                                            {
                                                "bg-primary text-white": active === title
                                            }
                                        )}
                                        onClick={() => setActive(title)}
                                    >
                                        <PcCase className="w-4 h-4 mr-1" />
                                        <div className="font-medium text-sm">{title}</div>
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
