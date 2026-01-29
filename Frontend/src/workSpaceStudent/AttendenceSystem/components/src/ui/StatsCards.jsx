import Label from './Label.jsx';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function StatsCards() {
    const stats = [
        { label: "Today's Status", value: "Present", status: Date.now() },
        { label: "Overall Attendance", value: "82%" },
        { label: "At Risk Subjects", value: "2" },
        { label: "Classes Attended", value: "24 / 30" },
    ];


    const date = new Date();
    const dateNumber = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const DMY = `${dateNumber}/${month + 1}/${year}`;
    const getDay = date.getDay();
    const collectionDay = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THUSDAY", "FRIDAY", "SATURDAY"]
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((s) => (
                <div
                    key={s.label}
                    className="bg-slate-800 p-4 rounded-xl shadow"
                >
                    <p className="text-sm text-slate-400">{s.label}</p>
                    {
                        s?.status ?
                            <p className="text-xl font-bold mt-1 text-green-500">{
                                DMY
                            }</p>
                            : <p className="text-xl font-bold mt-1">{s.value}</p>
                    }
                    {
                        (s?.status) && <Label text={collectionDay[getDay]} css={"w-fit mt-2 rounded-sm"} />
                    }{
                        (getDay !== 0) && <Label text={<OpenInNewIcon />} css={"w-fit mt-2 rounded-sm float-right"} />
                    }
                </div>
            ))}
        </div>
    );
}