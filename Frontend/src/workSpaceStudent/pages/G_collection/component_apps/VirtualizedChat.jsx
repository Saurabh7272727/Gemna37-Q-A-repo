import React, { useEffect, useRef, useState, useCallback } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";

const VirtualizedChat = ({ currentUserId, messages = [] }) => {
    const messagesEndRef = useRef();
    const containerRef = useRef();
    const safeMessages = Array.isArray(messages) ? messages : [];
    const [detailsCot, setDetailsCot] = useState({ id: "" });
    const [visibleCount, setVisibleCount] = useState(10); // ✅ Initially 10 messages

    // ✅ AUTO SCROLL TO BOTTOM when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [safeMessages.length]);

    // ✅ SCROLL HANDLER - Load more messages when scrolling
    const handleScroll = useCallback((e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;

        // ✅ Load more when scrolled to top (scrollTop === 0)
        if (scrollTop === 0 && visibleCount < safeMessages.length) {
            const newCount = Math.min(safeMessages.length, visibleCount + 10);
            setVisibleCount(newCount);
        }
    }, [visibleCount, safeMessages.length]);

    // ✅ Reset visible count when messages change
    useEffect(() => {
        setVisibleCount(10); // Reset to 10 when new messages arrive
    }, [safeMessages.length]);

    // ✅ Get visible messages (last N messages based on visibleCount)
    const visibleMessages = safeMessages.slice(-visibleCount);

    const timeGetter = (time) => {
        const timer = new Date(time);
        return `${timer.getDate()}/${timer.getMonth() + 1}/${timer.getFullYear()}`
    }

    const WeekDay = (time) => {
        const timer = new Date(time);
        const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturaday']
        return `${week[timer.getDay()]}`;
    }

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            onClick={() => setDetailsCot({ id: "" })}
            className="h-full md:w-[80%] w-full overflow-y-auto scrollbar-none bg-gray-900 rounded-lg border border-gray-900 p-4"
        >
            {safeMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center pt-[10%] text-gray-500">
                    <div className="text-center">
                        <div className="text-4xl mb-2">💬</div>
                        <p className="text-lg font-medium">No messages yet</p>
                        <p className="text-sm">Start a conversation!</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-3">
                    {/* ✅ Show "Load more" indicator if there are more messages */}
                    {visibleCount < safeMessages.length && (
                        <div className="text-center py-2 text-gray-400 text-sm">
                            ↑ Scroll to top to load {safeMessages.length - visibleCount} more messages
                        </div>
                    )}

                    {/* ✅ Only render visible messages */}
                    {visibleMessages.map((message, index) => {
                        const isCurrentUser = message?.ref_id?.senderId === currentUserId;

                        return (
                            <div
                                key={message._id || index}
                                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-xs w-[70%] lg:max-w-md rounded-2xl px-4 py-3 relative ${isCurrentUser
                                    ? 'bg-gray-800 text-white rounded-br-none'
                                    : 'bg-gray-600 text-white rounded-bl-none border border-gray-900'
                                    }`}>
                                    {/* Message content */}
                                    <div className="text-sm break-words">
                                        {message?.ref_id?.message}
                                    </div>
                                    {
                                        detailsCot.id === message?.ref_id?._id && <div className={`${isCurrentUser ? "text-gray-500" : "text-gray-400"}`}>
                                            <p className='text-xs pt-2'>type - {message?.ref_id?.type}</p>
                                            <p className='text-xs'>Message Date - {timeGetter(message?.ref_id?.createdAt)}</p>
                                            <p className='text-xs'>Week day - {WeekDay(message?.ref_id?.createdAt)}</p>
                                        </div>
                                    }

                                    {/* Message time */}
                                    <div className={`text-xs mt-2 flex justify-between ${isCurrentUser ? 'text-blue-100' : 'text-gray-400'
                                        }`}>
                                        {message?.ref_id?.createdAt ?
                                            new Date(message?.ref_id?.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) :
                                            'Just now'
                                        }
                                        <span
                                            onClick={(e) => {
                                                console.log("message -id ", message._id);
                                                e.stopPropagation();
                                                setDetailsCot({ id: message?.ref_id?._id });
                                            }}
                                            className='pl-[40%] text-white font-bold cursor-pointer active:text-blue-600'>
                                            <HiOutlineDotsVertical />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
    );
};

export default VirtualizedChat;