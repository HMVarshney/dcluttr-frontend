"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import cubeJsApi from "@/lib/cubeJsApi";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import { dynamicDashboardActions, fetchDashboard } from "@/lib/store/features/dynamicDashboard";
import { useSelector } from "react-redux";
import { addCardToGrid, createCardObject, removeCardFromGrid } from "@/lib/utils/dynamicDashboard.utils";

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
  triggerEl
}) {
  const [search, setSearch] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>{triggerEl}</DialogTrigger>
      <DialogContent className=" bg-white border-none max-w-[652px] p-0">
        <DialogHeader>
          <DialogTitle className="border-b p-4">Create section</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 px-4 overflow-auto" style={{ height: "800px", maxHeight: "800px" }}>
          <div className="flex flex-col gap-2">
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
                      id={item.title}
                      className="w-[18px] h-[18px]"
                      checked={!!selection[item.id]}
                      onChange={() => onSelect(item)}
                    />
                    <label htmlFor={item.title} className="text-sm font-medium leading-none text-[#515153]">
                      {item.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

export function UpdateSection({ children, placeholderValues }) {
  const dispatch = useDispatch();

  const cube = useRef(null);

  const { activeSection, cardCustomizableProps, gridstackInstance } = useSelector((state) => state.dynamicDashboard);

  const [isOpen, setOpen] = useState(false);
  const [metricList, setMetricList] = useState({});
  const [sectionName, setSectionName] = useState("");

  const handleSelect = (selectedMetric) => {
    if (cardCustomizableProps[selectedMetric.id]) {
      dispatch(dynamicDashboardActions.removeCard({ cardId: selectedMetric.id }));
      removeCardFromGrid(gridstackInstance, selectedMetric.id);
    } else {
      const cardObj = createCardObject(selectedMetric.id, cube.current);
      dispatch(dynamicDashboardActions.addCard({ cardId: selectedMetric.id, properties: cardObj }));
      addCardToGrid(gridstackInstance, cardObj, placeholderValues);
    }
  };

  const handleSubmit = async () => {
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
          prev[source].push({ title: m.title, id: m.name });
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
      triggerEl={children}
    />
  );
}

export function CreateSection({ children }) {
  const dispatch = useDispatch();

  const cube = useRef(null);

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
    dispatch(fetchDashboard(18));
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
          prev[source].push({ title: m.title, id: m.name });
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
