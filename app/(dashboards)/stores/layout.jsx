"use client"

import { GearSix, Storefront } from "phosphor-react";
import OrgSideBar from "../_components/OrgSidebar";

const sideBarList = [
    {
        name: "All Stores",
        href: "/stores",
        icon: <Storefront className='h-5 w-5 text-icon' weight="bold" />
    },
    {
        name: "Settings",
        href: "/stores/settings",
        icon: <GearSix className='h-5 w-5 text-icon' weight="bold" />
    }]

export default function StoresLayout({ children }) {
    return (
        <>
            <OrgSideBar sideBarList={sideBarList} />
            <div className="px-5 pt-4 w-full">
                {children}
            </div>
        </>
    );
}
