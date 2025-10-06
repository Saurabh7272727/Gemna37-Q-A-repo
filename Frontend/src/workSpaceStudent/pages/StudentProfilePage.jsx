import React from 'react'
import { useParams } from 'react-router-dom';
import { Shield } from 'lucide-react';
import WorkSpaceContainerSize from '../componentSpace/WorkSpaceContainerSize.jsx';
import { Box } from 'lucide-react';
const StudentProfilePage = () => {
    const data = useParams();
    const userInfo = {
        firstName: "Saurabh",
        lastName: "Sharma",
        fatherName: "Anil Sharma",
        motherName: "Sangita Sharma",
        email: "saurabhSharma63679383@gmail.com",
        rollNumber: '2305250130054',
        GEMID: "222222111GEM222222",
        collageID: 'BIT/23/IT/C/89',
        course: "B.tech",
        branch: "Information technology",
        year: "3rd year",
        status: "Active",
        createdAt: '23 Aug 2025',
        updatedAt: '24 Aug 2025'
    }
    return (
        <>
            <WorkSpaceContainerSize css={'bg-white'}>
                <div className='w-full md:h-[380px] h-[100%] flex md:justify-center justify-start items-center md:flex-row flex-col md:gap-x-2'>
                    <div className='md:w-[49%] md:h-full h-[30%] w-[99%] bg-pink-400/5 
                     rounded-md flex justify-center items-center gap-x-5 md:gap-x-8'>
                        <div className='md:w-[16%] md:h-[40%] w-[30%] h-[50%] object-cover overflow-hidden rounded-full ring-1 ring-gray-700'>
                            <img src="https://www.bing.com/th/id/OIP.Zvs5IHgOO5kip7A32UwZJgHaHa?w=216&h=211&c=8&rs=1&qlt=90&o=6&cb=12&pid=3.1&rm=2" alt="img" className='w-full h-full aspect-auto' />
                        </div>
                        <div className='md:w-[40%] w-[60%] h-[40%]
                         rounded-md flex flex-col justify-center items-start pl-2 text-black'>
                            <h1 className='text-2xl font-heading first-letter:text-4xl first-letter:font-extrabold'>Saurabh Sharma</h1>
                            <p className='text-gray-400/90'>Roll No. 2305250130054</p>
                        </div>
                    </div>
                    <div className='md:w-[49%] md:h-full h-[70%] w-[99%] flex justify-center items-center md:flex-row flex-col gap-x-3 bg-pink-400/5 rounded-md'>
                        <div className='md:w-[40%] w-full md:h-[50%] h-full bg-white rounded-md flex flex-col items-start justify-center pl-3'>
                            <h1 className='font-heading text-2xl'>Attendance</h1><br />
                            <hr />
                            <h1 className='font-heading text-2xl'>78.3%</h1>
                            <progress
                                max={100}
                                value={78.3}
                                title='78.3'
                                className="w-[90%] h-3 rounded-full overflow-hidden appearance-none mt-2 
             [&::-webkit-progress-bar]:bg-gray-200 
             [&::-webkit-progress-value]:bg-gradient-to-r 
             [&::-webkit-progress-value]:from-blue-500 
             [&::-webkit-progress-value]:to-cyan-400 
             [&::-webkit-progress-value]:transition-all 
             [&::-webkit-progress-value]:duration-500"
                            />
                            <p className='text-gray-400/40 font-semibold'>Attendance</p>
                        </div>
                        <div className='md:w-[40%] w-full md:h-[50%] h-full bg-white rounded-md flex items-start justify-center pl-3'>
                            <div className='w-[70%] h-full flex justify-center items-start flex-col  '>
                                <h1 className='font-heading text-2xl'>Guild Performance </h1><br />
                                <hr />
                                <h1 className='font-heading text-2xl'>3.58 (Total)</h1>
                                <p className='text-gray-400/40 font-semibold'>Grade Point Average</p>
                            </div>
                            <div className='w-[30%] h-full flex justify-center items-center cursor-pointer' title='New Feature '>
                                <Box size={44} fill="#d8e2dc" onClick={() => alert("guild are not add")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[100%] h-[40px] mt-4'>
                    <div className='w-[200px] p-auto m-auto h-[90%] 
                    border border-dotted border-red-500 text-center
                    content-center rounded-md font-heading text-lg'>Details</div>
                </div>
                <div className='mt-4 w-full h-[500px] bg-green-500'>

                </div>
                <div className='mt-4 w-full h-[500px] bg-green-500'>

                </div>
                <div className='mt-4 w-full h-[500px] bg-green-500'>

                </div>
            </WorkSpaceContainerSize>
        </>
    )
}

export default StudentProfilePage; 