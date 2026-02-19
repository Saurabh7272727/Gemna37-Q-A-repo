import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import NotifyError from '../../../../../Components/ErrorPages/NotifyError.jsx';
import API from '../../../ApiEndPoints/api.js';
import { useSelector } from "react-redux";
import MessageAlert from '../../../../../Components/ErrorPages/ErrorMessagePage.jsx'

export default function UserSubjectsTable() {
    const api = new API(import.meta.env.VITE_APP_BACKEND_URL);
    // Demo initial data (replace later with real API)
    const demoSubjects = new Array(2).fill(2);

    const attendanceSlice = useSelector(state => state?.AttendanceSlice?.AttendanceInfo);

    const { data, isLoading, isError, error, isSuccess, fetchStatus } = useQuery({
        queryKey: ["user-subjects"],
        queryFn: () => {
            // fuction define
            return api.postRequest("/api/subject/get/linked/subject", {
                studentAttendanceId: attendanceSlice?._id
            });
        },
        gcTime: 5 * 60 * 1000,
        staleTime: 3 * 60 * 1000,
        retry: 2,
    });

    return (
        <div className="h-fit bg-slate-900 text-white p-0 md:p-2">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto"
            >
                <h1 className="text-2xl md:text-1xl font-bold mb-6">
                    Student Subject List
                    {
                        fetchStatus == 'fetching' &&
                        <MessageAlert type="success" message="fetching...." onClose={true} />
                    }
                    {
                        fetchStatus == 'paused' &&
                        <h2><MessageAlert type="error" message={`${error?.message || "something was wrong"}`} onClose={true} /></h2>
                    }
                </h1>

                <div className="overflow-x-auto rounded-2xl shadow-xl">
                    <table className="min-w-full bg-slate-800 rounded-2xl">
                        <thead>
                            <tr className="text-left border-b border-slate-700">
                                <th className="p-4">S.No</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Code</th>
                                <th className="p-4">Faculty</th>
                                <th className="p-4">Progress</th>
                                <th className="p-4">Type</th>
                            </tr>
                        </thead>
                        {
                            isError &&
                            <div>
                                <h1>{error?.message}</h1>
                            </div>
                        }
                        {
                            isLoading &&
                            <tbody className=" relative">
                                {demoSubjects?.map((subject, index) => (
                                    <tr
                                        key={index}
                                        className="border-b m-4 relative border-slate-700 hover:bg-slate-700/40 transition"
                                    >
                                        <td className="p-4">
                                            <div className="w-full bg-slate-700 rounded-full h-3">
                                                <div
                                                    className="bg-slate-700 h-3 rounded-full"
                                                    style={{ width: 70 }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-400">

                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="w-full bg-slate-700 rounded-full h-3">
                                                <div
                                                    className="bg-slate-700 h-3 rounded-full"
                                                    style={{ width: 70 }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-400">

                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="w-full bg-slate-700 rounded-full h-3">
                                                <div
                                                    className="bg-slate-700 h-3 rounded-full"
                                                    style={{ width: 70 }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-400">

                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="w-full bg-slate-700 rounded-full h-3">
                                                <div
                                                    className="bg-slate-700 h-3 rounded-full"
                                                    style={{ width: 70 }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-400">

                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="w-full bg-slate-700 rounded-full h-3">
                                                <div
                                                    className="bg-slate-700 h-3 rounded-full"
                                                    style={{ width: 70 }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-400">

                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                        {
                            (isSuccess && data?.UserData && data?.UserData?.subjectList.length > 0) ?
                                <tbody className=" relative">
                                    {data?.UserData?.subjectList?.map((subject, index) => (
                                        <tr
                                            key={index}
                                            className="border-b m-4 relative border-slate-700 hover:bg-slate-700/40 transition"
                                        >
                                            <td className="p-4">

                                                <span className="text-sm text-gray-400">
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="p-4 sticky bg-slate-900 left-1">
                                                <span className="text-sm  text-green-400">
                                                    {subject?.SATSS_ID?.subjetId?.name}
                                                </span>
                                            </td>
                                            <td className="p-4">

                                                <span className="text-sm text-gray-400">
                                                    {subject?.SATSS_ID?.subjetId?.subjectCode}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <span className="text-sm text-gray-400">
                                                    {subject?.SATSS_ID?.teacherId?.name}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="w-full bg-slate-700 rounded-full h-3">
                                                    <div
                                                        className="bg-slate-700 h-3 rounded-full"
                                                        style={{ width: 70 }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-sm text-white">
                                                    {subject?.SATSS_ID?.subjetId?.type}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                :
                                <tbody className=" relative">
                                    {[1]?.map((subject, index) => (
                                        <tr
                                            key={index}
                                            className="border-b m-4 relative border-slate-700 hover:bg-slate-700/40 transition"
                                        >
                                            <td className="p-4">

                                                <span className="text-sm text-red-400">
                                                    {data?.message && "Subject not found"}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="w-full bg-slate-700 rounded-full h-3">
                                                    <div
                                                        className="bg-slate-700 h-3 rounded-full"
                                                        style={{ width: 70 }}
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-400">

                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <div className="w-full bg-slate-700 rounded-full h-3">
                                                    <div
                                                        className="bg-slate-700 h-3 rounded-full"
                                                        style={{ width: 70 }}
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-400">

                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="w-full bg-slate-700 rounded-full h-3">
                                                    <div
                                                        className="bg-slate-700 h-3 rounded-full"
                                                        style={{ width: 70 }}
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-400">

                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="w-full bg-slate-700 rounded-full h-3">
                                                    <div
                                                        className="bg-slate-700 h-3 rounded-full"
                                                        style={{ width: 70 }}
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-400">

                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                        }
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
