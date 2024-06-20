
import Navbar from "./_components/Sidebar/Navbar";
import SideBar from "./_components/Sidebar";
import OrgSideBar from "./_components/OrgSidebar";


export default function DashboardLayout({ children }) {
    return (
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
    );
}
