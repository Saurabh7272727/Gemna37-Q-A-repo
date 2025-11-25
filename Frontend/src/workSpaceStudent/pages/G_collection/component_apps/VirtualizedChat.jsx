import React, { useRef, useState, useEffect } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualizedChat = ({ currentUserId, messages = [] }) => {
    const parentRef = useRef(null);
    const messagesEndRef = useRef();
    const [detailsCot, setDetailsCot] = useState({ id: "" });
    const safeMessages = Array.isArray(messages) ? messages : [];


    // implement virtualization window => to optimize message cost on node creation;
    const rowVirtualizer = useVirtualizer({
        count: safeMessages.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 100,
        overscan: 4
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
            onClick={() => setDetailsCot({ id: "" })}
            className="h-full w-full overflow-y-auto bg-gray-900 md:pr-9 rounded-lg border border-gray-900 p-4"
        >
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
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
                                    height: "100%",
                                    transform: `translateY(${virtualRow.start}px)`,
                                    height: virtualRow.size,
                                }}
                                className={`flex pb-3 h-auto ${isCurrentUser ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`w-[60%] h-auto lg:max-w-md rounded-2xl px-4 py-3 ${isCurrentUser
                                        ? "bg-gray-800 text-white rounded-br-none"
                                        : "bg-gray-600 text-white rounded-bl-none"
                                        }`}
                                >
                                    <div className="text-sm break-words">
                                        {msg?.ref_id?.message}
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
