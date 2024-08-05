"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "../_components/Header";
import ExportFileFormat from "@/components/ExportFileFormat";
import Type3Chart from "../_components/Home/Type3Chart";
import Type2Chart from "../_components/Home/Type2Chart";
import Type1Chart from "../_components/Home/Type1Chart";
import EditChartsOrder from "../_components/EditChartsOrder";
import MainChart from "../_components/Home/MainChart";

const data = {
    title: "Spends",
    series: [
        {
            name: "Spends",
            dataKey: "s",
            id: 1,
            color: "#9A66ED",
            type: "area"
        },
        {
            name: "Revenue",
            dataKey: "r",
            id: 2,
            color: "#2EB76F",
            type: "area"
        }
    ],
    data: [
        {
            name: "A",
            s: 8,
            r: 1,
            amt: 24
        },
        {
            name: "B",
            s: 5,
            r: 10,
            amt: 22
        },
        {
            name: "C",
            s: 12,
            r: 10,
            amt: 22
        },
        {
            name: "D",
            s: 10,
            r: 17,
            amt: 20
        },
        {
            name: "E",
            s: 14,
            r: 25,
            amt: 21
        },
        {
            name: "F",
            s: 10,
            r: 19,
            amt: 25
        },
        {
            name: "G",
            s: 20,
            r: 25,
            amt: 21
        }
    ]
};

const data1 = {
    title: "Spends",
    series: [
        {
            name: "Spends",
            dataKey: "s",
            id: 3,
            color: "#9A66ED",
            type: "line"
        },
        {
            name: "Revenue",
            dataKey: "r",
            id: 4,
            color: "#2EB76F",
            type: "area"
        }
    ],
    data: [
        {
            name: "A",
            s: 8,
            r: 0,
            amt: 24
        },
        {
            name: "B",
            s: 5,
            r: 10,
            amt: 22
        },
        {
            name: "C",
            s: 12,
            r: 10,
            amt: 22
        },
        {
            name: "D",
            s: 10,
            r: 17,
            amt: 20
        },
        {
            name: "E",
            s: 14,
            r: 25,
            amt: 21
        },
        {
            name: "F",
            s: 10,
            r: 19,
            amt: 25
        },
        {
            name: "G",
            s: 20,
            r: 25,
            amt: 21
        }
    ]
};

export default function Page() {
    const [cardList, setCardList] = useState([
        {
            title: "Card 1",
            id: 1,
            type: "Type3Chart",
            data: data,
            select: true
        },
        {
            title: "Card 2",
            id: 2,
            type: "Type2Chart",
            data: data1,
            select: true
        },
        {
            title: "Card 3",
            id: 3,
            type: "Type1Chart",
            data: data,
            select: true
        },
        {
            title: "Card 4",
            id: 4,
            type: "Type1Chart",
            data: data1,
            select: true
        },
        {
            title: "Card 5",
            id: 5,
            type: "Type2Chart",
            data: data,
            select: true
        },
        {
            title: "Card 6",
            id: 6,
            type: "Type1Chart",
            data: data1,
            select: true
        },
        {
            title: "Card 7",
            id: 7,
            type: "Type1Chart",
            data: data,
            select: true
        },
        {
            title: "Card 8",
            id: 8,
            type: "Type2Chart",
            data: data1,
            select: true
        }
    ]);
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = [...cardList];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setCardList(items);
    };
    return (
        <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
            <Header />
            <div className="flex items-center justify-between gap-2 my-3 mx-6">
                <div className="">
                    <div className="font-bold text-xl">Home</div>
                    <div className="text-[#4F4D55] text-sm">Metrics from all your marketing channels</div>
                </div>
                <div className="flex gap-2">
                    <EditChartsOrder cardList={cardList} setCardList={setCardList} />
                    <ExportFileFormat />
                </div>
            </div>
            <MainChart data={{ ...data, data: [...data.data, ...data.data, ...data.data] }} />

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="imageUrls" direction="horizontal">
                    {(provided) => (
                        <div
                            className="m-6 grid grid-cols-6 gap-3"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {cardList
                                ?.filter((f) => f.select)
                                .map((card, i) => (
                                    <Draggable key={i} draggableId={`image-${i}`} index={i}>
                                        {(provided) => {
                                            let length = cardList?.filter((f) => f.select).length;
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={
                                                        (i + 2 === length && (i + 1) % 3 === 1) ||
                                                        (i + 1 === length && (i + 1) % 3 !== 0)
                                                            ? "col-span-3"
                                                            : "col-span-2"
                                                    }
                                                >
                                                    {card.type === "Type3Chart" ? (
                                                        <Type3Chart
                                                            data={card.data}
                                                            details={{ title: card.title }}
                                                            dragHandleProps={provided.dragHandleProps}
                                                        />
                                                    ) : card.type === "Type2Chart" ? (
                                                        <Type2Chart
                                                            data={card.data}
                                                            details={{ title: card.title }}
                                                            dragHandleProps={provided.dragHandleProps}
                                                        />
                                                    ) : (
                                                        <Type1Chart
                                                            data={card.data}
                                                            details={{ title: card.title }}
                                                            dragHandleProps={provided.dragHandleProps}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        }}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/* <div className="m-8 flex gap-8">
                <Type2Chart data={data} details={{ title: "Spends and Revenue Performance" }} />
                <Type2Chart data={data} details={{ title: "ROAS" }} />
            </div>

            <div className="m-8 flex gap-8">
                <Type1Chart data={data} details={{ title: "Spends and Revenue Performance" }} />
                <CustomBarChart data={data} details={{ title: "ROAS" }} />
            </div>
            <div className="h-screen" />
            <div className="h-screen" />
            <div className="h-screen" /> */}
        </ScrollArea>
    );
}
