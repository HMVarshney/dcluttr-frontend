"use client"
import Navbar from "./_components/Sidebar/Navbar";
import SideBar from "./_components/Sidebar";
import OrgSideBar from "./_components/OrgSidebar";
import { createContext, useEffect, useState } from "react";
import axiosInterceptorInstance from "@/lib/axiosInterceptorInstance";


export const DashboardContext = createContext();
export default function DashboardLayout({ children }) {
    const [userDetails, setUserDetails] = useState({})
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
        <DashboardContext.Provider value={{ userDetails, getUserDetails }}>
            <main className="h-full flex items-stretch">
                <div className="flex flex-col">
                    <Navbar />
                    <div className="flex h-full">
                        <SideBar />
                        <OrgSideBar />
                    </div>
                </div>

                <div className="px-5 pt-4 w-full">
                    {children}
                </div>
            </main>
        </DashboardContext.Provider>
    );
}
