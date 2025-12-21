import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import MessageAlert from '../../../../Components/ErrorPages/ErrorMessagePage.jsx';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import {
    FiPaperclip,
    FiImage,
    FiSend,
    FiPhone,
    FiVideo,
    FiMoreVertical
} from 'react-icons/fi';
import socket from '../../../../socket_client/socket_client.js';
import ApiEndPoints from '../../../../ReduxStore/apiEndPoints/apiEndPoints.js';
import VirtualizedChat from './VirtualizedChat.jsx';
import { useQuery } from '@tanstack/react-query';
import NewMessagePopup from '../../../../Components/NewMessagePop.jsx';
import { setfirstMessagerSet, testPurpose } from '../../../../ReduxStore/Slices/ListSliceOfStudents.js';

const ChatArea = ({ idByProps = false, renderPart }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const { id } = useParams();
    const UserId = id || idByProps;
    const navi = useNavigate();
    const Data = useSelector((state) => state?.ListSliceOdfStudent?.ActiveUserList ?? []);
    const onlineStudent = useSelector((state) => state?.ListSliceOdfStudent?.OnlineUserList ?? []);
    const currentStudent = useSelector((state) => state?.userinfoSlice?.user);
    const connectedUser = useSelector((state) => state?.ListSliceOdfStudent?.ConnectedUserList ?? []);
    const dispatch = useDispatch();
    const ref = useRef()

    const [state, setState] = useState({
        data: "",
        error: "",
    });
    const [testID, setTestID] = useState("");
    const [inputState, setInputState] = useState({
        message: ""
    });
    const [messages, setMessages] = useState([]);

    const [pop_up_message, setPop_up_message] = useState({});

    useEffect(() => {

        if (!isMobile) {
            navi(`/app/chat`);
        }
        if (UserId) {
            if (ref.current) {
                ref.current.focus();
            }

            if (Data.length > 0) {
                const findUserById = Data?.find((user) => user?._id === UserId);

                if (findUserById) {
                    const findStatus = onlineStudent.find((em) => em?._id === findUserById?._id);

                    if (findStatus) {
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
    }, [UserId, onlineStudent.length, idByProps, Data, isMobile, navi]);

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
        setInputState(prev => ({ ...prev, [name]: value }));
    }

    const getSingleMessage = async () => {
        const findPayload = connectedUser.find((item) => item.email === state.data.email);
        try {
            if (findPayload) {
                const api = new ApiEndPoints();
                const result = await api.fetchAllConnectionMessage(`/api/v1/students/connection/${findPayload.chatID}`);

                if (result?.success) {
                    setTestID(result.id);
                    setMessages(result.data);
                    return result.data;
                } else {
                    localStorage.clear();
                    navi(-1);
                    throw new Error('Failed to fetch messages');
                }
            } else {
                setMessages([]);
                console.log("147 chatArea - waiting....")
                return [];
            }
        } catch (error) {
            console.log("152 chatArea  ", error)
            navi('/error_page');
        }
    }

    const query = useQuery({
        queryKey: ['singleMessage', UserId],
        queryFn: getSingleMessage,
        enabled: false,
        gcTime: 5 * 60 * 1000,
        staleTime: 1 * 60 * 1000
    });

    const { isLoading, isError, error, data, isSuccess } = query;

    useEffect(() => {
        if (state.data?.email) {
            query.refetch();
            return;
        } else {
            setMessages(data);
        }
    }, [state.data?.email]);

    const sendHandler = (e) => {
        e.stopPropagation()
        if (!state?.data?.socketId) {
            return alert("user are offline , and do not send any message");
        }

        if (inputState.message && state.data.socketId) {
            const payload = {
                senderId: currentStudent?.ref_id?._id,
                receiverId: state?.data?._id,
                message: inputState.message,
                socketId: state.data.socketId,
                index: messages.length,
                type: "text",
                r_email: state?.data?.email.trim()
            }
            // callback({ notify: "successfully send your message", index, 
            // message: savedataMessage, distination: `${senderId}/${receiverId}`, senderId, receiverId ;

            socket.emit("socket_send_payload", { ...payload }, (data) => {
                setInputState({ message: "" });
                if (data?.notify === "successfully send your message") {
                    setMessages((sau) => {
                        return [...sau, { ref_id: { ...data.message } }]
                    });
                } else if (data?.notify === "successfully send your message first time") {
                    setMessages((sau) => {
                        return [...sau, { ref_id: { ...data.message } }]
                    });
                    dispatch(testPurpose(data));
                } else {
                    alert("Something was wrong -  gemna no responed => ChatArea file");
                }
                ref.current.focus();
            });
        } else {
            alert("Empty payload don't be send")
        }
    }


    const compareID = (id) => {
        if (testID) {
            if (testID === id) {
                return true;
            } else {
                return false;
            }
        } else {
            return false
        }
    }


    useEffect(() => {
        const handleNewMessage = (data) => {
            if (data.distination === `${currentStudent?.ref_id?._id}/${currentStudent?.ref_id?._id}`) {
                dispatch(setfirstMessagerSet(currentStudent?.ref_id?._id))
                return;
            } else if (data.notify === "you receive new message" && compareID(data?.chatID)) {
                dispatch(setfirstMessagerSet(data?.senderId))
                setMessages((sau) => {
                    return [...sau, { ref_id: { ...data.message } }]
                })
            } else {
                console.log(`message ==================== ${data}`);
                setPop_up_message({ new_message_arrived: true });
                dispatch(setfirstMessagerSet(data));
                setMessages((sau) => {
                    return [...sau, { ref_id: { ...data.message } }]
                })
            }
        };

        socket.on("notification_new_message", handleNewMessage);
        return () => {
            socket.off("notification_new_message", handleNewMessage);
        };
    }, [currentStudent?.ref_id?._id, testID]);

    if (isLoading) {
        return (
            <div className='w-full h-full flex justify-center items-center text-white'>Loading....</div>
        );
    }


    if (isError) {
        return (
            <div className='w-full h-full flex justify-center flex-col-reverse items-center text-white'>
                <h1>Error - {String(error)}</h1><br />
                <p>Note : Message not found</p>
            </div>
        )
    }

    if (isSuccess) {
        return (
            <>
                <div className='text-white w-full h-full'>
                    <div className="flex flex-col h-full bg-gray-900 relative">

                        <div className="border-b z-50 bg-gray-900 md:w-[59%] w-auto border-gray-700 px-4 py-3 sm:px-6 sm:py-4 fixed top-[8%]">
                            <div className="flex items-center justify-between">

                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-blue-500" title={state?.data?.firstName}
                                    >
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
                                        {
                                            pop_up_message.new_message_arrived && <NewMessagePopup setPop_up_message={setPop_up_message} message={'new message! - JS37'} show={true} />
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
                                    state?.data.socketId ? <div className="inline-flex items-center md:px-3 px-2 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-sm">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></div>
                                        <span className="md:text-xs text-[8px] font-semibold text-white tracking-wide">ONLINE</span>
                                    </div> : <div className="inline-flex items-center md:px-3 px-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-sm">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></div>
                                        <span className="md:text-xs text-[8px] font-semibold text-white tracking-wide">OFFLINE</span>
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


                        <div className="md:h-[80%] flex justify-center items-center overflow-hidden h-[100%] bg-gray-900 transform translate-y-[22%] mb-[110px] md:mb-[120px]">
                            <VirtualizedChat
                                currentUserId={currentStudent?.ref_id?._id}
                                messages={messages}
                            />
                        </div>

                        <div className="border-t z-50 border-gray-700 px-4 py-3 sm:px-6 sm:py-4 bg-gray-800">
                            <div className="flex items-center space-x-3 sm:space-x-4">

                                <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                                    <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                                        <FiPaperclip className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                                        <FiImage className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                    </button>
                                </div>


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
                                <button
                                    onClick={(e) => sendHandler(e)}
                                    className="p-2 sm:p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors shadow-sm flex-shrink-0">
                                    <FiSend className="w-5 h-4 sm:w-5 sm:h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default ChatArea;
