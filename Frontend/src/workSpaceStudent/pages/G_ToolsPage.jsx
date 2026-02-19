import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendarCheck, FaRocketchat, FaVideo, FaBook, FaTrello } from 'react-icons/fa';
import { SiChatwoot } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ApiEndPoints from "../../ReduxStore/apiEndPoints/apiEndPoints.js"
import { decryptData } from '../../Auth/Encryption/jsondataEncryption.js';
import MessageAlert from '../../Components/ErrorPages/ErrorMessagePage.jsx';
import { loadUserInformation } from '../../ReduxStore/Slices/UserInfoSlice.js';
// import { clearTheList } from '../../ReduxStore/Slices/ListSliceOfStudents.js' // clean-up the active users
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { startTransition } from "react";




const GTools = () => {
    const navi = useNavigate();
    const student = useSelector(state => state?.userinfoSlice?.user?.ref_id?.firstName);
    const demoProfile = useSelector(state => state?.userinfoSlice?.user);
    const loginUserVar = useSelector(state => state?.accessSlice?.login);
    const tools = [
        {
            name: 'Attendance bit',
            icon: <FaCalendarCheck className="text-2xl" />,
            color: 'bg-blue-400',
            redirect: "/app/attendence"
        },
        {
            name: 'G-Post',
            icon: <FaRocketchat className="text-2xl" />,
            color: 'bg-green-400'
        },
        {
            name: 'G-Live',
            icon: <FaVideo className="text-2xl" />,
            color: 'bg-purple-400'
        },
        {
            name: 'G-Study',
            icon: <FaBook className="text-2xl" />,
            color: 'bg-yellow-400'
        },
        {
            name: 'G-Chat',
            icon: <SiChatwoot className="text-2xl" />,
            color: 'bg-purple-400',
            redirect: "/app/chat"
        },
        {
            name: 'G-Jira',
            icon: <FaTrello className="text-2xl" />,
            color: 'bg-red-400'
        }
    ];
    const dispatch = useDispatch();
    const data = useParams();
    const [errorFind, setErrorFind] = useState({
        findError: false,
        message: " ",
        type: " "
    })
    const [loading, setLoading] = useState(false);
    const jwt_token = localStorage.getItem("jwt_token");
    if (jwt_token) {
        var token = decryptData(jwt_token);
    }

    useEffect(() => {
        if (!jwt_token) {
            navi("/error_page");
        } else {
            if (jwt_token === data['*']) {
                const fetchData = async () => {
                    try {
                        const api = new ApiEndPoints();
                        const data = await api.fetchUserProfile('student/account/access', token.jwt_token);
                        const { message, success } = data;
                        if (!success) {
                            setErrorFind({
                                findError: true,
                                message,
                                type: "error"
                            });
                            return;
                        }
                        dispatch(loadUserInformation(data.data));
                        return;
                    } catch (error) {
                        navi("/error_page");
                    }
                }

                setLoading(true);
                if (!demoProfile.email) {
                    fetchData();
                }
                setLoading(false);
            } else {
                setErrorFind({
                    findError: true,
                    message: "Url log are change , please re-login again",
                    type: "warning"
                })
            }
        }
        return () => {
            Cookies.remove("ErrorMessage");
            Cookies.remove("GASID");
        }
    }, []);


    if (!loading) {
        <div>Loading....</div>
    }

    if (!loginUserVar) {
        return (
            <MessageAlert type={"error"} message={"Your trying to reach unauthenticated path ,that are resistricted"} onClose={true} />
        )
    }


    return (
        <>
            {
                errorFind.findError && <MessageAlert type={errorFind.type} message={errorFind.message} onClose={true} />
            }
            {
                !errorFind.findError ? <div className="w-full min-h-screen bg-slate-950 pt-[100px] md:p-0 p-8">
                    <div className="max-w-6xl mx-auto">

                        {/* HERO HEADER */}
                        <div className="text-center flex justify-center items-center flex-col">
                            <h1 className="text-3xl pt-4 md:text-4xl font-bold text-white tracking-tight">
                                G-Tools Collection
                            </h1>

                            <p className="text-slate-300 text-sm md:text-base mt-2">
                                Your Unified Campus Assistant powered by Gemna
                            </p>

                            <p className="text-slate-500 text-xs mt-2 max-w-lg mx-auto">
                                Attendance, academics, productivity and campus tools — everything in one intelligent ecosystem.
                            </p>
                        </div>


                        {/* USER CARD */}
                        <div className="mt-6 bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl shadow-lg">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 overflow-hidden bg-indigo-500/20 rounded-full flex items-center justify-center">
                                        <img
                                            src='../../../insurance_2545838.png'
                                            className='w-full h-full object-cover'
                                            alt='verify'
                                        />
                                    </div>

                                    <div className='flex flex-wrap items-center gap-2'>
                                        <p className="text-sm text-slate-400">Welcome back</p>
                                        <h2 className="text-sm md:text-base font-semibold text-white">
                                            {student ? student : "please check first profile to fetch"}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-center text-white text-sm py-3 rounded-b-2xl">
                                Let’s make today <span className="text-yellow-300 font-semibold">1%</span> better
                            </div>
                        </div>


                        {/* STARTUP VALUE STRIP */}
                        <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">

                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl py-4">
                                <p className="text-white text-sm font-semibold">Attendance Automation</p>
                                <p className="text-slate-500 text-xs mt-1">
                                    Directly integrated with daily academic workflow
                                </p>
                            </div>

                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl py-4">
                                <p className="text-white text-sm font-semibold">Smart Planning Tools</p>
                                <p className="text-slate-500 text-xs mt-1">
                                    Timetable, reminders and subject organization
                                </p>
                            </div>

                            <div className="bg-slate-900/70 border border-slate-800 rounded-xl py-4">
                                <p className="text-white text-sm font-semibold">Gemna Ecosystem</p>
                                <p className="text-slate-500 text-xs mt-1">
                                    bit@latest campus productivity platform
                                </p>
                            </div>

                        </div>


                        {/* TOOLS GRID */}
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {tools.map((tool, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (tool.redirect) {
                                            startTransition(() => {
                                                navi(`${tool.redirect}`);
                                            })
                                        }
                                    }}
                                    className={`${tool.color} bg-slate-900/60 border border-slate-800 rounded-2xl 
                    flex flex-col items-center justify-center py-7
                    hover:bg-slate-800 hover:border-slate-600
                    hover:shadow-[0_0_0_1px_rgba(99,102,241,0.4)]
                    transition-all duration-200 cursor-pointer`}
                                >
                                    <div className={`${tool.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                                        {tool.icon}
                                    </div>

                                    <span className="text-sm font-medium text-white text-center mt-3">
                                        {tool.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                    : <MessageAlert type={"warning"} message="service unavailable for logout user" onClose={true} />
            }
            <ToastContainer />
        </>

    );
};

export default GTools;