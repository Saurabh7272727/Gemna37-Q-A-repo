import React, { useEffect, useState } from 'react'
import Error404 from '../../../Components/ErrorPages/Error404.jsx';
import {
    FaSearch, FaUserCircle, FaPaperPlane
} from 'react-icons/fa';
import { GoVerified } from "react-icons/go";
import { useSelector } from 'react-redux';
import { FiUserPlus } from "react-icons/fi";
import { SiGooglegemini } from "react-icons/si";
const G_chatApp = ({ renderPart, users }) => {


    if (!renderPart) {
        localStorage.clear();
        return (
            <>
                <Error404 />
            </>
        )
    }


    const studentProfile = useSelector((state) => state?.userinfoSlice?.user)
    const [activeChats, setActiveChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");

    // Simulate loading skeleton
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleUserClick = (user) => {
        const alreadyOpen = activeChats.find((u) => u.id === user.id);
        if (alreadyOpen) return setSelectedChat(user);
        if (activeChats.length >= 3) {
            const updated = [...activeChats.slice(1), user];
            setActiveChats(updated);
        } else {
            setActiveChats((prev) => [...prev, user]);
        }
        setSelectedChat(user);
    };

    const handleSend = () => {
        if (!message.trim()) return;
        console.log("Sent:", message);
        setMessage("");
    };

    return (
        <>

            <div className='w-full h-full  bg-gray-900'>
                <div className="w-full h-full bg-gray-900 text-white flex flex-row">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 w-full border-r border-white/20 p-4">
                        <h1 className="md:text-2xl text-[13px] font-bold mb-4 flex items-center h-[20px] gap-2 ">
                            <GoVerified className="text-green-400 text-2xl" />
                            <span>{`${studentProfile?.ref_id?.firstName} ${studentProfile?.ref_id?.lastName}`}</span>
                            <span className='md:text-[16px] text-[12px] text-gray-500'>{`Roll no ${studentProfile?.ref_id?.rollNumber}`}</span>
                        </h1>
                        <div className="relative mb-4">
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search friends..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        {/* User List */}
                        <div className="space-y-2 overflow-y-auto h-[65vh] pr-1 scrollbar-thin scrollbar-thumb-white/20">
                            {loading
                                ? Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div
                                            key={i}
                                            className="animate-pulse flex items-center space-x-3 bg-white/5 rounded-xl p-3"
                                        >
                                            <div className="w-10 h-10 bg-gray-500/30 rounded-full" />
                                            <div className="flex-1">
                                                <div className="h-3 bg-gray-500/30 rounded w-2/3 mb-1" />
                                                <div className="h-2 bg-gray-500/30 rounded w-1/3" />
                                            </div>
                                        </div>
                                    ))
                                : users.map((user) => (
                                    <div
                                        key={user.id}
                                        onClick={() => handleUserClick(user)}
                                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition"
                                    >
                                        <FaUserCircle className="text-3xl text-gray-300" />
                                        <div>
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-sm text-gray-400">
                                                {user.status || "offline"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </aside>

                    <div

                        className='md:hidden flex justify-center items-center text-3xl border border-4 border-blue-500  w-[56px] h-[56px] rounded-full fixed top-[79%] right-[7%]'>
                        <SiGooglegemini />
                    </div>

                    <div className='md:w-[60px] w-[30px] text-white hidden md:flex justify-center pt-[100px] bg-gray-800 h-full ring-2/0.5 ring-gray-200'>
                        <FiUserPlus />
                    </div>

                    {/* Chat Area */}
                    <main className="flex-1  flex-col hidden md:inline-block">
                        {/* Tabs */}
                        <div className="flex border-b border-white/20 p-2 overflow-x-auto scrollbar-none">
                            {activeChats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    className={`px-4 py-2 rounded-t-xl cursor-pointer transition font-medium ${selectedChat?.id === chat.id
                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg text-white"
                                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                                        }`}
                                >
                                    {chat.name}
                                </div>
                            ))}
                        </div>

                        {/* Chat Window */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white/5">
                            {selectedChat ? (
                                <>
                                    <div className="text-center text-gray-400 text-sm">
                                        Chatting with <span className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg font-semibold">{selectedChat.name}</span>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-white/10 p-3 rounded-xl text-sm">
                                            Hey! How’s your day?
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg text-sm">
                                            Pretty good! Just working on Gemna.AI 🚀
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    Select a friend to start chatting 💬
                                </div>
                            )}
                        </div>

                        {/* Message Input */}
                        {selectedChat && (
                            <div className="p-3 flex items-center bg-white/10 backdrop-blur-md">
                                <input
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2 rounded-full bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                                <button
                                    onClick={handleSend}
                                    className="ml-3 bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg transition p-3 rounded-full"
                                >
                                    <FaPaperPlane />
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>

    )

}

export default G_chatApp;