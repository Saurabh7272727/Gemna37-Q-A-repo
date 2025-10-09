import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Home from './pages/Home';
import { encryptData, decryptData } from '../Auth/Encryption/jsondataEncryption.js';
import { useNavigate } from 'react-router-dom';
const WorkSpace = () => {
    const navi = useNavigate();
    const [query, setQuery] = useSearchParams();
    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt_token");
        if (!jwtToken) {
            navi('/error_page');
        } else {
            const jwt_token = decryptData(jwtToken);

            if (!(jwt_token.role === 'student')) {
                navi('/error_page');
            }


        }
    }, [])
    return (
        <>
            <div className='w-screen h-screen bg-gray-900 fixed top-[60px] overflow-y-scroll scrollbar-none'>
                <Home />
            </div>
        </>
    )
}

export default WorkSpace;