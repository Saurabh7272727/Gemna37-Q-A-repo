import React from 'react';
import { FaUserGraduate, FaUserTie, FaUser, FaUniversity, FaIdCard, FaBook, FaCalendarAlt } from 'react-icons/fa';
import { MdFamilyRestroom } from 'react-icons/md';
import { IoMdRadioButtonOn } from 'react-icons/io';
import CircularProgress from '@mui/material/CircularProgress';
import { MdVerified } from "react-icons/md";


const StudentCard = ({
    firstName,
    lastName,
    fatherName,
    motherName,
    rollNumber,
    collegeID,
    course,
    branch,
    year,
    status,
    email,
    loading
}) => {
    return (
        <>
            <div className='md:w-[90%] w-[100%] h-[300px] bg-white rounded-lg flex-none  pt-4 relative'>
                <div className="flex items-center space-x-4 mb-4 pl-3">
                    <FaUserGraduate className="text-blue-600 text-3xl" />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">{firstName} {lastName}</h2>
                        <p className="text-sm text-gray-500 flex items-center"><FaIdCard className="mr-1" /> Roll No: {rollNumber}</p>
                    </div>
                </div>

                <div className="space-y-2 text-gray-700 text-sm pl-3">
                    <div className="flex items-center"><FaUserTie className="mr-2 text-gray-600" /> Father: {fatherName}</div>
                    <div className="flex items-center"><MdFamilyRestroom className="mr-2 text-pink-600" /> Mother: {motherName}</div>
                    <div className="flex items-center"><FaUniversity className="mr-2 text-indigo-600" /> College ID: {collegeID}</div>
                    <div className="flex items-center"><FaBook className="mr-2 text-green-600" /> Course: {course.label}</div>
                    <div className="flex items-center"><FaUser className="mr-2 text-purple-600" /> Branch: {branch.label}</div>
                    <div className="flex items-center"><FaCalendarAlt className="mr-2 text-yellow-600" /> Year: {year.label}</div>
                    <div className="flex items-center"><FaCalendarAlt className="mr-2 text-yellow-600" /> Email: {email}</div>
                    <div className="flex items-center">
                        <IoMdRadioButtonOn
                            className={`mr-2 ${status.value === 'active' ? 'text-green-600' : 'text-red-500'}`}
                        />
                        Status:
                        <span className={`ml-1 font-semibold ${status.value === 'active' ? 'text-green-700' : 'text-red-700'}`}>
                            {status.label}
                        </span>
                    </div>
                </div>
                {
                    loading ? <div className='w-full h-full bg-gray-900/40 absolute top-0 pl-0 flex justify-center items-center'>
                        <CircularProgress />
                    </div> : <div
                        className='w-full h-full bg-transparent absolute top-0 
                        pl-0 flex justify-center items-center'>
                        <p><MdVerified className='text-green-900 text-[80px]' /></p>
                    </div>
                }

            </div>
        </>
    )
}

export default StudentCard;