"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GearSix, Storefront } from "phosphor-react";
import Navbar from "../_components/Sidebar/Navbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";

const sideBarList = [
  {
    name: "Store settings",
    href: "/store-settings",
    icon: Storefront
  },
  {
    name: "Integrations",
    href: "/store-settings/integrations",
    icon: GearSix
  }
];

const isOpen = false;

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={cn("h-full min-w-[236px] w-[236px] transition-all", { "min-w-[78px] w-[78px]": isOpen })}>
      <Navbar isOpen={isOpen} />
      <div className="hidden lg:flex flex-col gap-y-6 w-full py-6 px-4 bg-[#F8F8F8] h-[calc(100%-70px)] border-t">
        <div className="space-y-2.5 w-full">
          {sideBarList.map((item, index) => {
            const Icon = item.icon;
            return (
              <Fragment key={index}>
                <Button
                  asChild
                  variant={"ghost"}
                  size={"lg"}
                  className={cn("w-full font-normal justify-start transition-all mx-auto px-4", {
                    "px-0 gap-0 justify-center": isOpen,
                    "bg-[#DFEEE6]": pathname === item.href
                  })}
                >
                  <Link href={item.href}>
                    <Icon
                      className={cn("h-5 w-5 text-[#7E8986] ", {
                        "text-primary": pathname === item.href
                      })}
                    />
                    <span
                      className={cn("text-sm font-medium transition-all max-w-96 opacity-100 line-clamp-1 ml-2", {
                        "max-w-0 opacity-0 ml-0": isOpen,
                        "text-primary": pathname === item.href
                      })}
                    >
                      {item.name}
                    </span>
                  </Link>
                </Button>
              </Fragment>
            );
          })}
        </div>
        <div className="h-full" />
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <div className="px-5 pt-4 w-full">
        <ScrollArea className="rounded-md bg-[#FAFAFA] h-full border">
          <div className="sticky top-0 z-10">
            <div className="flex items-center justify-center gap-2 py-5 px-6 bg-white border-b">
              <div className="mr-auto">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/stores">All stores</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/store-settings">Store settings</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </div>
          <div>{children}</div>
        </ScrollArea>
      </div>
    </>
  );
}

export default Layout;
