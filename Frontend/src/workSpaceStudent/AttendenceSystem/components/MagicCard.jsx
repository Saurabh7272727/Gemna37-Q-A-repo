import React from 'react'

const MagicCard = ({ title, desc }) => {
    return (
        <div className='w-[100%] h-fit py-3 px-7 ring-2 ring-gray-300
         bg-gray-900 flex flex-col justify-center items-center font-mono'>
            <br />
            <h1 className='text-[14px] md:text-2xl font-semibold mb-1'>
                {title}
            </h1>
            <p className='text-gray-400 text-sm leading-relaxed'>{desc}</p>
            <br />
        </div>
    )
}

export default MagicCard;