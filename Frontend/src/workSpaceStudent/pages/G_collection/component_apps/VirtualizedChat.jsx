import React, { useEffect, useRef } from 'react';

const VirtualizedChat = ({ currentUserId, messages = [] }) => {
    const messagesEndRef = useRef();
    const safeMessages = Array.isArray(messages) ? messages : [];

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [safeMessages]);

    return (
        <div className="h-full w-full overflow-y-auto bg-gray-900 rounded-lg border border-gray-900 p-4">
            {safeMessages.length === 0 ? (
                // Empty state
                <div className="h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                        <div className="text-4xl mb-2">💬</div>
                        <p className="text-lg font-medium">No messages yet</p>
                        <p className="text-sm">Start a conversation!</p>
                    </div>
                </div>
            ) : (
                // Messages list
                <div className="space-y-3">
                    {safeMessages.map((message, index) => {
                        const isCurrentUser = message?.ref_id?.senderId === currentUserId;

                        return (
                            <div
                                key={message._id || index}
                                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-3 ${isCurrentUser
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
                                    }`}>
                                    {/* Message content */}
                                    <div className="text-sm break-words">
                                        {message?.ref_id?.message}
                                    </div>

                                    {/* Message time */}
                                    <div className={`text-xs mt-2 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                        {message?.ref_id?.createdAt ?
                                            new Date(message?.ref_id?.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) :
                                            'Just now'
                                        }
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