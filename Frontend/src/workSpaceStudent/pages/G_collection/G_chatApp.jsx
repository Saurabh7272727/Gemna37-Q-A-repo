import React, { useEffect, useState } from 'react'
import Error404 from '../../../Components/ErrorPages/Error404.jsx';
import {
    FaSearch, FaPaperPlane
} from 'react-icons/fa';
import { GoVerified } from "react-icons/go";
import { useSelector, useDispatch } from 'react-redux';
import { SiGooglegemini } from "react-icons/si";
import MobileActionList from './component_apps/GChatTools.jsx';
import ShowConnectedFri from './component_apps/ShowConnectedFri.jsx';
import ApiEndPoints from '../../../ReduxStore/apiEndPoints/apiEndPoints.js';
import { addActiveUserList } from '../../../ReduxStore/Slices/ListSliceOfStudents.js';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ChatArea from './component_apps/ChatArea.jsx'

const G_chatApp = ({ renderPart }) => {
    const dispatch = useDispatch();
    const navi = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const ActiveUserList = useSelector(state => state?.ListSliceOdfStudent?.ActiveUserList);
    const OnlineUserList = useSelector(state => state?.ListSliceOdfStudent?.OnlineUserList);
    const ConnectedUserList = useSelector(state => state?.ListSliceOdfStudent?.ConnectedUserList);
    const studentProfile = useSelector((state) => state?.userinfoSlice?.user)

    const [loading, setLoading] = useState(true);
    const [test, setTest] = useState(false);
    const [mobileListShow, setMobileListShow] = useState(false);
    const [users, setUsers] = useState([]);

    const [emit, setEmit] = useState({
        id: " ",
        mode: false
    })

    // if any error;
    if (!renderPart) {
        console.log("expire token")
        localStorage.clear();
        return (
            <>
                <Error404 />
            </>
        )
    }




    useEffect(() => {
        try {
            setTest(true);
            setUsers(ConnectedUserList);
            let result = null
            const fecthAsync = async () => {
                const api = new ApiEndPoints();
                result = await api.fetchAllActiveUser('/api/v1/students');
            }
            fecthAsync().then(() => {
                if (result.success) {
                    dispatch(addActiveUserList([...result.data]))
                    setUsers(ConnectedUserList);
                    setTest(false);
                } else {
                    localStorage.clear();
                    navi('/error_page');
                }
            });
        } catch (error) {
            localStorage.clear();
            navi('/error_page');
        }

        return () => {
            setUsers(null);
        }

    }, [])

    const setMobileActionList = (type) => {
        switch (type) {
            case "Add Active Student":
                setUsers(ActiveUserList);
                setMobileListShow(false)
                break;
            case "Online Student":
                setUsers(OnlineUserList);
                setMobileListShow(false)
                break;
            default:
                setUsers(ConnectedUserList);
                setMobileListShow(false);
                break;
        }
    };

    const emitTheChatArea = (id, mode) => {
        setEmit({ id, mode })
    }

    return (
        <>
            {
                test ? <div className='w-full h-full flex justify-center items-center text-white'>Loading...</div> :
                    <div className='w-full h-full  bg-gray-900 relative'>
                        <div className="w-full h-full bg-gray-900 text-white flex flex-row">
                            <aside className="lg:w-1/4 w-full border-r border-white/20 p-4">
                                <h1 className="md:text-2xl text-[13px] font-bold mb-4 flex items-center h-[20px] gap-2 ">
                                    <GoVerified className="text-green-400 text-2xl" />
                                    <span>{`${studentProfile?.ref_id?.firstName} ${studentProfile?.ref_id?.lastName}`}</span>
                                    <span className='md:text-[16px] text-[12px] text-gray-500'>{`Roll no ${studentProfile?.ref_id?.rollNumber}`}</span>
                                </h1>
                                <div className='w-full md:h-[5%] h-[7%] my-2 rounded-md flex justify-start items-center gap-x-[4%]'>
                                    <div
                                        onClick={() => { setUsers(ConnectedUserList); }}
                                        className='md:w-[20%] w-[30%] h-[80%] border-2 border-gray-500 border-dotted rounded-md content-center text-center
                             text-gray-300 hover:bg-gray-600 hover:border-solid cursor-pointer active:bg-gray-400 font-normal'>Chat</div>
                                    <div
                                        onClick={() => { alert("Not available for you, under development") }}
                                        className='md:w-[20%] w-[30%] h-[80%] border-2 border-gray-500 border-dotted rounded-md content-center text-center
                             text-gray-300 hover:bg-gray-600 hover:border-solid cursor-pointer active:bg-gray-400 font-normal'>Guild</div>
                                </div>
                                <div className="relative mb-4">
                                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search friends..."
                                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    />
                                </div>

                                <ShowConnectedFri
                                    users={users}
                                    emitTheChatArea={emitTheChatArea}
                                    setLoading={setLoading}
                                    loading={loading}
                                />
                            </aside>
                            {
                                mobileListShow && <div className={`md:hidden flex w-full h-[90%] bg-gray-900/90 absolute bottom-1 right-0 transition duration-700`}>
                                    <MobileActionList setMobileActionList={setMobileActionList} />
                                </div>
                            }

                            <div
                                onClick={() => {
                                    setMobileListShow(!mobileListShow);
                                }}
                                className={`md:hidden flex justify-center items-center text-3xl  border-4  ${mobileListShow ? "border-red-500" : "border-blue-500"}  w-[56px] h-[56px] rounded-full fixed top-[79%] right-[7%]`}>
                                <SiGooglegemini />
                            </div>

                            <div className='md:w-[200px] w-[30px] text-white hidden md:flex justify-center pt-[100px] bg-gray-800 h-full'>
                                <MobileActionList setMobileActionList={setMobileActionList} />
                            </div>

                            <main className="flex-1 md:flex flex-col hidden">
                                {
                                    emit?.mode && <ChatArea renderPart={true} idByProps={emit?.id} />
                                }

                            </main>
                        </div>
                    </div>
            }
        </>

    )

}

export default G_chatApp;