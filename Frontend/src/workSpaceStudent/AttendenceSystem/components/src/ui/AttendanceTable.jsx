export default function AttendanceTable() {
    const subjects = [
        { name: "DBMS", attended: 18, total: 30, percent: 60, status: "Low" },
        { name: "Operating Systems", attended: 26, total: 30, percent: 87, status: "Good" },
        { name: "Computer Networks", attended: 22, total: 30, percent: 73, status: "Medium" },
    ];


    return (
        <div className="bg-slate-800 rounded-xl p-4">
            <h2 className="font-semibold mb-3">Subject-wise Attendance</h2>
            <table className="w-full text-sm">
                <thead className="text-slate-400">
                    <tr>
                        <th className="text-left">Subject</th>
                        <th>Attended</th>
                        <th>Total</th>
                        <th>%</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((s) => (
                        <tr key={s.name} className="border-t border-slate-700">
                            <td>{s.name}</td>
                            <td className="text-center">{s.attended}</td>
                            <td className="text-center">{s.total}</td>
                            <td className="text-center">{s.percent}%</td>
                            <td className="text-center">{s.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}