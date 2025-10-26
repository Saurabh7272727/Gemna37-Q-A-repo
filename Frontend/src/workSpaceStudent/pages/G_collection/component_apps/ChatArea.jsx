import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import MessageAlert from '../../../../Components/ErrorPages/ErrorMessagePage.jsx';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import {
    FiPaperclip,
    FiImage,
    FiSend,
    FiPhone,
    FiVideo,
    FiMoreVertical
} from 'react-icons/fi';


const ChatArea = ({ idByProps, renderPart }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const { id } = useParams();
    const UserId = id || idByProps;
    const navi = useNavigate();
    const Data = useSelector((state) => state?.ListSliceOdfStudent?.ActiveUserList);
    const onlineStudent = useSelector((state) => state?.ListSliceOdfStudent?.OnlineUserList);
    const currentStudent = useSelector((state) => state?.userinfoSlice?.user);

    const ref = useRef()

    const [state, setState] = useState({
        data: "",
        error: "",
        loading: true
    });

    const [inputState, setInputState] = useState({
        message: ""
    });

    useEffect(() => {
        if (!isMobile) {
            navi(`/app/chat`);
        }
        if (UserId) {
            if (ref.current) {
                ref.current.focus();
            }

            if (Data.length > 0) {
                const findUserById = Data?.find((user) => {
                    if (user?._id === UserId) {
                        return user;
                    }
                })

                if (findUserById) {
                    const findStatus = onlineStudent.find((em) => {
                        if (em?._id === findUserById?._id) {
                            return em;
                        }
                    });

                    if (findStatus) {
                        // console.log('online user -----', findStatus);
                        setState((sau) => {
                            return { ...sau, loading: false, data: findStatus }
                        })
                    } else {
                        setState((sau) => {
                            return { ...sau, loading: false, data: findUserById }
                        })
                    }
                } else {
                    setState((sau) => {
                        return { ...sau, error: `User not found by ID -${UserId}`, loading: false }
                    })
                }
            } else {
                setState((sau) => {
                    return { ...sau, error: `User not found by ID -${UserId}`, loading: false }
                })
            }
        }
    }, [UserId, onlineStudent.length]);

    if (!UserId || !renderPart) {
        return (
            <>
                <MessageAlert type={"warning"} message={"UnAuthorized access by user"} onClose={true} />
            </>
        )
    }

    if (state?.error) {
        return (
            <>
                <MessageAlert type={"warning"} message={`User not Found by ID - 58`} onClose={true} />
            </>
        )
    }

    const inputHandler = (e) => {
        const { name, value } = e.target;
        const copy = { ...inputState };
        copy[name] = value;
        setInputState(copy);
    }

    const sendHandler = () => {
        if (!state?.data?.socketId) {
            return alert("user are offline , and do not send any message");
        }

        if (inputState.message && state.data.socketId) {
            const payload = {
                senderId: currentStudent?.ref_id?._id,
                receiverId: state?.data?._id,
                messaage: inputState.message,
                timestamp: new Date(),
                socketId: state.data.socketId
            }

            console.log("text send---", payload);
        } else {
            alert("type your message")
        }
    }

    return (
        <>
            {
                state?.loading ? <div>Loading....</div> :
                    <div className='text-white w-full h-full'>
                        <div className="flex flex-col h-full bg-gray-900">
                            {/* Header - Responsive */}
                            <div className="border-b border-gray-700 px-4 py-3 sm:px-6 sm:py-4">
                                <div className="flex items-center justify-between">
                                    {/* User Info */}
                                    <div className="flex items-center space-x-3 sm:space-x-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-blue-500">
                                            {state?.data?.imageURL ?
                                                <img
                                                    className='h-full w-full rounded-full object-cover'
                                                    src={state?.data?.imageURL}
                                                    alt="profile"
                                                /> :
                                                <span className="text-white text-sm sm:text-base font-medium">
                                                    {state?.data?.firstName?.charAt(0)}
                                                </span>
                                            }
                                        </div>
                                        <div className="max-w-[140px] sm:max-w-none">
                                            <h2 className="text-base sm:text-lg font-semibold text-white truncate">
                                                {state?.data?.firstName} {state?.data?.lastName}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-gray-300 font-medium flex items-center mt-1">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                                                <span className="truncate">College ID: {state?.data?.collegeID}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {
                                        state?.data.socketId ? <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-sm">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></div>
                                            <span className="text-xs font-semibold text-white tracking-wide">ONLINE</span>
                                        </div> : <div className="inline-flex items-center md:px-3 px-1 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-sm">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></div>
                                            <span className="text-xs font-semibold text-white tracking-wide">OFFLINE</span>
                                        </div>
                                    }

                                    {/* Action Buttons */}
                                    <div className="flex items-center space-x-2 sm:space-x-4">
                                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                                            <FiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                                            <FiVideo className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors sm:block hidden">
                                            <FiMoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Messages Area - Responsive */}
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-900">
                                <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">

                                </div>
                            </div>

                            {/* Message Input - Responsive */}
                            <div className="border-t border-gray-700 px-4 py-3 sm:px-6 sm:py-4 bg-gray-800">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    {/* Attachment Buttons */}
                                    <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                                        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                                            <FiPaperclip className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                                            <FiImage className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                        </button>
                                    </div>

                                    {/* Message Input */}
                                    <div className="flex-1 min-w-0">
                                        <input
                                            onChange={(e) => inputHandler(e)}
                                            value={inputState?.message}
                                            name='message'
                                            type="text"
                                            required
                                            ref={ref}
                                            placeholder="Type a message..."
                                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-700 text-white placeholder-gray-400"
                                        />
                                    </div>

                                    {/* Send Button */}
                                    <button
                                        onClick={() => sendHandler()}
                                        className="p-2 sm:p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors shadow-sm flex-shrink-0">
                                        <FiSend className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default ChatArea;