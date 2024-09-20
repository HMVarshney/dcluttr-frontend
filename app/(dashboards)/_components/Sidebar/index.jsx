import React from "react";

import List from "./List";
import Profile from "./Profile";
import Link from "next/link";
import Image from "next/image";
import { Plus, SignOut, SquaresFour } from "phosphor-react";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  return (
    <div className="h-full">
      <div className="py-[15.5px]">
        <Link href="/">
          <Image src="/logoIcon.svg" alt="logo" width={100} height={100} className="min-w-9 w-9 mx-auto" />
        </Link>
      </div>
      <aside className="bg-white w-14 flex py-4 px-2 flex-col gap-y-4 h-[calc(100%-70px)]">
        <Link href={"/stores"}>
          <Button variant="outline" className="p-2 h-[38px] text-[#031B15]">
            <SquaresFour className="text-primary " size={20} weight="fill" />
          </Button>
        </Link>
        <List />

        <Link href={"/welcome"}>
          <Button variant="outline" className="p-2 h-[38px] text-[#031B15]">
            <Plus className="text-primary " size={20} />
          </Button>
        </Link>
        <div className="h-full" />
        <Profile />
      </aside>
    </div>
  );
}
