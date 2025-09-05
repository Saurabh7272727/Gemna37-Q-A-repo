import React from 'react'

const LazyLaodingDemo = () => {
    return (
        <>
            <div className='w-[100vw] h-[100vh]  bg-gray-900 flex justify-center flex-col items-center animate-pulse'>
                <div className='w-[100%] md:w-[70%] h-[40%] bg-gray-500 rounded-md'></div>
                <br />
                <div className='w-[100%] h-[40%] md:w-[60%] grid grid-cols-2 md:grid-cols-4 gap-3 p-2'>
                    <div className='bg-gray-600 rounded-md'></div>
                    <div className='bg-gray-600 rounded-md'></div>
                    <div className='bg-gray-600 rounded-md'></div>
                    <div className='bg-gray-600 rounded-md'></div>
                    <div className='bg-gray-600 rounded-md'></div>
                    <div className='bg-gray-600 rounded-md'></div>
                    <div className='bg-gray-600 rounded-md'></div>
                    <div className='bg-gray-600 rounded-md'></div>
                </div>
            </div>
        </>
    )
}

export default LazyLaodingDemo;