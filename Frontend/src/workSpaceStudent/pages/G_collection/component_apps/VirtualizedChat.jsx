import React, { useRef, useState, useEffect } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion } from "framer-motion";
import CodeIcon from '@mui/icons-material/Code';
import CodeShareCard from './ShowCodeInBlackBox.jsx';


const VirtualizedChat = ({ currentUserId, messages = [], showPopBoxDotted, popBox }) => {
    const parentRef = useRef(null);
    const messagesEndRef = useRef();
    const [detailsCot, setDetailsCot] = useState({ id: "" });
    const safeMessages = Array.isArray(messages) ? messages : [];
    const [showcodeblack, ShowCodeInBlackBox] = useState({ show: false, message: "", id: "" });



    // implement virtualization window => to optimize message cost on node creation;
    const rowVirtualizer = useVirtualizer({
        count: safeMessages.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 100,
        overscan: 4,
        measureElement: el => el.getBoundingClientRect().height
    });


    // to smooth scroll to end of the message stack
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [safeMessages.length]);


    // return date , month and year
    const timeGetter = (time) => {
        const timer = new Date(time);
        return `${timer.getDate()} /${timer.getMonth() + 1}/${timer.getFullYear()}`
    }

    // confine the day of message
    const WeekDay = (time) => {
        const timer = new Date(time);
        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturaday'];
        return `${week[timer.getDay()]}`;
    }

    if (safeMessages.length === 0) {
        return (
            <div className="h-full flex items-center justify-center pt-[10%] text-gray-500">
                <div className="text-center"> <div className="text-4xl mb-2">Gemna.ai G-Chat</div>
                    <p className="text-lg font-medium">No messages yet</p>
                    <p className="text-sm">Start a conversation!</p>
                </div>
            </div>
        )
    }


    return (
        <div
            ref={parentRef}
            onClick={() => {
                setDetailsCot({ id: "" });
                if (popBox)
                    showPopBoxDotted();
            }}
            className="h-full scrollbar-track-yellow-500 scrollbar-thin w-full overflow-y-auto bg-gray-900 md:pr-9 rounded-lg border border-gray-900 p-4"
        >
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}>
                {rowVirtualizer.getVirtualItems()?.map((virtualRow) => {
                    const msg = safeMessages[virtualRow.index];
                    const isCurrentUser = msg?.ref_id?.senderId === currentUserId;
                    return (
                        <>
                            <div
                                key={msg?._id || virtualRow.key}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                                className={`flex pb-3 mt-3 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                            >

                                {
                                    (showcodeblack.show && showcodeblack.message && showcodeblack.id === msg?.ref_id?._id) && <div
                                        className='md:w-[50%] w-full md:h-fit h-fit md:sticky mb-4 absolute top-[300px] block overflow-x-auto md:left-6 left-0'
                                    >
                                        <CodeShareCard code={showcodeblack.message} language={showcodeblack.type} ShowCodeInBlackBox={ShowCodeInBlackBox} />
                                    </div>
                                }

                                {
                                    (showcodeblack.show && showcodeblack.message && showcodeblack.id === msg?.ref_id?._id) && <div
                                        className='md:w-[50%] hidden h-fit sticky md:block top-1 overflow-x-auto left-6'
                                    >
                                        <div className='w-[10%]'></div>
                                    </div>
                                }
                                {
                                    (msg?.ref_id?.type === "Code" &&
                                        ['javascript', 'python', 'cpp', 'java', 'plaintext'].includes(msg?.ref_id?.language)
                                    ) ? <div
                                        className={`h-fit w-[65%] md:max-w-[60%] md:w-[35%] break-words overflow-wrap-anywhere rounded-2xl px-4 py-1 mb-3 ${isCurrentUser
                                            ? "bg-gray-800 text-white rounded-br-none"
                                            : "bg-gray-600 text-white rounded-bl-none"
                                            }`}


                                        onClick={() => {
                                            ShowCodeInBlackBox({
                                                show: true,
                                                message: msg?.ref_id?.message,
                                                id: msg?.ref_id?._id,
                                                type: msg?.ref_id?.language,
                                            });

                                        }}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 16, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            whileHover={{ scale: 1.03 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full sm:w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 cursor-pointer shadow-md hover:shadow-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">
                                                    <CodeIcon className='text-green-700 font-bold' />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-white">
                                                        {msg?.ref_id?.type + " " + "Shared"}
                                                    </span>
                                                    <span className="text-xs text-white capitalize  bg-green-700 px-1 rounded-md">
                                                        {msg?.ref_id?.language}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-3 text-xs text-indigo-400">
                                                Tap to view code
                                            </div>
                                        </motion.div>
                                    </div> :
                                        <div
                                            className={`h-auto max-w-[75%]  md:max-w-[60%] w-fit break-words overflow-wrap-anywhere rounded-2xl px-4 py-3 ${isCurrentUser
                                                ? "bg-gray-800 text-white rounded-br-none"
                                                : "bg-gray-600 text-white rounded-bl-none"
                                                }`}
                                        >
                                            <div className="break-words whitespace-pre-wrap leading-relaxed font-medium">
                                                {
                                                    `${msg?.ref_id?.message}`
                                                }
                                            </div>
                                            <div className="text-xs mt-2 flex justify-between text-gray-300">
                                                {new Date(msg?.ref_id?.createdAt).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}

                                                <span onClick={(e) => {
                                                    console.log("message -id ", messages[virtualRow.index]._id);
                                                    e.stopPropagation();
                                                    setDetailsCot({ id: messages[virtualRow.index]?.ref_id?._id });
                                                }}
                                                    className='pl-[40%] text-white font-bold cursor-pointer active:text-blue-600'>
                                                    <HiOutlineDotsVertical />
                                                </span>
                                            </div>
                                        </div>
                                }


                                {detailsCot.id === safeMessages[virtualRow.index]?.ref_id?._id &&
                                    <div className={`${isCurrentUser ? "text-gray-500 bg-gray-800 rounded-br-none translate-x-[-30px] rounded-2xl md:pr-7" : "text-gray-400 bg-gray-800 rounded-br-none translate-x-[-30px] rounded-2xl md:pr-7"}`}>
                                        <p className='text-xs pt-2'>type - {safeMessages[virtualRow.index]?.ref_id?.type}</p>
                                        <p className='text-xs'>Message Date - {timeGetter(safeMessages[virtualRow.index]?.ref_id?.createdAt)}</p>
                                        <p className='text-xs'>Week day - {WeekDay(safeMessages[virtualRow.index]?.ref_id?.createdAt)}</p>
                                    </div>}
                            </div>

                        </>

                    );
                })}

                <div ref={messagesEndRef} style={{ position: 'absolute', bottom: 0, left: 0, }} />
            </div>
        </div>
    );
};

export default VirtualizedChat;
