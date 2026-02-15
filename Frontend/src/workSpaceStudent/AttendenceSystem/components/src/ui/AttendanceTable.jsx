import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

// Demo initial data (replace later with real API)
const demoSubjects = [
    {
        id: 1,
        name: "Database Management System",
        code: "BCS501",
        faculty: "Dr. Sharma",
        progress: "75%",
        status: "Active",
    },
    {
        id: 2,
        name: "Computer Networks",
        code: "BCS502",
        faculty: "Prof. Verma",
        progress: "60%",
        status: "Active",
    },
];

export default function UserSubjectsTable() {
    const { data } = useQuery({
        queryKey: ["user-subjects"],
        initialData: demoSubjects,
    });

    return (
        <div className="h-fit bg-slate-900 text-white p-0 md:p-2">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                <h1 className="text-2xl md:text-4xl font-bold mb-6">
                    User Linked Subjects
                </h1>

                <div className="overflow-x-auto rounded-2xl shadow-xl">
                    <table className="min-w-full bg-slate-800 rounded-2xl">
                        <thead>
                            <tr className="text-left border-b border-slate-700">
                                <th className="p-4">Subject</th>
                                <th className="p-4">Code</th>
                                <th className="p-4">Faculty</th>
                                <th className="p-4">Progress</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>

                        <tbody className=" relative">
                            {data.map((subject) => (
                                <tr
                                    key={subject.id}
                                    className="border-b relative border-slate-700 hover:bg-slate-700/40 transition"
                                >
                                    <td className="p-4 font-semibold sticky left-0 bg-gray-900 md:bg-transparent">{subject.name}</td>
                                    <td className="p-4 text-gray-300">{subject.code}</td>
                                    <td className="p-4 text-gray-300">{subject.faculty}</td>

                                    <td className="p-4">
                                        <div className="w-full bg-slate-700 rounded-full h-3">
                                            <div
                                                className="bg-blue-500 h-3 rounded-full"
                                                style={{ width: subject.progress }}
                                            />
                                        </div>
                                        <span className="text-sm text-gray-400">
                                            {subject.progress}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <span className="px-3 py-1 rounded-full text-sm bg-slate-700">
                                            {subject.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
