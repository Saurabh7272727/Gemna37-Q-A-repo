import React, { useEffect } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { LuUserX } from "react-icons/lu";

const ShowConnectedFri = ({ users, handleUserClick, setLoading, loading }) => {
    // Simulate loading skeleton
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);


    if (users.length === 0) {
        return (
            <>
                <div className='w-full h-[60] flex justify-center items-start pt-[30%]'>
                    <h1 className='text-[120px] text-white'><LuUserX /></h1>
                </div>
            </>
        )
    }

    return (
        <>
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
                            <FaRegUserCircle className="text-3xl text-gray-300" />
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-gray-400">
                                    {user.status || "offline"}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default ShowConnectedFri;