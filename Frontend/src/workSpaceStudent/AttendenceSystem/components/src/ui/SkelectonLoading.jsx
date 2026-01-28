import { Menu, LayoutDashboard, CalendarCheck, BarChart3, User } from "lucide-react";


export default function LoadingDashboard() {
    return (
        <div className="flex ml-[70px] min-h-screen w-full bg-slate-900 text-white overflow-hidden">
            <main className="flex-1 p-4 md:p-6 space-y-6">
                {/* Header */}
                <div className="h-8 w-64 bg-slate-700 rounded animate-pulse" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-24 bg-slate-800 rounded-xl animate-pulse" />
                    ))}
                </div>

                <div className="bg-slate-800 rounded-xl p-4 space-y-3">
                    <div className="h-5 w-48 bg-slate-700 rounded animate-pulse" />
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-4 bg-slate-700 rounded animate-pulse" />
                    ))}
                </div>

                <div className="bg-slate-800 rounded-xl p-4 space-y-2">
                    <div className="h-5 w-40 bg-slate-700 rounded animate-pulse" />
                    <div className="h-4 bg-slate-700 rounded animate-pulse" />
                    <div className="h-4 bg-slate-700 rounded animate-pulse" />
                </div>
            </main>
        </div>
    );
}
