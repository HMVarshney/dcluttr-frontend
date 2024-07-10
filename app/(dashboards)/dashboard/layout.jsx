"use client"

import OrgSideBar from "../_components/OrgSidebar";


export default function DashboardLayout({ children }) {
    return (
        <>
            <OrgSideBar />
            <div className="px-5 pt-4 w-full">
                {children}
            </div>
        </>
    );
}
