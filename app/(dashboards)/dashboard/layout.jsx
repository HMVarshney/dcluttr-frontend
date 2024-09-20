"use client";

import { House, Package, PresentationChart, ImageSquare } from "phosphor-react";
import OrgSideBar from "../_components/OrgSidebar";
import { DynamicDashboardProvider } from "@/lib/context/DynamicDashboard/DynamicDashboardContext";

const sideBarList = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: House
  },
  {
    name: "Channels",
    href: "/dashboard/performance",
    icon: PresentationChart,
    level2: [
      {
        name: "Meta Ads",
        href: "/dashboard/performance/meta-ads"
      },
      {
        name: "Google Ads",
        href: "/dashboard/performance/google-ads"
      }
    ]
  },
  // {
  //   name: "Products",
  //   href: "/dashboard/products",
  //   icon: Package,
  //   level2: [
  //     {
  //       name: "Analytics",
  //       href: "/dashboard/products/analytics"
  //     },
  //     {
  //       name: "Cart",
  //       href: "/dashboard/products/cart"
  //     },
  //     {
  //       name: "Sets",
  //       href: "/dashboard/products/sets"
  //     }
  //   ]
  // },
  {
    name: "Creatives",
    href: "/dashboard/creatives",
    icon: ImageSquare
  }
];
export default function DashboardLayout({ children }) {
  return (
    <DynamicDashboardProvider>
      <OrgSideBar sideBarList={sideBarList} />
      <div className="px-5 pt-4 w-full">{children}</div>
    </DynamicDashboardProvider>
  );
}
