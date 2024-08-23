"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { forwardRef, useCallback, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Header from "../_components/Header";
import ExportFileFormat from "@/components/ExportFileFormat";
import Type3Chart from "../_components/Home/Type3Chart";
import Type2Chart from "../_components/Home/Type2Chart";
import Type1Chart from "../_components/Home/Type1Chart";
import EditChartsOrder from "../_components/EditChartsOrder";
import MainChart from "../_components/Home/MainChart";
import { DndContext, closestCenter, MouseSensor, TouchSensor, DragOverlay, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
      amt: 24,
      x: "jan"
    },
    {
      name: "B",
      s: 5,
      r: 10,
      amt: 22,
      x: "feb"
    },
    {
      name: "C",
      s: 12,
      r: 10,
      amt: 22,
      x: "mar"
    },
    {
      name: "D",
      s: 10,
      r: 17,
      amt: 20,
      x: "apr"
    },
    {
      name: "E",
      s: 14,
      r: 25,
      amt: 21,
      x: "may"
    },
    {
      name: "F",
      s: 10,
      r: 19,
      amt: 25,
      x: "jun"
    },
    {
      name: "G",
      s: 20,
      r: 25,
      amt: 21,
      x: "jul"
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
      r: 1,
      amt: 24,
      x: "jan"
    },
    {
      name: "B",
      s: 5,
      r: 10,
      amt: 22,
      x: "feb"
    },
    {
      name: "C",
      s: 12,
      r: 10,
      amt: 22,
      x: "mar"
    },
    {
      name: "D",
      s: 10,
      r: 17,
      amt: 20,
      x: "apr"
    },
    {
      name: "E",
      s: 14,
      r: 25,
      amt: 21,
      x: "may"
    },
    {
      name: "F",
      s: 10,
      r: 19,
      amt: 25,
      x: "jun"
    },
    {
      name: "G",
      s: 20,
      r: 25,
      amt: 21,
      x: "jul"
    }
  ]
};

export default function Page() {
  const [cardList, setCardList] = useState([
    {
      title: "Meta Ads Sales",
      icon: "/band-logo/meta.png",
      id: 1,
      type: "Type1Chart",
      data: data,
      select: true
    },
    {
      title: "Google Ads Sales",
      icon: "/band-logo/google.png",
      id: 2,
      type: "Type2Chart",
      data: data1,
      select: true
    },
    {
      title: "Shopify Ads Sales",
      icon: "/band-logo/shopify.png",
      id: 3,
      type: "Type1Chart",
      data: data,
      select: true
    },
    {
      title: "Flipkart Sales",
      icon: "/band-logo/shopify.png",
      id: 4,
      type: "Type1Chart",
      data: data1,
      select: true
    },
    {
      title: "Meta Ads Sales",
      icon: "/band-logo/meta.png",
      id: 5,
      type: "Type2Chart",
      data: data,
      select: true
    },
    {
      title: "Google Ads Sales",
      icon: "/band-logo/google.png",
      id: 6,
      type: "Type1Chart",
      data: data1,
      select: true
    },
    {
      title: "Meta Ads Sales",
      icon: "/band-logo/meta.png",
      id: 7,
      type: "Type1Chart",
      data: data,
      select: true
    },
    {
      title: "Google Ads Sales",
      icon: "/band-logo/google.png",
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

  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);
  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setCardList((items) => {
        const oldIndex = items.map((i) => i.id).indexOf(active.id);
        const newIndex = items.map((i) => i.id).indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);
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
      <MainChart
        data={{
          ...data1,
          data: [...data1.data, ...data1.data, ...data1.data],
          series: [
            {
              name: "Total",
              dataKey: "s",
              id: 1,
              color: "#E87C67",
              type: "line"
            },
            {
              name: "Sales",
              dataKey: "r",
              id: 2,
              color: "#B1BA88",
              type: "area"
            }
          ]
        }}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={cardList} strategy={rectSortingStrategy}>
          <div className="m-6 grid grid-cols-6 gap-3">
            {cardList
              ?.filter((f) => f.select)
              .map((card, i) => {
                let length = cardList?.filter((f) => f.select).length;
                return (
                  <SortableItem key={card.id} id={card.id} length={length} i={i}>
                    {card.type === "Type3Chart" ? (
                      <Type3Chart data={card.data} details={card} />
                    ) : card.type === "Type2Chart" ? (
                      <Type2Chart data={card.data} details={card} />
                    ) : (
                      <Type1Chart data={card.data} details={card} />
                    )}
                  </SortableItem>
                );
              })}
          </div>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {activeId ? (
            <Item id={activeId} isDragging>
              {cardList?.filter((f) => f.select)[activeId - 1].type === "Type3Chart" ? (
                <Type3Chart
                  data={cardList?.filter((f) => f.select)[activeId - 1].data}
                  details={cardList?.filter((f) => f.select)[activeId - 1]}
                />
              ) : cardList?.filter((f) => f.select)[activeId - 1].type === "Type2Chart" ? (
                <Type2Chart
                  data={cardList?.filter((f) => f.select)[activeId - 1].data}
                  details={cardList?.filter((f) => f.select)[activeId - 1]}
                />
              ) : (
                <Type1Chart
                  data={cardList?.filter((f) => f.select)[activeId - 1].data}
                  details={cardList?.filter((f) => f.select)[activeId - 1]}
                />
              )}
            </Item>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="imageUrls" direction="horizontal">
          {(provided) => (
            <div className="m-6 grid grid-cols-6 gap-3" {...provided.droppableProps} ref={provided.innerRef}>
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
                            (i + 2 === length && (i + 1) % 3 === 1) || (i + 1 === length && (i + 1) % 3 !== 0)
                              ? "col-span-3"
                              : "col-span-2"
                          }
                        >
                          {card.type === "Type3Chart" ? (
                            <Type3Chart data={card.data} details={card} dragHandleProps={provided.dragHandleProps} />
                          ) : card.type === "Type2Chart" ? (
                            <Type2Chart data={card.data} details={card} dragHandleProps={provided.dragHandleProps} />
                          ) : (
                            <Type1Chart data={card.data} details={card} dragHandleProps={provided.dragHandleProps} />
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
      </DragDropContext> */}

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

export const Item = forwardRef(({ i, length, children, withOpacity, isDragging, style, ...props }, ref) => {
  const inlineStyles = {
    opacity: withOpacity ? "0.5" : "1",
    transformOrigin: "50% 50%",
    cursor: isDragging ? "grabbing" : "grab",
    // boxShadow: isDragging
    //   ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
    //   : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    ...style
  };

  return (
    <div
      ref={ref}
      style={inlineStyles}
      {...props}
      className={(i + 2 === length && (i + 1) % 3 === 1) || (i + 1 === length && (i + 1) % 3 !== 0) ? "col-span-3" : "col-span-2"}
    >
      {children}
    </div>
  );
});

Item.displayName = "Item";

export const SortableItem = (props) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined
  };

  return <Item ref={setNodeRef} style={style} withOpacity={isDragging} {...props} {...attributes} {...listeners}></Item>;
};

SortableItem.displayName = "SortableItem";
