import React, { useEffect, useState } from 'react';
import { FaUserAlt, FaLock, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { decryptData, encryptData } from '../Encryption/jsondataEncryption.js';
import LoginCommunication from '../../Communication/Login.commuincation.js';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Message from '../../MessageGemnaCenter/toast.js';
import { accessController } from '../../ReduxStore/Slices/AuthSlice.js';
import { clearTheList } from '../../ReduxStore/Slices/ListSliceOfStudents.js'
import { clearinfoSlice } from '../../ReduxStore/Slices/UserInfoSlice.js'
import { useDispatch } from 'react-redux';
import { SiAuth0 } from 'react-icons/si';
import Cookies from 'js-cookie'

const LoginUser = () => {
    const [getValueParams, setValueParams] = useSearchParams();
    const dispatch = useDispatch();
    const navi = useNavigate();
    const [user, setUser] = useState({});
    const [loginFormHandelr, setLoginFormHandler] = useState(false);
    const [inputHandler, setInputHandler] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const endata = localStorage.getItem("token_finder");
        if (endata) {
            const token_finder = decryptData(endata);
            if (token_finder.email) {
                setUser({ ...token_finder });
                setLoginFormHandler(true);
            }
        }
    }, []);


    useEffect(() => {

        const ttt = async () => {
            if (getValueParams.get("token") && getValueParams.get("token") === Cookies.get("token")) {
                // console.log(getValueParams.get("token"), "============", Cookies.get("token"));

                localStorage.removeItem("jwt_token");
                localStorage.setItem("jwt_token", encryptData({ role: "student", jwt_token: getValueParams.get("token") }));
                const toast = new Message({ message: "Login successfully", success: true });
                toast.setMessage();
                dispatch(accessController(true));
                await new Promise((rej, res) => setTimeout(() => {
                    navi('/');
                    res();
                }, 3000))
            }
        }

        ttt();
    }, [])

    const ChangeHandler = (e) => {
        const { name, value } = e.target;
        const copyData = { ...inputHandler };
        copyData[name] = value;
        setInputHandler(copyData);
        setError({})
    }

    const CLickHandler = async (e) => {
        setLoading(true);
        if (loginFormHandelr) {
            const result = await LoginCommunication(user);
            const { message, success, jwt_token } = result;
            if (success) {

                localStorage.setItem("jwt_token", encryptData({ role: "student", jwt_token: jwt_token }));
                const toast = new Message(result);
                toast.setMessage();
                dispatch(accessController(true));
                await new Promise((rej, res) => setTimeout(() => {
                    navi('/');
                    res();
                }, 3000))
            } else {
                localStorage.clear();
                setError({ message });
                setLoading(false);
                dispatch(accessController(false));
                dispatch(clearinfoSlice());
                dispatch(clearTheList());
            }

        } else {
            e.preventDefault();
            const result = await LoginCommunication(inputHandler);
            const { message, success, jwt_token } = result;
            if (success) {
                console.log("==========", jwt_token);
                // localStorage.setItem("token_finder", encryptData(token));
                localStorage.setItem("jwt_token", encryptData({ role: "student", jwt_token: jwt_token }));
                const toast = new Message(result);
                toast.setMessage();
                dispatch(accessController(true));
                await new Promise((rej, res) => setTimeout(() => {
                    navi('/');
                    res();
                }, 3000))
            } else {
                localStorage.clear();
                setError({ message });
                setLoading(false);
                dispatch(accessController(false));
                dispatch(clearinfoSlice());
                dispatch(clearTheList());
            }

        }
    }

    const handleGoogleLogin = () => {
        navi('/auth/google/verification')
    };

    return (
        <>
            {
                loginFormHandelr ? <div
                    className='min-h-screen w-screen group flex flex-col space-y-2 items-center justify-center bg-gray-900 relative overflow-hidden'
                ><div className='md:w-[30%] w-[90%] md:h-[10%] px-2 space-x-3 bg-gray-700/20 py-4 text-white flex justify-around items-center rounded-lg'>
                        <div className='md:w-[100px] md:h-[100px] w-[60px] h-[60px] bg-gray-700 rounded-[100%] flex justify-center items-center text-[40px] font-semibold'>{user.name.charAt(0).toUpperCase()}</div>
                        <div>
                            <h1 className='md:text-xl text-[11px] font-semibold'>Name - {user.name}</h1>
                            <p className='font-semibold text-[12px] text-gray-500'>Email - {user.email}</p>
                            <button
                                onClick={CLickHandler}
                                className='px-8 rounded-sm py-1 bg-gradient-to-r from-blue-500 to-purple-600 mt-4 flex justify-center items-center'>Continue</button>
                        </div>
                    </div>
                    {
                        error.message && <div className='text-red-700 text-center font-semibold text-xs '>{error.message}</div>
                    }
                    {
                        loading && <div className='absolute bg-gray-600/20 top-2 w-screen h-full z-40 flex justify-center items-center'><CircularProgress /></div>
                    }
                </div> :
                    <div className="min-h-screen group flex items-center justify-center bg-gray-900 relative overflow-hidden">

                        <div className="absolute w-screen h-screen flex justify-center items-center">
                            <h1 className='text-[300px] text-gray-300/10  font-bold first-letter:font-thin group-hover:first-letter:text-green-500'>Gemna.login</h1>
                        </div>

                        <div className="z-1 bg-white/5 backdrop-blur-md shadow-xl p-10 rounded-2xl w-[90%] max-w-md border border-white/40">
                            <h2 className="text-xl font-bold text-white text-center mb-6 ring-2 rounded-md py-2 bg-green-700/10">Gemna.ai login</h2>

                            <form onSubmit={(e) => CLickHandler(e)} className="flex flex-col space-y-4">
                                <div className="relative">
                                    <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        name='email'
                                        value={inputHandler.email}
                                        onChange={(e) => ChangeHandler(e)}
                                        type="text"
                                        required
                                        placeholder="write your email"
                                        className="pl-10 pr-4 py-2 w-full rounded-md bg-white/50 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div className="relative">
                                    <FaLock className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        name='password'
                                        value={inputHandler.password}
                                        onChange={(e) => ChangeHandler(e)}
                                        type="password"
                                        required
                                        placeholder="write your password"
                                        className="pl-10 pr-4 py-2 w-full rounded-md bg-white/50 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                {
                                    error.message && <div className='text-red-700 text-start font-semibold text-xs md:text-[14px] ring-1 rounded-md bg-gray-900 ring-red-500 px-4 py-1'>{error.message}</div>
                                }
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                                >
                                    Login
                                </button>
                            </form>

                            <p className="text-center text-white text-sm mt-6">
                                <span className='text-blue-500 underline underline-offset-2 cursor-pointer'>
                                    <button
                                        className="btn-google"
                                        onClick={handleGoogleLogin}
                                    >
                                        Continue with Google
                                    </button>
                                </span> on gemna.ai auth service
                            </p>
                        </div>
                        {
                            loading && <div className='absolute bg-gray-600/20 top-2 w-screen h-full z-40 flex justify-center items-center'><CircularProgress /></div>
                        }

                    </div>
            }
            <ToastContainer />
        </>

    );
};

export { LoginUser };
