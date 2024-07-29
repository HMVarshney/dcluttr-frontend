"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef, useState } from "react";
import SimpleAreaChart from "../_components/Home/SimpleAreaChart";
import AreaChart from "../_components/Home/AreaChart";
// import TestChart from '../_components/Home/TestChart';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "../_components/Header";
import { Forward, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExportFileFormat from "@/components/ExportFileFormat";
import CustomBarChart from "../_components/Home/CustomBarChart";
import "gridstack/dist/gridstack.min.css";
import { GridStack } from "gridstack";

const data = {
  title: "Spends",
  series: [
    {
      name: "Spends",
      dataKey: "s",
      id: 1,
      color: "#2EB76F",
      type: "area",
    },
    {
      name: "Revenue",
      dataKey: "r",
      id: 2,
      color: "#9A66ED",
      type: "area",
    },
  ],
  data: [
    {
      name: "A",
      s: 8,
      r: 1,
      amt: 24,
    },
    {
      name: "B",
      s: 5,
      r: 10,
      amt: 22,
    },
    {
      name: "C",
      s: 12,
      r: 10,
      amt: 22,
    },
    {
      name: "D",
      s: 10,
      r: 17,
      amt: 20,
    },
    {
      name: "E",
      s: 14,
      r: 25,
      amt: 21,
    },
    {
      name: "F",
      s: 10,
      r: 19,
      amt: 25,
    },
    {
      name: "G",
      s: 20,
      r: 25,
      amt: 21,
    },
  ],
};

const data1 = {
  title: "Spends",
  series: [
    {
      name: "Spends",
      dataKey: "s",
      id: 3,
      color: "#DB3500CC",
      type: "line",
    },
    {
      name: "Revenue",
      dataKey: "r",
      id: 4,
      color: "#2EB76F",
      type: "area",
    },
  ],
  data: [
    {
      name: "A",
      s: 8,
      r: 0,
      amt: 24,
    },
    {
      name: "B",
      s: 5,
      r: 10,
      amt: 22,
    },
    {
      name: "C",
      s: 12,
      r: 10,
      amt: 22,
    },
    {
      name: "D",
      s: 10,
      r: 17,
      amt: 20,
    },
    {
      name: "E",
      s: 14,
      r: 25,
      amt: 21,
    },
    {
      name: "F",
      s: 10,
      r: 19,
      amt: 25,
    },
    {
      name: "G",
      s: 20,
      r: 25,
      amt: 21,
    },
  ],
};

export default function Page() {
  const [titles, setTitles] = useState(["ROAS", "Revenue", "Spends"]);
  const handleOnDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const items = titles;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTitles(items);
  };

  useEffect(() => {
    const grid = GridStack.init();
    const data = [
      {
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        content: <div>Hey</div>,
      },
    ];
    grid.load(data);
    // grid.addWidget({ id: "1", x: 0, y: 0, w: 1, h: 1, content: "<div>Hey</div>", noResize: true });
    grid.on("dragstop", (event, ele) => {
      console.log("event", event);
      console.log("ele", ele.gridstackNode);
    });
  }, []);

  return (
    <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
      <Header />
      <div className="flex items-center justify-between gap-2 my-3 mx-6">
        <div className="">
          <div className="font-bold text-xl">Store</div>
          <div className="text-[#4F4D55] text-sm">Find all the analytics for store</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className=" text-[#031B15]">
            <Pencil className="w-4 h-4 mr-2" />
            <div className="font-medium text-sm">Edit</div>
          </Button>
          <ExportFileFormat />
        </div>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="imageUrls" direction="horizontal">
          {(provided) => (
            <div className="m-6 flex gap-3" {...provided.droppableProps} ref={provided.innerRef}>
              {titles.map((title, i) => (
                <Draggable key={i} draggableId={`image-${i}`} index={i}>
                  {(provided) => (
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

      {/* <TestChart /> */}

      <div className="m-8 flex gap-8">
        <SimpleAreaChart data={data} details={{ title: "Spends and Revenue Performance" }} />
        <SimpleAreaChart data={data} details={{ title: "ROAS" }} />
      </div>

      <div className="m-8 flex gap-8">
        <AreaChart data={data} details={{ title: "Spends and Revenue Performance" }} />
        <CustomBarChart data={data} details={{ title: "ROAS" }} />
      </div>
      {/*  <div className='h-screen' />
            <div className='h-screen' />
            <div className='h-screen' />*/}
      <div className="grid-stack"></div>
    </ScrollArea>
  );
}
