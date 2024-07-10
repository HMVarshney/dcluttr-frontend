"use client"
import SideBar from "./_components/Sidebar";
import OrgSideBar from "./_components/OrgSidebar";
import { createContext, useEffect, useState } from "react";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";
import DecluttrNotWorksInPhone from "@/components/DecluttrNotWorksInPhone";


export const DashboardContext = createContext();
export default function DashboardsLayout({ children }) {
    const [userDetails, setUserDetails] = useState({})
    const [sideBarClose, setSideBarClose] = useState(false)
    const getUserDetails = () => {
        axiosInterceptorInstance
            .get("/user/me")
            .then((res) => {
                setUserDetails(res.data);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <DashboardContext.Provider value={{ userDetails, getUserDetails, sideBarClose, setSideBarClose }}>
            <DecluttrNotWorksInPhone />
            <main className="h-full hidden lg:flex items-stretch">
                <SideBar />
                {children}
            </main>
        </DashboardContext.Provider>
    );
}
