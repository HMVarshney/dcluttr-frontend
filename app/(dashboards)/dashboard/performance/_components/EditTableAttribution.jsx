"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { DotsSixVertical } from "phosphor-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EditTableAttribution({
  children,
  columns,
  columnVisibility,
  columnOrder,
  setColumnVisibility,
  setColumnOrdering
}) {
  const [isOpen, setOpen] = useState(false);
  const [titles, setTitles] = useState([]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...columnOrder];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log("dragend items", items);
    setColumnOrdering(items);
  };

  useEffect(() => {
    const columnOrdering = columnOrder.reduce((prev, col) => {
      const rawCol = columns.find((c) => c.key === col);
      if (rawCol) {
        prev.push({
          id: rawCol.key,
          title: rawCol.shortTitle
        });
      }
      return prev;
    }, []);
    setTitles(columnOrdering);
  }, [columnOrder, columns]);

  return (
    <Popover open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
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
                {titles.map((t, i) => (
                  <Draggable key={i} draggableId={`image-${i}`} index={i}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`border-b py-3.5 px-6 w-full flex items-center ${
                          snapshot.isDragging ? "bg-blue-100 shadow-lg z-50" : ""
                        }`}
                        style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                      >
                        <DotsSixVertical size={16} color="#031B15" className="mr-4" />
                        <div className="text-base font-semibold"> {t.title}</div>
                        <input
                          type="checkbox"
                          className={cn("min-w-4 h-4 accent-primary hover:accent-primary/80 rounded ml-auto", " cursor-pointer")}
                          checked={!!columnVisibility[t.id]}
                          onChange={(event) => {
                            setColumnVisibility(t.id, event.target.checked);
                          }}
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
            <Button onClick={() => setOpen(false)}>Done</Button>
          </div>
        </DragDropContext>
      </PopoverContent>
    </Popover>
  );
}
