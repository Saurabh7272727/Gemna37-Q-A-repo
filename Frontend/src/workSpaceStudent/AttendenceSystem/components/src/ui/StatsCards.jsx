export default function StatsCards() {
    const stats = [
        { label: "Today's Status", value: "Present" },
        { label: "Overall Attendance", value: "82%" },
        { label: "At Risk Subjects", value: "2" },
        { label: "Classes Attended", value: "24 / 30" },
    ];


    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((s) => (
                <div
                    key={s.label}
                    className="bg-slate-800 p-4 rounded-xl shadow"
                >
                    <p className="text-sm text-slate-400">{s.label}</p>
                    <p className="text-xl font-bold mt-1">{s.value}</p>
                </div>
            ))}
        </div>
    );
}