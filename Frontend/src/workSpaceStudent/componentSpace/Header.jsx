import React from 'react'
import { AiOutlineBars } from "react-icons/ai";
const Header = () => {
    return (
        <div className='w-screen h-[60px] bg-gray-900 fixed top-0 flex justify-center
         gap-x-20 items-center
        '>
            <nav className='md:w-[70%] w-[100%] md:h-[80%] h-full bg-black text-white md:rounded-lg 
            flex md:justify-around items-center justify-between md:px-0 px-4
            '>
                <h1 className='text-white font-medium bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg'>Gemna.ai</h1>
                <div><AiOutlineBars className='w-[60px] h-[30px] text-white' /></div>
            </nav>
        </div>
    )
}

export { Header };