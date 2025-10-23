import React, { useEffect, useState } from 'react'
import Error404 from '../../../Components/ErrorPages/Error404.jsx';
import {
    FaSearch, FaPaperPlane
} from 'react-icons/fa';
import { GoVerified } from "react-icons/go";
import { useSelector, useDispatch } from 'react-redux';
import { SiGooglegemini } from "react-icons/si";
import MobileActionList from './component_apps/GChatTools.jsx';
import ShowConnectedFri from './component_apps/ShowConnectedFri.jsx';
import ApiEndPoints from '../../../ReduxStore/apiEndPoints/apiEndPoints.js';
import { addActiveUserList } from '../../../ReduxStore/Slices/ListSliceOfStudents.js';
import { useNavigate } from 'react-router-dom';
const G_chatApp = ({ renderPart }) => {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const ActiveUserList = useSelector(state => state?.ListSliceOdfStudent?.ActiveUserList);
    const OnlineUserList = useSelector(state => state?.ListSliceOdfStudent?.OnlineUserList);
    const ConnectedUserList = useSelector(state => state?.ListSliceOdfStudent?.ConnectedUserList);
    const studentProfile = useSelector((state) => state?.userinfoSlice?.user)
    const [activeChats, setActiveChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [test, setTest] = useState(false);
    const [mobileListShow, setMobileListShow] = useState(false);
    const [users, setUsers] = useState([]);

    // if any error;
    if (!renderPart) {
        localStorage.clear();
        return (
            <>
                <Error404 />
            </>
        )
    }


    const handleUserClick = (user) => {
        const alreadyOpen = activeChats.find((u) => u._id === user._id);
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


    useEffect(() => {
        try {
            setTest(true);
            setUsers(ConnectedUserList);
            let result = null
            const fecthAsync = async () => {
                const api = new ApiEndPoints();
                result = await api.fetchAllActiveUser('/api/v1/students');
            }
            fecthAsync().then(() => {
                if (result.success) {
                    dispatch(addActiveUserList([...result.data]))
                    setUsers(ConnectedUserList);
                    setTest(false);
                } else {
                    throw new Error("Something was wrong")
                }
            });
        } catch (error) {
            localStorage.clear();
            navi('/error_page');
        }

        return () => {
            setUsers(null);
        }

    }, [])

    const setMobileActionList = (type) => {
        switch (type) {
            case "Add Active Student":
                setUsers(ActiveUserList);
                setMobileListShow(false)
                break;
            case "Online Student":
                setUsers(OnlineUserList);
                setMobileListShow(false)
                break;
            default:
                setUsers(ConnectedUserList);
                setMobileListShow(false);
                break;
        }
    };

    return (
        <>
            {
                test ? <div>Loading...</div> :
                    <div className='w-full h-full  bg-gray-900 relative'>
                        <div className="w-full h-full bg-gray-900 text-white flex flex-row">
                            <aside className="lg:w-1/4 w-full border-r border-white/20 p-4">
                                <h1 className="md:text-2xl text-[13px] font-bold mb-4 flex items-center h-[20px] gap-2 ">
                                    <GoVerified className="text-green-400 text-2xl" />
                                    <span>{`${studentProfile?.ref_id?.firstName} ${studentProfile?.ref_id?.lastName}`}</span>
                                    <span className='md:text-[16px] text-[12px] text-gray-500'>{`Roll no ${studentProfile?.ref_id?.rollNumber}`}</span>
                                </h1>
                                <div className='w-full md:h-[5%] h-[7%] my-2 rounded-md flex justify-start items-center gap-x-[4%]'>
                                    <div
                                        onClick={() => { setUsers(ConnectedUserList); }}
                                        className='md:w-[20%] w-[30%] h-[80%] border-2 border-gray-500 border-dotted rounded-md content-center text-center
                             text-gray-300 hover:bg-gray-600 hover:border-solid cursor-pointer active:bg-gray-400 font-normal'>Chat</div>
                                    <div
                                        onClick={() => { alert("Not available for you, under development") }}
                                        className='md:w-[20%] w-[30%] h-[80%] border-2 border-gray-500 border-dotted rounded-md content-center text-center
                             text-gray-300 hover:bg-gray-600 hover:border-solid cursor-pointer active:bg-gray-400 font-normal'>Guild</div>
                                </div>
                                <div className="relative mb-4">
                                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search friends..."
                                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    />
                                </div>

                                <ShowConnectedFri
                                    users={users}
                                    handleUserClick={handleUserClick}
                                    setLoading={setLoading}
                                    loading={loading}
                                />
                            </aside>
                            {
                                mobileListShow && <div className={`md:hidden flex w-full h-[90%] bg-gray-900/90 absolute bottom-1 right-0 transition duration-700`}>
                                    <MobileActionList setMobileActionList={setMobileActionList} />
                                </div>
                            }

                            <div
                                onClick={() => {
                                    setMobileListShow(!mobileListShow);
                                }}
                                className={`md:hidden flex justify-center items-center text-3xl  border-4  ${mobileListShow ? "border-red-500" : "border-blue-500"}  w-[56px] h-[56px] rounded-full fixed top-[79%] right-[7%]`}>
                                <SiGooglegemini />
                            </div>

                            <div className='md:w-[200px] w-[30px] text-white hidden md:flex justify-center pt-[100px] bg-gray-800 h-full'>
                                <MobileActionList setMobileActionList={setMobileActionList} />
                            </div>

                            <main className="flex-1 md:flex flex-col hidden">

                                <div className="flex border-b border-white/20 p-2 gap-x-4 overflow-x-auto scrollbar-none">
                                    {activeChats.map((chat) => (
                                        <div
                                            key={chat._id}
                                            onClick={() => setSelectedChat(chat)}
                                            className={`px-4 py-2 rounded-t-xl cursor-pointer transition font-medium ${selectedChat?.id === chat.id
                                                ? "bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg text-white"
                                                : "bg-white/10 text-gray-300 hover:bg-white/20"
                                                }`}
                                        >
                                            {chat.firstName}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white/5">
                                    {selectedChat ? (
                                        <>
                                            <div className="text-center text-gray-400 text-sm">
                                                Chatting with<span className="p-2 rounded-lg font-semibold">{selectedChat.firstName} {selectedChat.lastName}</span>
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
                                            className="ml-3 bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg transition"
                                        >
                                            <FaPaperPlane />
                                        </button>
                                    </div>
                                )}
                            </main>
                        </div>
                    </div>

            }


        </>

    )

}

export default G_chatApp;