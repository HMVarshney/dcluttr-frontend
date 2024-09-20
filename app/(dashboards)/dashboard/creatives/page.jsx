"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreativesChart from "./_components/CreativesChart";
import Header from "./_components/Header";
import { cn } from "@/lib/utils";
import { fetchCreativeDetails } from "@/lib/store/features/creativeSlice";
import CreativesTable from "./_components/CreativesTable";
import CreativeInsightsPopUp from "./_components/CreativeInsightsPopUp";

const data = {
  title: "Spends",
  series: [
    {
      name: "Spends",
      dataKey: "A",
      id: 3,
      color: "#6D4FED",
      type: "line"
    },
    {
      name: "Revenue",
      dataKey: "a",
      id: 4,
      color: "#6D4FED",
      type: "area"
    },
    {
      name: "Spends",
      dataKey: "B",
      id: 3,
      color: "#EA6153",
      type: "line"
    },
    {
      name: "Revenue",
      dataKey: "b",
      id: 4,
      color: "#EA6153",
      type: "area"
    },
    {
      name: "Spends",
      dataKey: "C",
      id: 3,
      color: "#F7C245",
      type: "line"
    },
    {
      name: "Revenue",
      dataKey: "c",
      id: 4,
      color: "#F7C245",
      type: "area"
    }
  ],
  data: [
    {
      name: "A",
      A: 2,
      a: 10,
      B: 3,
      b: 12,
      C: 4,
      c: 1,
      amt: 24,
      x: "Jun 02"
    },
    {
      name: "B",
      A: 5,
      a: 15,
      B: 6,
      b: 18,
      C: 7,
      c: 11,
      amt: 22,
      x: "Jun 03"
    },
    {
      name: "C",
      A: 8,
      a: 20,
      B: 9,
      b: 22,
      C: 10,
      c: 14,
      amt: 22,
      x: "Jun 04"
    },
    {
      name: "D",
      A: 6,
      a: 25,
      B: 7,
      b: 24,
      C: 11,
      c: 16,
      amt: 20,
      x: "Jun 05"
    },
    {
      name: "E",
      A: 7,
      a: 21,
      B: 8,
      b: 23,
      C: 12,
      c: 18,
      amt: 21,
      x: "Jun 06"
    }
  ]
};

export default function Page() {
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.user.sideBarClose);
  const { creativeDetails, isLoading } = useSelector((state) => state.creative);

  useEffect(() => {
    dispatch(fetchCreativeDetails());
  }, [dispatch]);

  return (
    <ScrollArea
      className={cn("rounded-md bg-[#FAFAFA] h-full border w-[calc(100vw-332px)]", { "w-[calc(100vw-174px)]": isOpen })}
    >
      <Header />
      <CreativeInsightsPopUp />
      <CreativesChart
        data={{
          ...data,
          data: [...data.data, ...data.data, ...data.data]
        }}
        isLoading={isLoading}
      />

      <CreativesTable
        data={creativeDetails?.results?.[0]?.data}
        annotation={creativeDetails?.results?.[0]?.annotation}
        isLoading={isLoading}
      />
    </ScrollArea>
  );
}
