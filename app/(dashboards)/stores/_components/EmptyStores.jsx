"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function EmptyStores() {
  return (
    <div className="mt-60 w-full flex flex-col justify-center items-center">
      <Image src="/icons/empty-stores.svg" width={78} height={78} alt="" />
      <h2 className="text-base font-bold mt-4">Connect your first store now</h2>
      <p className="text-xs mt-1 mb-8">You don’t have any stores in this organisation</p>
      <Link href="/welcome">
        <Button>Add a store</Button>
      </Link>
    </div>
  );
}
