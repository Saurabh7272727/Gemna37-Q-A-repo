import { BookOpen, CheckCircle, GraduationCap, Layers } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Label from '../ui/Label.jsx';
import InfoIcon from '@mui/icons-material/Info';

export default function SubjectAddPage() {
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const userInformation = useSelector(state => state?.userinfoSlice.user);

    const subjects = [
        { id: 1, name: "Data Structures", code: "CS201", year: 2 },
        { id: 2, name: "Operating Systems", code: "CS301", year: 3 },
        { id: 3, name: "DBMS", code: "CS202", year: 2 },
        { id: 4, name: "Computer Networks", code: "CS302", year: 3 },
        { id: 5, name: "Machine Learning", code: "CS401", year: 4 },
    ];

    const toggleSubject = (id) => {
        setSelectedSubjects((prev) =>
            prev.includes(id)
                ? prev.filter((s) => s !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-slate-900 p-6 text-white">
            <div className="max-w-6xl mx-auto mb-6">
                <h1 className="md:text-2xl text-[23px] font-bold flex items-center gap-2">
                    <GraduationCap className="text-indigo-400" />
                    Link Your Subjects
                </h1>
                <br />
                <p className="text-slate-400 mt-1">
                    Choose the subjects you are currently studying
                </p>
                <p className="text-green-400 mt-1 text-[15px] md:text-xl 
                 font-bold text-nowrap whitespace-nowrap overflow-ellipsis overflow-hidden">
                    Email - {userInformation?.email ? userInformation?.email : "Invalid user"}
                </p>
            </div>

            {/* Info Cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <InfoCard icon={Layers} label="Branch" value={`${userInformation?.ref_id?.branch?.label}`} />
                <InfoCard icon={BookOpen} label="Academic Year" value={`${userInformation?.ref_id?.year?.label}`} />
                <InfoCard
                    icon={CheckCircle}
                    label="Selected"
                    value={`${selectedSubjects.length} Subjects`}
                />
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject) => {
                    const active = selectedSubjects.includes(subject.id);

                    return (
                        <div
                            key={subject.id}
                            onClick={() => toggleSubject(subject.id)}
                            className={`cursor-pointer rounded-xl border p-4 transition-all md:col-span-1 col-auto 
                ${active
                                    ? "border-indigo-500 bg-indigo-500/10"
                                    : "border-slate-700 bg-slate-800 hover:border-slate-500"
                                }
              `}
                        >
                            <div className="flex items-start justify-between relative">
                                <div>
                                    <h3 className="font-semibold md:text-lg text-[16px]">
                                        {subject.name}
                                    </h3>
                                    <p className="text-sm text-slate-400">
                                        {subject.code} • Year {subject.year}
                                    </p>
                                    <p className="absolute right-0 bottom-0" title="Information about" onClick={(e) => {
                                        e.stopPropagation();
                                        alert('hello')
                                    }}>
                                        <Label text={<InfoIcon />} css={'mt-2 transform md:scale-75  text-sm scale-50'} />
                                    </p>

                                </div>

                                {active && (
                                    <CheckCircle className="text-indigo-400" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="max-w-6xl mx-auto mt-10 flex justify-end">
                <button
                    className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium"
                >
                    Link Selected Subjects
                </button>
            </div>
        </div>
    );
}


function InfoCard({ icon: Icon, label, value }) {
    return (
        <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-slate-700 rounded-lg">
                <Icon className="text-indigo-400" />
            </div>
            <div>
                <p className="text-sm text-slate-400">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    );
}
