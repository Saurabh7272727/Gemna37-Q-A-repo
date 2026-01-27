import { useState } from "react";
import Sidebar from "../ui/Sidebar.jsx";


export default function DashboardLayout({ children }) {
    const [expanded, setExpanded] = useState(false);


    return (
        <div className="flex min-h-screen bg-slate-900 text-white">
            <Sidebar expanded={expanded} setExpanded={setExpanded} />
            <main className="flex-1 p-6 overflow-y-auto ml-10">{children}</main>
        </div>
    );
}