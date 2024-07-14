"use client"
import SideBar from "./_components/Sidebar";
import { useEffect, } from "react";
import DecluttrNotWorksInPhone from "@/components/DecluttrNotWorksInPhone";
import { Mulish } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "@/lib/store/features/dashboardSlice";
import { fetchAllOrganization } from "@/lib/store/features/organizationSlice";
const mulish = Mulish({ subsets: ["latin"] });


export default function DashboardsLayout({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserDetails());
        dispatch(fetchAllOrganization("FIRST"));
    }, []);

    return (
        <>
            <DecluttrNotWorksInPhone />
            <main className={cn(
                "h-full hidden lg:flex items-stretch",
                mulish.className
            )}>
                <SideBar />
                {children}
            </main>
        </>
    );
}
