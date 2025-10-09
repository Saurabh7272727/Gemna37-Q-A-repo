import React from 'react'
import { TbHomeBolt } from "react-icons/tb";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { PiChatTeardropDotsFill } from "react-icons/pi";
import { SiSmartthings } from "react-icons/si";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RxAvatar } from "react-icons/rx";

const Footer = () => {
    const navi = useNavigate();
    const token = localStorage.getItem("jwt_token");
    const demoprofile = useSelector(state => state.userinfoSlice.user)
    return (
        <>
            <div className='w-screen h-[60px] bg-gray-900 fixed bottom-0 flex md:justify-around justify-center
         gap-x-20 items-center 
        '>
                <nav className='md:w-[50%] w-[98%] h-[80%] bg-black text-white rounded-lg px-2 flex justify-around items-center'>
                    <button className='flex justify-around items-center space-x-1'>
                        <abbr onClick={() => navi('/student')} title="Home" className='flex justify-around items-center space-x-1 no-underline border-0'>
                            <TbHomeBolt className='text-2xl' />
                            <p className='hidden md:inline-flex'>Home</p>
                        </abbr>
                    </button>
                    <button className='flex justify-center items-center space-x-1'>
                        <abbr title='Chat with friends' className='flex justify-around items-center space-x-1 no-underline border-0'>
                            <PiChatTeardropDotsFill className='text-2xl' />
                            <p className='hidden md:inline-flex'>G-Chat</p>
                        </abbr>
                    </button>
                    <button className='flex justify-center items-center space-x-1'>
                        <abbr title='Gemna tool collection' className='flex justify-around items-center space-x-1 no-underline border-0'>
                            <SiSmartthings className='text-2xl' />
                            <p className='hidden md:inline-flex'>G-Tools</p>
                        </abbr>
                    </button>
                    <button className='flex justify-center items-center space-x-1'>
                        <abbr title='share your idea' className='flex justify-around items-center space-x-1 no-underline border-0'>
                            <BiSolidMessageSquareAdd className='text-2xl' />
                            <p className='hidden md:inline-flex'>Post</p>
                        </abbr>
                    </button>
                    <button title='profile verification' className='flex justify-center items-center space-x-1' onClick={() => navi(`/profile/${token}`)}>
                        <Stack direction="row" spacing={2}>
                            <h1>{demoprofile?.email ? <Avatar
                                sx={{
                                    backgroundColor: "black",
                                    fontWeight: 500,
                                    fontSize: 24,
                                }}
                            >
                                {demoprofile?.ref_id?.firstName?.charAt(0)?.toUpperCase()}
                            </Avatar> : <RxAvatar className='text-3xl' />}</h1>
                        </Stack>
                    </button>
                </nav>
            </div>
        </>
    )
}

export { Footer }