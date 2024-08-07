"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateSectionButton from "./CreateSectionButton";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Image from "next/image";
import { HouseLine, ProjectorScreenChart } from "phosphor-react";

export default function BrandList() {
  const [active, setActive] = useState({
    title: "Home",
    icons: <HouseLine className="w-4 h-4 mr-1" />
  });
  const [titles, setTitles] = useState([
    {
      title: "Home",
      icons: <HouseLine className="w-4 h-4 mr-1" />
    },
    {
      title: "Google ads",
      icons: (
        <Image src="/band-logo/google.png" alt="Overview" width={100} height={100} className="w-4 object-contain" />
      )
    },
    {
      title: "Meta ads",
      icons: <Image src="/band-logo/meta.png" alt="Overview" width={100} height={100} className="w-4 object-contain" />
    },
    {
      title: "Shopify",
      icons: (
        <Image src="/band-logo/shopify.png" alt="Overview" width={100} height={100} className="w-4 object-contain" />
      )
    }
  ]);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = titles;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTitles(items);
  };
  return (
    <div className="flex items-center justify-start gap-2 py-3 px-6 bg-white border-b">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="imageUrls" direction="horizontal">
          {(provided) => (
            <div
              className="w- border rounded-xl flex gap-2 p-[3px] overflow-x-auto scrollbar-hide"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {titles?.slice(0, 7).map((ele, i) => (
                <Draggable key={i} draggableId={`image-${i}`} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className={cn("flex gap-1 items-center px-4 py-1.5 bg-white rounded-md cursor-grab", {
                        "bg-primary text-white": active.title === ele.title
                      })}
                      onClick={() => setActive(ele)}
                    >
                      {ele.icons}
                      <div className="font-medium text-sm">{ele.title}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {titles.length > 7 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">More</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            side="bottom"
            sideOffset={6}
            className="w-48 ml-10 p-1.5"
          >
            <div className="text-sm font-bold p-2.5">More section</div>
            {titles?.slice(7, titles.length).map((section, i) => (
              <DropdownMenuItem
                key={section.title}
                className="flex gap-2 p-2.5 cursor-pointer"
                onClick={() => {
                  setActive(section);
                  const index = titles.findIndex((ele) => ele.title === section.title);
                  const items = titles;
                  const [reorderedItem] = items.splice(index, 1);
                  items.splice(4, 0, reorderedItem);
                  setTitles(items);
                }}
              >
                <div className="text-sm">{section.title}</div>
                {/* <ChevronRight className="w-4 h-4 ml-auto" /> */}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <CreateSectionButton
        onSave={(e) => {
          setTitles([
            ...titles,
            {
              title: e.name,
              icons: <ProjectorScreenChart className="w-4 h-4 mr-1" />
            }
          ]);
        }}
      >
        <Button variant="icon">
          <Plus className="w-5 h-5" />
        </Button>
      </CreateSectionButton>
    </div>
  );
}
