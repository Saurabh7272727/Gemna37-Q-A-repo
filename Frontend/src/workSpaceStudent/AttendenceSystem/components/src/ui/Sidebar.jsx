import { Menu, LayoutDashboard, CalendarCheck, BarChart3, User } from "lucide-react";
import AddLinkIcon from '@mui/icons-material/AddLink';
import { useNavigate } from "react-router-dom";

export default function Sidebar({ expanded, setExpanded }) {
    const navi = useNavigate();
    const items = [
        { icon: <LayoutDashboard />, label: "Dashboard", link: "/app/attendence/verify?college=bit&secure=true" },
        { icon: <CalendarCheck />, label: "Attendance", link: "/app/attendence/timetable?page.html" },
        { icon: <BarChart3 />, label: "Analytics", link: "/" },
        { icon: <User />, label: "Profile", link: "/app/attendence/profile" },
        { icon: <AddLinkIcon />, label: "Link Subject", link: "/app/attendence/subject/link" }
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
                        title={item.label}
                        key={item.label}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 cursor-pointer"
                        onClick={() => navi(`${item?.link}`)}
                    >
                        {item.icon}
                        {expanded && <span>{item.label}</span>}
                    </div>
                ))}
            </nav>
        </aside>
    );
}