import React, { useEffect } from 'react'
import Radio from '@mui/material/Radio';
import ImageConnect from '../Components/UploadImages/ImageConnect';
import Message from '../MessageGemnaCenter/toast.js';
import { ToastContainer } from 'react-toastify';
const ConnectGemnaPage = () => {
    const [selectedValue, setSelectedValue] = React.useState(null);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    useEffect(() => {
        const messageLocal = localStorage.getItem("message_local");
        if (messageLocal) {
            const message = new Message({ success: false, message: messageLocal });
            message.setMessage();
            console.log(messageLocal)
        }
        return () => localStorage.removeItem("message_local")
    }, [])
    return (
        <>
            <div className='w-screen h-auto bg-gray-900 bg-red flex justify-center items-center flex-col'>
                <div className='md:w-full md:h-[200px] flex md:flex-row flex-col justify-center items-center mt-[100px] mb-[20px] font-inter gap-3 text-gray-900 subpixel-antialiased'>
                    <div className='w-[200px] h-[140px] bg-white ring-2 ring-blue-600 rounded-lg flex justify-center items-center'>
                        <Radio
                            checked={selectedValue === 'student'}
                            onChange={handleChange}
                            value="student"
                            name="student"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <div className='w-[90%] h-full flex flex-col justify-center gap-y-2'>
                            <h1 className='font-semibold tracking-wide'>Student</h1>
                            <p className='text-[11px] text-wrap'>
                                Begin Your Academic Journey
                                <span className='text-red-900 block'>Join thousands of students achieving more with Gemna</span>
                            </p>
                        </div>

                    </div>
                    <div className='w-[200px] h-[140px] bg-white ring-2 ring-blue-600 rounded-lg flex justify-center items-center'>
                        <Radio
                            checked={selectedValue === 'teacher'}
                            onChange={handleChange}
                            value="teacher"
                            name="teacher"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <div className='w-[90%] h-full flex flex-col justify-center gap-y-2'>
                            <h1 className='font-semibold tracking-wide'>Teacher</h1>
                            <p className='text-[11px] text-wrap'>
                                Empower Your Teaching Experience
                                <span className='text-red-900 block'>Join educators transforming classroom management with Gemna & Team</span>
                            </p>
                        </div>
                    </div>
                </div>
                {
                    (selectedValue === 'student') && <div className='w-full h-auto md:mt-[80px] ring-4 ring-green-400 transition-all'>
                        <ImageConnect />
                    </div>
                }

            </div>
            <ToastContainer />
        </>
    )
}

export default ConnectGemnaPage;