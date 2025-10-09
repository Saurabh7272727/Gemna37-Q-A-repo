import React from 'react';
import { Button } from '@mui/material';


export default function ProfileHeader({ user }) {
    return (
        <div className="bg-black ring-[0.5px] ring-gray-400 rounded-2xl overflow-hidden shadow p-4 relative">
            <div className="h-36 bg-gray-900 ring-[0.5px] ring-gray-400 
            rounded-xl flex justify-center items-center
            text-4xl font-semibold text-gray-500/80
            ">
                <h1>{user?.ref_id?.course?.label}</h1>
            </div>
            <div className="absolute top-16 left-6">
                <div title={`${user?.ref_id?.firstName} ${user?.ref_id?.lastName}`} className="h-20 w-20 rounded-full ring-[0.5px] ring-gray-400 bg-gray-800 flex items-center justify-center text-2xl font-bold border-4 border-[#0d0d0d]">
                    {user?.ref_id?.firstName?.charAt(0).toUpperCase()}
                </div>
            </div>
            <div className="mt-12 pl-19" title={`${user?.ref_id?.course.label}/${user?.ref_id?.branch?.label}`}>
                <h2 className="text-xl font-semibold">{user?.ref_id?.firstName} {user?.ref_id?.lastName}</h2>
                <p className="text-xl text-gray-400">{user?.ref_id?.branch.label} <sup>{user?.ref_id?.year?.label}</sup></p>
            </div>
            <div className="absolute top-5 right-7">
                <Button variant="outlined" size="small">Edit Info</Button>
            </div>
        </div>
    );
}