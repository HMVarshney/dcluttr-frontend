"use client"
import SideBar from "./_components/Sidebar";
import { useEffect, } from "react";
import DecluttrNotWorksInPhone from "@/components/DecluttrNotWorksInPhone";
import { Mulish } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "@/lib/store/features/dashboardSlice";
const mulish = Mulish({ subsets: ["latin"] });


export default function DashboardsLayout({ children }) {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.dashboard.userDetails);
    const sideBarClose = useSelector((state) => state.dashboard.sideBarClose);

    useEffect(() => {
        dispatch(fetchUserDetails());
    }, [dispatch]);

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
