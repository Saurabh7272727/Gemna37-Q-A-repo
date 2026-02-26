import React from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const weeklyData = [
    { day: "Mon", periods: 5 },
    { day: "Tue", periods: 6 },
    { day: "Wed", periods: 4 },
    { day: "Thu", periods: 7 },
    { day: "Fri", periods: 5 },
];

const subjectDistribution = [
    { name: "Math", value: 8 },
    { name: "Science", value: 6 },
    { name: "Chem", value: 4 },
    { name: "English", value: 5 },
];

const periodTrend = [
    { week: "Week 1", load: 22 },
    { week: "Week 2", load: 26 },
    { week: "Week 3", load: 24 },
    { week: "Week 4", load: 28 },
];

const heatData = [
    { day: "Mon", load: 5 },
    { day: "Tue", load: 6 },
    { day: "Wed", load: 4 },
    { day: "Thu", load: 7 },
    { day: "Fri", load: 5 },
];

export default function TimetableAnalyticsDashboard() {
    return (
        <div className="min-h-screen bg-black p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-300">
                Timetable Analysis Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">

                <div className="bg-white p-4 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Weekly Period Load</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="periods" fill="#6366f1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Monthly Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={periodTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="week" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="load"
                                stroke="#10b981"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Subject Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={subjectDistribution}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                fill="#f59e0b"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Daily Load Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={heatData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="load"
                                stroke="#ef4444"
                                fill="#fecaca"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}