// ui/Sidebar.jsx
import { Menu, LayoutDashboard, CalendarCheck, BarChart3, User } from "lucide-react";


export default function Sidebar({ expanded, setExpanded }) {
    const items = [
        { icon: <LayoutDashboard />, label: "Dashboard" },
        { icon: <CalendarCheck />, label: "Attendance" },
        { icon: <BarChart3 />, label: "Analytics" },
        { icon: <User />, label: "Profile" },
    ];


    return (
        <aside
            className={`$${expanded ? "w-56" : "w-16"} transition-all h-full fixed top-[60px] duration-300 bg-slate-800 flex flex-col`}
        >
            <button
                onClick={() => setExpanded(!expanded)}
                className="p-4 hover:bg-slate-700"
            >
                <Menu />
            </button>


            <nav className="flex-1 space-y-2 px-2">
                {items.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 cursor-pointer"
                    >
                        {item.icon}
                        {expanded && <span>{item.label}</span>}
                    </div>
                ))}
            </nav>
        </aside>
    );
}