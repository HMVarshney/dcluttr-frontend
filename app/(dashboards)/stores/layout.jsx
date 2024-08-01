"use client";

import { GearSix, Storefront } from "phosphor-react";
import OrgSideBar from "../_components/OrgSidebar";

const sideBarList = [
    {
        name: "All stores",
        href: "/stores",
        icon: Storefront
    },
    {
        name: "Store settings",
        href: "/stores/settings",
        icon: GearSix
    }
];

export default function StoresLayout({ children }) {
    return (
        <>
            <OrgSideBar sideBarList={sideBarList} />
            <div className="px-5 pt-4 w-full">{children}</div>
        </>
    );
}
