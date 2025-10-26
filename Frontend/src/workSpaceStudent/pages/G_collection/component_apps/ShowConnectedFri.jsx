import React, { useEffect } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { LuUserX } from "react-icons/lu";
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { HiOutlineStatusOnline } from "react-icons/hi";
import { IoLogoIonic } from "react-icons/io5";
import { useSelector } from 'react-redux';

const ShowConnectedFri = ({ users, setLoading, loading, emitTheChatArea }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const currentUser = useSelector(state => state?.userinfoSlice?.user?.ref_id)
    const navi = useNavigate();

    // Simulate loading skeleton
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);


    if (users?.length === 0 && !loading) {
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
                        ?.fill(0)
                        ?.map((_, i) => (
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
                    : users?.map((user) => (
                        <div
                            key={user?._id}
                            onClick={() => {
                                if (isMobile) {
                                    navi(`/chat/app/${user?._id}`)
                                } else {
                                    emitTheChatArea(user?._id, true);
                                }

                            }}
                            className="flex relative items-center space-x-3 p-3 rounded-xl hover:bg-white/10 cursor-pointer transition"
                        >
                            {
                                user?.imageURL ? <img className='h-14 w-14 border-2 border-blue-500 rounded-full object-cover bg-center' src={`${user?.imageURL}`} alt='profile image loading..' /> : <FaRegUserCircle className="text-3xl text-gray-300 h-14 w-14 border-2 border-blue-500 rounded-full" />
                            }

                            <div>
                                <p className="font-semibold pl-1">{user.firstName} {user?.lastName}</p>
                                <p className="text-sm text-gray-400 pl-1">
                                    <span>Roll no {user?.rollNumber}</span> <span className='text-green-400 font-bold text-xs'>{user?.GSS ? <span className='flex justify-start items-start gap-x-3'><HiOutlineStatusOnline /> ONLINE</span> : `- ${user?.status?.label}`} </span>
                                </p>
                            </div>
                            {
                                (currentUser?._id === user?._id) && <div onClick={(e) => {
                                    e.stopPropagation();
                                    alert("this service are blocked for all users")
                                }} className='flex items-center justify-center md:text-4xl lg:text-2xl text-2xl  p-3 rounded-xl hover:bg-white/10 cursor-pointer transition'>
                                    <IoLogoIonic />
                                </div>
                            }
                        </div>
                    ))}
            </div>
        </>
    )
}

export default ShowConnectedFri;