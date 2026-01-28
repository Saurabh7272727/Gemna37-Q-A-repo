import { createPortal } from "react-dom";
import { X, BookOpen, User, Calendar } from "lucide-react";

const SubjectTeacherPreview = ({ open, onClose, data }) => {
    if (!open || !data) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm">

            {/* Modal */}
            <div className="mt-10 w-[95%] max-w-4xl rounded-2xl bg-slate-900 text-white shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between border-b border-slate-700 bg-slate-900 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold">{data.subjetId.name}</h2>
                        <p className="text-sm text-slate-400">
                            {data.subjetId.subjectCode} • Semester {data.subjetId.semester}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-slate-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

                    {/* Subject Card */}
                    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                        <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
                            <BookOpen size={18} />
                            Subject Details
                        </div>

                        <div className="space-y-2 text-sm text-slate-300">
                            <p><span className="text-slate-400">Department:</span> {data.subjetId.department}</p>
                            <p><span className="text-slate-400">Type:</span> {data.subjetId.type}</p>
                            <p><span className="text-slate-400">Credits:</span> {data.subjetId.credit}</p>
                            <p><span className="text-slate-400">Weekly Classes:</span> {data.subjetId.weeklyFrequency}</p>
                            <p><span className="text-slate-400">Attendance Weight:</span> {data.subjetId.attendanceWeight}</p>
                            <p>
                                <span className="text-slate-400">Priority:</span>{" "}
                                <span className={`font-semibold ${data.priority === "HIGH"
                                        ? "text-red-400"
                                        : data.priority === "MEDIUM"
                                            ? "text-yellow-400"
                                            : "text-green-400"
                                    }`}>
                                    {data.priority}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Teacher Card */}
                    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                        <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
                            <User size={18} />
                            Teacher Details
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-700 text-lg font-bold">
                                {data.teacherId.shortName}
                            </div>

                            <div>
                                <p className="font-semibold">{data.teacherId.name}</p>
                                <p className="text-sm text-slate-400">{data.teacherId.position}</p>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-slate-300 flex items-center gap-2">
                            <Calendar size={14} />
                            Assigned on: {new Date(data.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SubjectTeacherPreview;
