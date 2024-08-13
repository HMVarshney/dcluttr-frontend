"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function AllDoneStartUsingDcluttr({ brandId, orgId }) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mt-20">All Done, Start using Dcluttr!</h2>
      <p className="text-xs mt-4 mb-10 w-1/2 text-center">Need further assistance? Reach out to support</p>
      <Link href={`/dashboard?brand=${brandId}&orgId=${orgId}`}>
        <Button className="w-full">Take me to my Dashboard</Button>
      </Link>
    </div>
  );
}
