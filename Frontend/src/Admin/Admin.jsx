import React, { useEffect, useState } from 'react'
import { reducer, initialState } from './store/store.js';
import { service } from './store/service.js';
import { useReducer } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from 'react-router-dom';
import Dashboard from './AdminDashBoard.jsx';
import { IoHome } from "react-icons/io5";
import { PiStudentFill } from "react-icons/pi";
const Admin = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [student_com, setStudent_Com] = useState(false);
    const [queryState, setQueryState] = useSearchParams();

    useEffect(() => {
        const responseAsync = async () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            const result = await service.requestToStudentForm();
            dispatch({ type: "LOAD", payload: result });
        }
        responseAsync();
        return () => {
            dispatch({ type: "UNMOUNT" });
        }
    }, [])


    console.log(state);
    const QueryRouterChange = () => {
        setQueryState({ page: "student_gem" });
        setStudent_Com(true);
    }
    const RemoveQueryRouterChange = () => {
        setQueryState({});
        setStudent_Com(false);
    }
    return (
        <>
            {
                state?.loading && <div className='w-screen h-screen flex justify-center items-center bg-gray-900'>
                    <CircularProgress />
                </div>
            }
            {

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
                        </div>
                    </div>
                    <div className='md:w-[68%] md:h-[90%] w-[100%] h-full'>
                        {
                            !student_com && <Dashboard />
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Admin;