import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import Cookies from 'js-cookie';
import { decryptData } from '../../Auth/Encryption/jsondataEncryption.js';
import { accessController } from '../../ReduxStore/Slices/AuthSlice.js';
import { useDispatch } from 'react-redux';
import ImageUploadForm from './ImageUploadForm.jsx'
export default function ProfileHeader({ user }) {

    const dispatch = useDispatch();
    const [upload, setUplaod] = useState(false);
    const [preview, setPreview] = useState(false);
    const ImageURLUploadHandler = () => {
        if (upload) {
            Cookies.remove("GASID");
            setUplaod(!upload);
            return;
        } else {
            if (user?.ref_id) {
                if (Cookies.get("GASID")) {
                    Cookies.remove("GASID");
                }
                let token = localStorage.getItem("jwt_token");
                token = decryptData(token);
                if (token.role === 'student') {
                    Cookies.set("GASID", localStorage.getItem("jwt_token"));
                    setUplaod(!upload);
                } else {
                    Cookies.remove("GASID");
                    localStorage.clear();
                    dispatch(accessController(false));
                    return;
                }
            } else {
                return;
            }
        }

    }

    useEffect(() => {
        Cookies.remove("GASID");
        return () => {
            Cookies.remove("GASID");
        }
    }, [])


    const preViewHandler = () => {
        setPreview(!preview);
    }

    return (
        <>
            {
                preview && <div onClick={() => setPreview(!preview)} className='w-full h-full flex justify-center pt-[90px] md:pt-0 md:items-start bg-gray-900/70 absolute left-0 z-30'>
                    <img onClick={preViewHandler} className='md:h-[40%] h-[25%]  object-center content-start ring-3 ring-blue-600 md:w-[40%] w-[80%] md:rounded-full rounded-md md:object-cover object-cover bg-center' src={`${user?.ref_id?.imageURL}`} alt='profile image loading..' />
                </div>
            }
            <div className="bg-black ring-[0.5px] ring-gray-400 rounded-2xl overflow-hidden shadow p-4 relative">
                <div className="h-36 bg-gray-900 ring-[0.5px] ring-gray-400 
            rounded-xl flex justify-center items-center
            text-4xl font-semibold text-gray-500/80
            ">
                    <h1>{user?.ref_id?.course?.label}</h1>
                </div>
                <div className="absolute top-16 left-6">
                    <div title={`${user?.ref_id?.firstName} ${user?.ref_id?.lastName}`} className="h-20 w-20 rounded-full ring-[0.5px] ring-gray-400 bg-gray-800 flex items-center justify-center text-2xl font-bold border-4 border-[#0d0d0d]">
                        {user?.ref_id?.imageURL ? <img onClick={preViewHandler} className='h-20 w-20 rounded-full object-cover bg-center' src={`${user?.ref_id?.imageURL}`} alt='profile image loading..' /> : user?.ref_id?.firstName?.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="mt-12 pl-19" title={`${user?.ref_id?.course.label}/${user?.ref_id?.branch?.label}`}>
                    <h2 className="text-xl font-semibold">{user?.ref_id?.firstName} {user?.ref_id?.lastName}</h2>
                    <p className="text-xl text-gray-400">{user?.ref_id?.branch.label} <sup>{user?.ref_id?.year?.label}</sup></p>
                </div>
                <div className="absolute top-5 right-7">
                    <Button onClick={() => {
                        ImageURLUploadHandler()
                    }} className={`${upload ? "bg-blue-900 text-white" : "ring-1 ring-blue-600 bg-blue-500/30"}`} variant={`${upload && "outlined"}`} size="small">{upload ? "Upload Cancel" : "Edit Info"}</Button>
                </div>
            </div>
            {
                upload && <div className='w-[93%] h-auto md:h-[70]  z-20 flex justify-center items-center bg-gray-900 absolute  text-white'>
                    <ImageUploadForm dropDownBtn={setUplaod} />
                    {/* <h1>hello world</h1> */}
                </div>
            }
        </>
    );
}