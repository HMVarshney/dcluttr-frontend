// import OrgSideBar from "./_components/org-sidebar";
import Navbar from "./_components/Sidebar/Navbar";
import SideBar from "./_components/Sidebar";


export default function DashboardLayout({ children }) {
    return (
        <main className="h-full">
            <SideBar />
            <div className="pl-14 h-full">
                <div className="flex gap-x-3 h-full">
                    {/* <OrgSideBar /> */}
                    <div className="h-full flex-1">
                        <Navbar />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
