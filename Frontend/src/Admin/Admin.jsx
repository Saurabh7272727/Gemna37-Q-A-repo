import React, { useEffect, useState } from 'react'
import { service } from './store/service.js';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from 'react-router-dom';
import Dashboard from './AdminDashBoard.jsx';
import { IoHome } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
import { useContext } from 'react';
import { StoreAdminContext } from './store/store.jsx';
import AddStudentDashBoard from './AddStudentDashBoard.jsx';
import { useNavigate } from 'react-router-dom';
import FiberNewIcon from '@mui/icons-material/FiberNew';
const Admin = () => {
    const { dispatch, state } = useContext(StoreAdminContext);
    const [student_com, setStudent_Com] = useState(false);

    const [queryTab, setQueryTab] = useSearchParams();
    const navi = useNavigate();
    useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [])
    useEffect(() => {
        setQueryTab();
        console.log("admin are mounnt", state?.loading);
        const responseAsync = async () => {
            const result = await service.requestToStudentForm();
            if (!(result?.success)) {
                navi('/error_page');
                return;
            }

            if (Array.isArray(result?.data)) {
                dispatch({ type: "LOAD", payload: result?.data });
                return;
            }
            navi('/error_page');
            return;
        }
        if (state?.studentList?.length <= 0)
            responseAsync();
        return () => {
            console.log("admin are unmount", state?.loading);
        }
    }, [])

    const QueryRouterChange = () => {
        setQueryTab({ page: "application/form" })
        setStudent_Com(true);
    }
    const RemoveQueryRouterChange = () => {
        setQueryTab();
        setStudent_Com(false);
    }
    return (
        <>
            {
                (state?.loading == true || state.loading == undefined) && <div className='w-screen h-screen flex justify-center items-center bg-gray-900'>
                    <CircularProgress />
                </div>
            }
            {
                !state.loading && <div className='w-screen md:h-screen h-auto flex flex-col 
                md:flex-row justify-center items-center bg-gray-900 md:gap-x-3
                md:pt-4 pt-[80px]
                gap-x-4'>
                    <div className='md:w-[30%] md:h-[90%] w-[100%] h-[40px] flex md:justify-end justify-center'>
                        <div className='md:w-[50%] w-[100%] h-full bg-green-600/20 
                        rounded-md flex md:flex-col flex-row items-center  gap-x-7 md:gap-y-4 md:pt-5'>
                            <button
                                onClick={() => RemoveQueryRouterChange()}
                                className={` px-2 py-1 ring-1 ring-gray-900 ${student_com ? "text-white" : "bg-gray-900 text-gray-400"} font-semibold md:w-[90%] w-[50%] text-start rounded-sm flex items-center gap-x-1`}><IoHome /> Home</button>
                            <button
                                className={` px-2 py-1 ring-1 ring-gray-900 ${student_com ? "bg-gray-900 text-gray-400" : "text-white"} font-semibold  md:w-[90%] w-[50%] text-start rounded-sm flex items-center gap-x-1`}
                                onClick={() => QueryRouterChange()}
                            >
                                <PiStudentFill /> Add Student</button>

                            <button
                                onClick={() => alert("hello")}
                                className={` px-2 py-1 ring-1 ring-gray-900 ${student_com ? "text-white" : "bg-gray-900 text-gray-400"} font-semibold md:w-[90%] w-[50%] text-start rounded-sm flex items-center gap-x-1`}>
                                <FiberNewIcon />
                                Check Status</button>
                        </div>
                    </div>
                    <div className='md:w-[68%] md:h-[90%] w-[100%] h-full'>
                        {
                            !student_com && <Dashboard />
                        }
                        {
                            student_com && <AddStudentDashBoard />
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Admin;