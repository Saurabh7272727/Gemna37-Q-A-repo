import React from 'react';
import { FaUser, FaCalendarCheck, FaRocketchat, FaVideo, FaBook, FaTrello } from 'react-icons/fa';
import { SiChatwoot } from "react-icons/si";
import { useSelector } from 'react-redux';
const GTools = () => {
    const student = useSelector(state => state?.userinfoSlice?.user?.ref_id?.firstName);
    console.log(student)
    const tools = [
        {
            name: 'Attendance bit',
            icon: <FaCalendarCheck className="text-2xl" />,
            color: 'bg-blue-500'
        },
        {
            name: 'G-Post',
            icon: <FaRocketchat className="text-2xl" />,
            color: 'bg-green-500'
        },
        {
            name: 'G-Live',
            icon: <FaVideo className="text-2xl" />,
            color: 'bg-purple-500'
        },
        {
            name: 'G-Study',
            icon: <FaBook className="text-2xl" />,
            color: 'bg-yellow-500'
        },
        {
            name: 'G-Chat',
            icon: <SiChatwoot className="text-2xl" />,
            color: 'bg-purple-500'
        },
        {
            name: 'G-Jira',
            icon: <FaTrello className="text-2xl" />,
            color: 'bg-red-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br mt-[70px] from-blue-50 to-indigo-100 p-6">
            <div className="max-w-md mx-auto">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Gemna.ai G-Tools</h1>
                    <p className="text-gray-600 text-sm mb-4">
                        Your Unified Campus Assistant
                    </p>
                    <p className="text-gray-500 text-xs">
                        Smart utilities that power every moment of your college journey
                    </p>
                </div>


                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaUser className="text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Hi,</p>
                                <h2 className="text-lg font-semibold text-gray-800">{student ? student : "please check first profile to fetch"}</h2>
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
                            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center space-y-3 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <div className={`${tool.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                                {tool.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-700 text-center">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GTools;