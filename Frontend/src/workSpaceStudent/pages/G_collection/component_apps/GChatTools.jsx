import React from "react";
import { FaUserPlus, FaUsersCog, FaEnvelope, FaCogs } from "react-icons/fa";
import { FaGitlab } from "react-icons/fa";

const MobileActionList = () => {
    const actions = [
        { name: "Add Active Student", icon: <FaUserPlus className="text-blue-500" /> },
        { name: "Create Guild", icon: <FaGitlab className="text-pink-500" /> },
        { name: "Join Guild", icon: <FaUsersCog className="text-emerald-500" /> },
        { name: "Send Email", icon: <FaEnvelope className="text-purple-500" /> },
        { name: "Settings", icon: <FaCogs className="text-gray-400" /> },
    ];

    return (
        <div className="w-full h-full rounded-2xl shadow-lg border border-white/20 md:border-gray-800 overflow-hidden transition-all duration-300 flex">
            <ul className="flex flex-col p-2 space-y-1 text-[18px] md:text-[14px]">
                {actions.map((item, i) => (
                    <li
                        key={i}
                        className="flex border-5 border-black items-center gap-3 p-3 rounded-xl hover:bg-white/20 active:scale-95 transition cursor-pointer"
                    >
                        {item.icon}
                        <span className="text-white font-medium">{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MobileActionList;
