import React from 'react'
import { PulseLoadingSpinner } from './LoadingDemo.jsx';


const FullScreenLoader = () => {
    return (
        <>
            <div className='w-[100vw] h-[50%] z-50 bg-gray-900 absolute top-[300px] flex justify-center items-center pr-[170px]'>
                <PulseLoadingSpinner />
            </div>
        </>
    )
}

export default FullScreenLoader;