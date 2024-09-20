"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ChevronDown, Pencil, Plus, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CreateSection, UpdateSection } from "./CreateSection";
import { Button } from "@/components/ui/button";
import { CaretDown } from "phosphor-react";
import ConfirmModal from "@/components/ConfirmModal";
import { dynamicDashboardActions } from "@/lib/context/DynamicDashboard/DynamicDashboardActions";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { useDynamicDashboardContext } from "@/lib/context/DynamicDashboard/DynamicDashboardContext";

export default function BrandList({ sections, activeSectionId, setActiveSectionId }) {
  const [titles, setTitles] = useState([]);
  const { dispatch } = useDynamicDashboardContext();

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = titles;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTitles(items);
  };

  useEffect(() => {
    setTitles(sections.map((s) => ({ id: s.id, title: s.name, icon: s.logo })));
  }, [sections]);

  const handleDeleteSection = async (data) => {
    await axiosInterceptorInstance.delete("/brand/dashboard", {
      data
    });
    dynamicDashboardActions.fetchDashboard(dispatch)(18);
  };

  return (
    <div className="flex justify-start gap-2 py-3 px-6 bg-white border-b">
      <div className="flex items-center justify-start border rounded-xl">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="imageUrls" direction="horizontal">
            {(provided) => (
              <div
                className="w-  flex gap-2 px-1 overflow-x-auto scrollbar-hide"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {titles.map((ele, i) => (
                  <Draggable key={i} draggableId={`image-${i}`} index={i}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className={cn("group flex gap-1 items-center px-4 py-1.5 bg-white rounded-md cursor-grab", {
                          "bg-primary text-white": activeSectionId === ele.id
                        })}
                        onClick={() => setActiveSectionId(ele.id)}
                      >
                        <Image src={ele.icon} alt="Overview" width={100} height={100} className="w-4 object-contain" />
                        <div className="font-medium text-sm whitespace-nowrap">{ele.title}</div>
                        <DropdownMenu className="group">
                          <DropdownMenuTrigger asChild>
                            <CaretDown className="min-w-4 w-4 h-4 group-hover:opacity-100 opacity-0 " />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="mr-20 mt-2">
                            <UpdateSection>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full flex justify-start gap-2 px-3 py-1.5 cursor-pointer border-0"
                              >
                                <Pencil size={16} className="text-black" weight="regular" />
                                <div className="text-sm">Edit</div>
                              </Button>
                            </UpdateSection>

                            <ConfirmModal
                              header={`Delete section`}
                              description={`Are you sure you want to delete ${ele.title}?`}
                              onConfirm={() => handleDeleteSection(ele.id)}
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full flex justify-start gap-2 px-3 py-1.5 cursor-pointer border-0"
                              >
                                <Trash size={16} className="text-destructive" weight="regular" />
                                <div className="text-sm">Delete</div>
                              </Button>
                            </ConfirmModal>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
              <div className="border-0 flex items-center text-sm font-medium cursor-pointer select-none">
                More views
                <ChevronDown className="w-4 h-4 ml-1" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()} side="bottom" sideOffset={6} className="w-48 ml-10 p-1.5">
              {/* <div className="text-sm font-bold p-2.5">More section</div> */}
              {titles?.slice(7, titles.length).map((section, i) => (
                <DropdownMenuItem
                  key={section.title}
                  className="flex gap-2 p-2.5 cursor-pointer"
                  onClick={() => {
                    setActiveSectionId(section.id);
                    const index = titles.findIndex((ele) => ele.title === section.title);
                    const items = titles;
                    const [reorderedItem] = items.splice(index, 1);
                    items.splice(7, 0, reorderedItem);
                    setTitles(items);
                  }}
                >
                  <div className="text-sm">{section.title}</div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <CreateSection>
          <Button variant="icon">
            <Plus className="w-5 h-5" />
          </Button>
        </CreateSection>
      </div>
    </div>
  );
}
