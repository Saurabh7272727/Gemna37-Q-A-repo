import React, { useEffect, useState } from 'react'
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

    const [state, setState] = useState({
        data: "",
        error: "",
        loading: true
    })

    useEffect(() => {
        if (!isMobile) {
            navi(`/app/chat`);
        }


        if (UserId) {
            if (Data.length > 0) {
                const findUserById = Data?.find((user) => {
                    if (user?._id === UserId) {
                        return user;
                    }
                })

                if (findUserById) {
                    setState((sau) => {
                        return { ...sau, loading: false, data: findUserById }
                    })
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
    }, [UserId]);

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
                                    {/* Received Message */}
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs sm:text-sm font-medium">J</span>
                                        </div>
                                        <div className="bg-gray-800 rounded-2xl rounded-tl-none px-3 py-2 sm:px-4 sm:py-3 shadow-sm border border-gray-700 max-w-[85%] sm:max-w-xs">
                                            <p className="text-gray-200 text-sm">Hello! How can I help you today?</p>
                                            <span className="text-xs text-gray-400 mt-1 block">10:30 AM</span>
                                        </div>
                                    </div>

                                    {/* Sent Message */}
                                    <div className="flex items-start justify-end space-x-2 sm:space-x-3">
                                        <div className="bg-blue-500 rounded-2xl rounded-tr-none px-3 py-2 sm:px-4 sm:py-3 shadow-sm max-w-[85%] sm:max-w-xs">
                                            <p className="text-white text-sm">I need help with my project</p>
                                            <span className="text-xs text-blue-100 mt-1 block">10:31 AM</span>
                                        </div>
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs sm:text-sm font-medium">Y</span>
                                        </div>
                                    </div>

                                    {/* Received Message with File */}
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs sm:text-sm font-medium">J</span>
                                        </div>
                                        <div className="bg-gray-800 rounded-2xl rounded-tl-none px-3 py-2 sm:px-4 sm:py-3 shadow-sm border border-gray-700 max-w-[85%] sm:max-w-xs">
                                            <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-2 py-1 sm:px-3 sm:py-2">
                                                <FiPaperclip className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-gray-200 truncate">project_guide.pdf</p>
                                                    <p className="text-xs text-gray-400">2.4 MB</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400 mt-1 block">10:32 AM</span>
                                        </div>
                                    </div>
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
                                            type="text"
                                            placeholder="Type a message..."
                                            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-700 text-white placeholder-gray-400"
                                        />
                                    </div>

                                    {/* Send Button */}
                                    <button className="p-2 sm:p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors shadow-sm flex-shrink-0">
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