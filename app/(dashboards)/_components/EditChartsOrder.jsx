"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Pencil } from "lucide-react";
import { X } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DotsSixVertical, PushPinSimple } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EditChartsOrder({ cardList = [], setCardList = () => {} }) {
    const [isOpen, setOpen] = useState(false);
    const [titles, setTitles] = useState(cardList);
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = titles;
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTitles(items);
    };
    return (
        <Popover
            open={isOpen}
            onOpenChange={(e) => {
                setOpen(e);
                if (e) {
                    setTitles(cardList?.sort((a, b) => (b?.select === true) - (a?.select === true)));
                }
            }}
        >
            <PopoverTrigger asChild>
                <Button variant="outline" className=" text-[#031B15]">
                    <Pencil className="w-4 h-4 mr-2" />
                    <div className="font-medium text-sm">Edit</div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[340px] max-h-[600px] -mt-40 mr-10 p-0 overflow-y-auto" align="end">
                <div className="w-full flex items-center justify-between gap-2 p-6 border-b sticky top-0 bg-white">
                    <div className=" text-base font-bold">Edit: Dcluttr Preset</div>
                    <X className="w-5 h-5" onClick={() => setOpen(false)} />
                </div>
                <div className="py-3 px-6 text-sm font-medium text-[#031B1599]">INCLUDED ITEMS</div>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="imageUrls" direction="vertical">
                        {(provided) => (
                            <div className="flex flex-col" {...provided.droppableProps} ref={provided.innerRef}>
                                {titles.map((title, i) => (
                                    <Draggable key={i} draggableId={`image-${i}`} index={i}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`border-b py-3.5 px-6 w-full flex items-center ${
                                                    snapshot.isDragging ? "bg-blue-100 shadow-lg z-50" : ""
                                                }`}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    opacity: snapshot.isDragging ? 0.8 : 1
                                                }}
                                            >
                                                <DotsSixVertical size={16} color="#031B15" className="mr-4" />
                                                <div className="text-base font-semibold"> {title.title}</div>
                                                <input
                                                    checked={title.select}
                                                    onChange={() => {
                                                        setTitles(
                                                            titles.map((item) => {
                                                                if (item.title === title.title) {
                                                                    return {
                                                                        ...item,
                                                                        select: !item.select
                                                                    };
                                                                }
                                                                return item;
                                                            })
                                                        );
                                                    }}
                                                    type="checkbox"
                                                    className={cn(
                                                        "min-w-4 h-4 accent-primary hover:accent-primary/80 rounded ml-auto",
                                                        " cursor-pointer"
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                <div className="w-[340px] bg-[#dbdbdb8c]">{provided.placeholder}</div>
                            </div>
                        )}
                    </Droppable>
                    <div className="w-full flex items-center justify-end gap-2.5 p-4 border-t sticky bottom-0 bg-white">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant=""
                            onClick={() => {
                                setOpen(false);
                                setCardList(titles);
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </DragDropContext>
            </PopoverContent>
        </Popover>
    );
}
