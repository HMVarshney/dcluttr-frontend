"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import cubeJsApi from "@/lib/cubeJsApi";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { addCardToGrid, dynamicDashboardOperations, removeCardFromGrid } from "@/lib/utils/dynamicDashboard.utils";
import Hint from "@/components/Hint";
import { dynamicDashboardActions } from "@/lib/context/DynamicDashboard/DynamicDashboardActions";
import { useDynamicDashboardContext } from "@/lib/context/DynamicDashboard/DynamicDashboardContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DotsSixVertical, X } from "phosphor-react";
import { cn } from "@/lib/utils";

async function fetchMetricList() {
  const response = await cubeJsApi().meta();
  const metricCube = response.cubes.find((c) => c.name === "hybrid_performance_stream");
  if (!metricCube) {
    throw new Error("Metric cube not found");
  }
  return metricCube;
}

async function createDashboardSection(section) {
  const response = await axiosInterceptorInstance.post("/brand/24/dashboards", section);
  return response;
}

async function createDashboardSectionJSON(payload) {
  const response = await axios.post("/api/createCubeQuery", payload);
  return response.data;
}

function CreateSectionButton({
  isOpen,
  setOpen,
  metricList,
  sectionName,
  setSectionName,
  selection,
  onSelect,
  onSubmit,
  onDelete,
  triggerEl
}) {
  const [search, setSearch] = useState("");

  const [titles, setTitles] = useState(Object.values(selection)?.map((i) => i.title));
  useEffect(() => {
    setTitles(Object.values(selection)?.map((i) => i.title));
  }, [selection]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = titles;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTitles(items);
  };
  return (
    <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>{triggerEl}</DialogTrigger>
      <DialogContent className=" bg-white border-none max-w-[852px] p-0 gap-0 ">
        <DialogHeader>
          <DialogTitle className="border-b p-4">Create section</DialogTitle>
        </DialogHeader>

        <div className="flex divide-x relative">
          <div className="grid gap-4 px-4 max-h-[74vh] overflow-y-auto w-full">
            <div className="flex flex-col gap-2 mt-4">
              <Label htmlFor="Section name" className="text-base font-semibold">
                Section name
              </Label>
              <Input
                onChange={(e) => setSectionName(e.target.value)}
                value={sectionName}
                id="section_name"
                placeholder="Type section name here"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="logo" className="text-base font-semibold">
                Search for metric
              </Label>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search for metric" />
            </div>
            {Object.keys(metricList).map((metric) => (
              <div className="flex flex-col gap-2 pb-4 border-b" key={metric}>
                <Label htmlFor="logo" className="text-base font-semibold">
                  {metric}
                </Label>
                <div className="flex flex-wrap gap-4 py-2">
                  {metricList[metric].map((item) => (
                    <div className="flex items-center gap-2" key={item.id}>
                      <input
                        type="checkbox"
                        id={item.id}
                        className="w-[18px] h-[18px]"
                        checked={!!selection[item.id]}
                        onChange={() => onSelect(item)}
                      />
                      <Hint label={item.description}>
                        <label htmlFor={item.id} className="text-sm font-medium leading-none text-[#515153]">
                          {item.title}
                        </label>
                      </Hint>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="max-h-full overflow-y-auto min-w-80 w-80 relative">
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
                              snapshot.isDragging ? "bg-blue-100 shadow-lg z-[51] absolute right-0" : ""
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? 0.8 : 1,
                              left: 532
                            }}
                          >
                            <DotsSixVertical size={16} color="#031B15" className="mr-4" />
                            <div className="text-base font-semibold"> {title}</div>
                            <X
                              className="w-5 h-5 ml-auto"
                              onClick={() => {
                                setTitles(titles.filter((_, index) => index !== i));
                                console.log(selection);
                                console.log(
                                  Object.entries(selection)
                                    .filter(([k, v]) => v.title !== title)
                                    ?.map(([k, v]) => ({ [k]: v }))
                                );

                                // onSelect({
                                //   ...Object.entries(selection)
                                //     .filter(([k, v]) => v.title !== title)
                                //     ?.map(([k, v]) => ({ k: v }))
                                // });
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
            </DragDropContext>
          </div>
        </div>

        <DialogFooter className=" p-2.5 border-t">
          <Button type="submit" onClick={onSubmit}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateSection({ children }) {
  const cube = useRef(null);

  const { state, dispatch } = useDynamicDashboardContext();

  const { activeSection, cardCustomizableProps, gridstackInstance } = state;

  const [isOpen, setOpen] = useState(false);
  const [metricList, setMetricList] = useState({});
  const [sectionName, setSectionName] = useState("");

  const handleSelect = (selectedMetric) => {
    if (cardCustomizableProps[selectedMetric.id]) {
      dynamicDashboardActions.removeCard(dispatch)(selectedMetric.id);
      removeCardFromGrid(gridstackInstance, selectedMetric.id);
      dynamicDashboardActions.removeGridItem(dispatch)(selectedMetric.id);
    } else {
      const cardObj = dynamicDashboardOperations.createCardObject(selectedMetric.id, cube.current);
      dynamicDashboardActions.addCard(dispatch)(selectedMetric.id, cardObj);
      dynamicDashboardActions.addGridItem(dispatch)(
        addCardToGrid(gridstackInstance, cardObj, { ignoreCardGridstackCoords: true })
      );
    }
  };

  const handleSubmit = async () => {
    setOpen(false);
  };

  const handleDeleteSection = async () => {
    await axiosInterceptorInstance.delete("/brand/dashboard", {
      data: activeSection.id
    });
    dynamicDashboardActions.fetchDashboard(dispatch)(18);
  };

  useEffect(() => {
    if (isOpen && Object.keys(metricList).length === 0) {
      (async () => {
        const metricCube = await fetchMetricList();
        cube.current = metricCube;

        const metricSourceMap = metricCube.measures.reduce((prev, m) => {
          const { source } = m.meta;
          if (!prev[source]) {
            prev[source] = [];
          }
          prev[source].push({ title: m.shortTitle, id: m.name, description: m.description });
          return prev;
        }, {});
        setMetricList(metricSourceMap);
      })();
    }
  }, [isOpen, metricList]);

  useEffect(() => {
    if (activeSection.section) setSectionName(activeSection.section.name);
  }, [activeSection.section]);

  return (
    <CreateSectionButton
      isOpen={isOpen}
      setOpen={setOpen}
      metricList={metricList}
      sectionName={sectionName}
      setSectionName={setSectionName}
      selection={cardCustomizableProps}
      onSelect={handleSelect}
      onSubmit={handleSubmit}
      onDelete={handleDeleteSection}
      triggerEl={children}
    />
  );
}

export function CreateSection({ children }) {
  const cube = useRef(null);

  const { dispatch } = useDynamicDashboardContext();

  const [isOpen, setOpen] = useState(false);
  const [metricList, setMetricList] = useState({});
  const [sectionName, setSectionName] = useState("");
  const [selection, setSelection] = useState({});

  const handleSelect = (selectedMetric) => {
    const selectionCopy = { ...selection };
    if (selection[selectedMetric.id]) {
      selectionCopy[selectedMetric.id] = false;
    } else {
      selectionCopy[selectedMetric.id] = selectedMetric;
    }
    setSelection(selectionCopy);
  };

  const handleSubmit = async () => {
    const { section } = await createDashboardSectionJSON({
      sectionId: `overview-${sectionName.replace(/ /g, "_")}`,
      sectionName,
      selectedMetrics: selection,
      metricCube: cube.current,
      brandId: 18
    });
    await createDashboardSection(section);
    await dynamicDashboardActions.fetchDashboard(dispatch)(18);
    setSelection({});
    setSectionName("");
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen && Object.keys(metricList).length === 0) {
      (async () => {
        const metricCube = await fetchMetricList();
        cube.current = metricCube;

        const metricSourceMap = metricCube.measures.reduce((prev, m) => {
          const { source } = m.meta;
          if (!prev[source]) {
            prev[source] = [];
          }
          prev[source].push({ title: m.shortTitle, id: m.name, description: m.description });
          return prev;
        }, {});
        setMetricList(metricSourceMap);
      })();
    }
  }, [isOpen, metricList]);

  return (
    <CreateSectionButton
      isOpen={isOpen}
      setOpen={setOpen}
      metricList={metricList}
      sectionName={sectionName}
      setSectionName={setSectionName}
      selection={selection}
      onSelect={handleSelect}
      onSubmit={handleSubmit}
      triggerEl={children}
    />
  );
}
