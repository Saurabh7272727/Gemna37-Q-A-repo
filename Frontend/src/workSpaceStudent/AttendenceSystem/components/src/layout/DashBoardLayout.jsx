import { useState } from "react";
import Sidebar from "../ui/Sidebar.jsx";


export default function DashboardLayout({ children }) {
    return (
        <main className="flex-1 p-6 overflow-y-auto ml-10">{children}</main>
    );
}