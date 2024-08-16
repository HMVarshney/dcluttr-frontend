import React from "react";

import List from "./List";
import Profile from "./Profile";
import Link from "next/link";
import Image from "next/image";
import { Plus, SignOut } from "phosphor-react";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  return (
    <div className="h-full">
      <div className="border-b py-[15.5px]">
        <Link href="/">
          <Image src="/logoIcon.svg" alt="logo" width={100} height={100} className="min-w-9 w-9 mx-auto" />
        </Link>
      </div>
      <aside className="bg-white w-14 flex py-4 px-2 flex-col gap-y-4 h-[calc(100%-70px)]">
        <List />

        <Link href={"/welcome"}>
          <Button variant="outline" className="p-2 h-[38px] text-[#031B15]">
            <Plus className="text-primary " size={20} />
          </Button>
        </Link>
        <div className="h-full" />
        <Link href={"/stores"}>
          <SignOut className="text-icon cursor-pointer w-7 h-7 mx-auto" size={20} />
        </Link>
        <Profile />
      </aside>
    </div>
  );
}
