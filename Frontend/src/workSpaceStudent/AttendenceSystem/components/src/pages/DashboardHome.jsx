import StatsCards from "../ui/StatsCards.jsx";
import AttendanceTable from "../ui/AttendanceTable.jsx";
import Insights from "../ui/Insights.jsx";


export default function DashboardHome() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Student Attendance Dashboard</h1>
            <StatsCards />
            <AttendanceTable />
            <Insights />
        </div>
    );
}