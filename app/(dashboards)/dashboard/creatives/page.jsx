"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect } from "react";
import CreativesChart from "./_components/CreativesChart";
import Header from "./_components/Header";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { fetchCreativeDetails } from "@/lib/store/features/creativeSlice";
import CreativesTable from "./_components/CreativesTable";

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
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.user.sideBarClose);
  const { creativeDetails, isLoading } = useSelector((state) => state.creative);
  console.log(creativeDetails);
  useEffect(() => {
    dispatch(fetchCreativeDetails());
  }, []);

  return (
    <ScrollArea
      className={cn("rounded-md bg-[#FAFAFA] h-full border w-[calc(100vw-332px)]", { "w-[calc(100vw-174px)]": isOpen })}
    >
      <Header />
      <CreativesChart
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
