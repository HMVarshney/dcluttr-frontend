"use client"

import { House, Package, PresentationChart, ImageSquare } from "phosphor-react";
import OrgSideBar from "../_components/OrgSidebar";


const sideBarList = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: <House className='h-5 w-5 text-icon' />
    },
    {
        name: "Performance",
        href: "/dashboard/performance",
        icon: <PresentationChart className='h-5 w-5 text-icon' />,
        level2: [
            {
                name: "All",
                href: "/dashboard/performance",
            },
            {
                name: "Meta Ads",
                href: "/dashboard/performance/meta-ads",
            },
            {
                name: "Google Ads",
                href: "/dashboard/performance/google-ads",
            },
        ]
    },
    {
        name: "Products",
        href: "/dashboard/products",
        icon: <Package className='h-5 w-5 text-icon' />
    },
    {
        name: "Creatives",
        href: "/dashboard/creatives",
        icon: <ImageSquare className='h-5 w-5 text-icon' />
    }]
export default function DashboardLayout({ children }) {
    return (
        <>
            <OrgSideBar sideBarList={sideBarList} />
            <div className="px-5 pt-4 w-full">
                {children}
            </div>
        </>
    );
}
