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
                !errorFind.findError ? <div className="w-screen md:h-screen h-auto mb-12 md:mb-0 bg-gray-900 mt-[60px] p-6">
                    <div className="max-w-md mx-auto  bg-gray-900">

                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">G-Tools Collection</h1>
                            <p className="text-white text-sm mb-4">
                                Your Unified Campus Assistant
                            </p>
                            <p className="text-gray-200 text-xs">
                                Smart utilities that power every moment of your college journey
                            </p>
                        </div>


                        <div className=" rounded-2xl shadow-lg p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 overflow-hidden bg-blue-100 rounded-full flex items-center justify-center">
                                        <img src='../../../insurance_2545838.png' className='w-full h-full object-cover bg-center' alt='verify' />
                                    </div>
                                    <div className='flex justify-center items-center gap-3'>
                                        <p className="text-lg font-semibold text-gray-500 font-sans">Welcome back ,</p>
                                        <h2 className="text-lg font-semibold text-gray-200 font-sans">{student ? student : "please check first profile to fetch"}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-center">
                                <p className="text-white text-sm font-medium">
                                    Let's make today <span className="text-yellow-300">1%</span> better
                                </p>
                            </div>
                        </div>

                        {/* Tools Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {tools.map((tool, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (tool.redirect) {
                                            startTransition(() => {
                                                navi("/app/chat");
                                            })
                                        }
                                    }}
                                    className={`${tool.color} transform hover:scale-90  rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center space-y-3 hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
                                >
                                    <div className={`${tool.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                                        {tool.icon}
                                    </div>
                                    <span className="text-sm font-medium text-white text-center">
                                        {tool.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> : <MessageAlert type={"warning"} message="service unavailable for logout user" onClose={true} />
            }
            <ToastContainer />
        </>

    );
};

export default GTools;