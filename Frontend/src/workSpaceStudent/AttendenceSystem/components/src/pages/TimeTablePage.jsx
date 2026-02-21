import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import API from '../../../ApiEndPoints/api.js';
import { useSelector } from "react-redux";
import MessageAlert from '../../../../../Components/ErrorPages/ErrorMessagePage.jsx';
import { useNavigate } from "react-router-dom";
import EmptySubjectsState from '../../../../../Components/ErrorPages/SomethingEmpty.jsx';
import GemnaTimetablePromo from '../ui/AdsOne.jsx';

export default function UserSubjectsTable() {
    const api = new API(import.meta.env.VITE_APP_BACKEND_URL);
    const attendanceSlice = useSelector(state => state?.AttendanceSlice?.AttendanceInfo);
    const navi = useNavigate();
    const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THUSDAY", "FRIDAY", "SATURDAY"];
    const periods = [1, 2, 3, 4, 5, 6, 7];
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [timeTable, setTimeTable] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])


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


    const localRef = useRef(false);

    if (isSuccess && !localRef.current) {
        const map = new Map();
        if (data?.UserData?.subjectCollections.length > 0) {
            data?.UserData?.subjectCollections?.forEach((item) => {
                map.set(`${item?.weekDay}${item?.nth_Periode}`, {
                    SATSS_ID: item?.SATSS_ID,
                    nth_Periode: item?.nth_Periode,
                    save: true,
                    priority: item?.priority,
                    weekDay: item?.weekDay
                })
            });
            setTimeTable([...map]);
        } else {
            setTimeTable([]);
        }

        localRef.current = true;
    }

    const AddnewSchedule = (day, index) => {
        // { subjectId: sub?._id }
        if (!(selectedSubject && selectedSubject?.subjectId)) {
            alert(`First be select the subject , show in left side or upper side`);
            return;
        }
        //  id: item?.SATSS_ID,
        // order: item?.nth_Periode,
        // save: true
        const findSubjectInformation = data?.UserData?.subjectList.find(item => item._id == selectedSubject?.subjectId)
        if (!findSubjectInformation) {
            return alert("subject information are not found, refresh it.....");
        }
        setTimeTable((map) => {
            return [...map, [`${day}${index}`, {
                SATSS_ID: selectedSubject?.subjectId,
                nth_Periode: index,
                save: false,
                priority: findSubjectInformation?.SATSS_ID?.priority,
                weekDay: day
            }]]
        });
    }

    const resetHandler = () => {
        const map = new Map();
        if (data?.UserData?.subjectCollections.length > 0) {
            data?.UserData?.subjectCollections?.forEach((item) => {
                map.set(`${item?.weekDay}${item?.nth_Periode}`, {
                    SATSS_ID: item?.SATSS_ID,
                    nth_Periode: item?.nth_Periode,
                    save: true,
                    priority: item?.priority,
                    weekDay: item?.weekDay
                })
            });
            setTimeTable([...map]);
        } else {
            setTimeTable([]);
        }
    }

    const newEntryHandler = () => {
        const arrayOf = [...new Map([...timeTable])];
        let obj = Object.fromEntries(arrayOf)
        obj = Object.values(obj);

        console.log("data +++++++++++++++++++++++", obj);
    }

    return (
        <>
            <GemnaTimetablePromo />

            <br />
            {/* <hr /> */}
            {
                isLoading &&
                <MessageAlert type="success" message="loading..." onClose={false} />
            }
            {
                isError &&
                <MessageAlert type="error" message={error?.message || 'something was wrong..'} onClose={false} />

            }
            {
                ((isSuccess && data?.UserData?.subjectList.length <= 0) || (isSuccess && !data?.success)) &&
                <div className="min-h-fit bg-slate-900 flex items-center justify-center py-6">
                    <div className="max-w-xl w-full text-center">
                        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-10 shadow-2xl">
                            <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-8 h-8 text-slate-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m6-6H6"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-semibold text-white mb-3">
                                No Subjects Linked Yet
                            </h2>

                            <p className="text-slate-400 mb-8 leading-relaxed">
                                You haven’t linked any subjects to this student. Link subjects to
                                enable timetable creation, attendance tracking, and performance
                                insights.
                            </p>

                            <button
                                onClick={() => {
                                    navi('/app/attendence/subject/link');
                                }}
                                className="w-full bg-white text-slate-900 font-medium py-3 rounded-xl hover:bg-slate-200 transition"
                            >
                                Link Subjects
                            </button>
                        </div>

                        <p className="text-slate-500 text-sm mt-6">
                            Once subjects are linked, the student timetable and attendance will
                            appear here automatically.
                        </p>
                    </div>
                </div>
            }
            {
                (isSuccess && data?.UserData?.subjectList.length > 0) &&
                <div className="w-full h-fit bg-indigo-600/10 flex flex-row items-center 
                justify-center overflow-x-scroll scrollbar-none mb-2 flex-wrap py-2 space-y-1">
                    {
                        [1].map((subject, index) => <h2 key={index} className="md:w-[20%] w-[40%] h-[90%] ml-2 mr-1 ring-1 ring-blue 
                        text-center flex justify-center items-center">
                            {"Collection of Subjects Code =>"}{data?.UserData?.subjectList.length}</h2>)
                    }
                    {
                        data?.UserData?.subjectList?.map((subject, index) => <h2 key={index} className="md:w-[20%] w-[40%] h-[90%] ml-2 mr-1 ring-1 ring-blue 
                        text-center flex justify-center items-center">
                            {subject?.SATSS_ID?.subjetId?.subjectCode}</h2>)
                    }
                </div>
            }{
                (data?.UserData?.subjectCollections.length === 0) &&
                <div className="h-fit w-full flex justify-center items-center">
                    <EmptySubjectsState subjects={[]} message={'No time table found'} submessage={"Gemna@bit Attendance log"} />
                </div>
            }


            {
                (data?.UserData?.subjectList.length > 0) &&
                <div className="min-h-screen  w-full flex md:flex-row justify-center gap-6 flex-col bg-slate-900 text-white md:p-0 mb-4">
                    <br />

                    <div className="bg-black backdrop-blur border border-slate-700 rounded-3xl p-5 shadow-xl h-fit md:w-[28%] w-full">
                        <h2 className="text-xl font-semibold mb-5 tracking-wide">Linked Subjects</h2>

                        <div className="space-y-3 h-[500px] overflow-y-scroll scrollbar-none">
                            {data?.UserData?.subjectList.map((sub) => (
                                <div
                                    key={sub?._id}
                                    onClick={() => setSelectedSubject({ subjectId: sub?._id })}
                                    className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200
                        ${selectedSubject?.subjectId === sub._id
                                            ? "bg-indigo-600/90 border-indigo-500 shadow-lg scale-[0.9]"
                                            : "bg-slate-700/70 border-slate-600 hover:bg-slate-700 hover:border-slate-500"
                                        }`}
                                >
                                    <p className="font-semibold text-base">
                                        {sub?.SATSS_ID?.subjetId.shortName}
                                    </p>

                                    <p className="text-xs text-slate-300 mt-1">
                                        {sub?.SATSS_ID?.subjetId.name}
                                    </p>

                                    <p className="text-xs mt-2 text-slate-400">
                                        {sub?.SATSS_ID?.subjetId.type} • {sub.SATSS_ID.subjetId?.weeklyFrequency}/week
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-black backdrop-blur border border-slate-700 rounded-3xl p-6 shadow-xl overflow-x-auto md:w-[62%] w-full">
                        <h2 className="w-full h-fit flex justify-between flex-row items-center">
                            <span className="text-2xl font-semibold md:w-fit w-60 rounded-md bg-indigo-500/30 py-1 px-3 ring-1 ring-blue-500 truncate mb-6 tracking-wide">

                                Build Your Weekly Timetable
                            </span>
                            <span className="flex justify-center items-center gap-x-3">
                                <span className="ring-1 cursor-pointer active:bg-indigo-600 ring-blue-600 py-2 px-5 text-center rounded-md bg-indigo-600/30"
                                    onClick={resetHandler}
                                >Reset..</span>
                                <span className="ring-1 cursor-pointer active:bg-indigo-600 ring-blue-600 py-2 px-5 text-center rounded-md bg-indigo-600/30"
                                    onClick={() => newEntryHandler()}
                                >Upload..

                                </span>
                            </span>

                        </h2>

                        <div className="min-w-[900px]">
                            <table className="w-full border-separate border-spacing-y-2">
                                <thead>
                                    <tr>
                                        <th className="text-left p-3 text-slate-400 font-medium">Day / Period</th>
                                        {periods.map((p) => (
                                            <th key={p} className="p-3 text-slate-400 font-medium">P{p}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {days.map((day) => (
                                        <tr key={day} className="h-20 md:h-24 relative">

                                            <td className="p-3 font-semibold sticky left-0 bg-slate-800/70 md:bg-transparent w-12 md:w-fit text-wrap">
                                                {day}
                                            </td>

                                            {periods.map((period, index) => {

                                                let findSubject = null;

                                                if (timeTable.length > 0) {
                                                    const localMap = new Map([...timeTable]);
                                                    const nameJJJ = day + (index + 1);
                                                    const dataSubjectSchedule = localMap.get(`${nameJJJ}`);
                                                    if (dataSubjectSchedule) {
                                                        findSubject = data?.UserData?.subjectList.
                                                            find(sub => sub?._id == dataSubjectSchedule?.SATSS_ID);

                                                        findSubject.save = dataSubjectSchedule.save;
                                                    }
                                                }

                                                return (
                                                    <td
                                                        onClick={() => AddnewSchedule(day, index + 1)}
                                                        key={index} className="px-2" title={`${findSubject?.SATSS_ID?.subjetId.name || "UNKNOWN"}`}>
                                                        <div className={`h-16 md:h-20 rounded-xl border border-slate-600 
                                            bg-slate-700/60 hover:bg-slate-700 transition-all duration-200 
                                            flex items-center justify-center text-center cursor-pointer `}>

                                                            {
                                                                findSubject
                                                                    ? <span className={`font-semibold text-sm md:text-base ${findSubject.save && "text-green-600 font-bold"}`}>
                                                                        {findSubject?.SATSS_ID?.subjetId.shortName}
                                                                    </span>
                                                                    : <span
                                                                        className="text-slate-500 text-sm">
                                                                        Assign
                                                                    </span>
                                                            }

                                                        </div>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 text-sm text-slate-400">
                            Tip: Select a subject from left and click any slot to assign or modify timetable.
                        </div>
                    </div>
                </div>
            }
        </>
    );
}


