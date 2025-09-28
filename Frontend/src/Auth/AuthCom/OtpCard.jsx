import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { FaLock, FaKey, FaShieldAlt } from "react-icons/fa";
import { decryptData, encryptData } from '../Encryption/jsondataEncryption.js';
import { ToastContainer } from 'react-toastify';
import Message from '../../MessageGemnaCenter/toast.js';
import { useNavigate } from 'react-router-dom';

const OtpCard = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [inputPassword, setInputPassword] = useState({
        password: " ",
        re_password: " "
    });
    const [captchaCode, setCaptchaCode] = useState("");
    const [error, setError] = useState({});

    function generateCaptcha() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    // console.log(otp, captcha);

    const handleOtpChange = (value, index) => {
        setError({});
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const InputHandler = (e) => {
        const { name, value } = e.target;
        const copyData = { ...inputPassword };
        copyData[name] = value;
        setInputPassword((sau) => {
            return { ...sau, ...copyData };
        });
    }

    const captchaCodeHandler = (e) => {
        const value = e.target.value;
        setCaptchaCode(value);
    }

    const submitHandler = async () => {
        if (inputPassword.password !== inputPassword.re_password) {
            alert("please enter same password both field");
            return;
        }
        if (inputPassword.password.length >= 8 && inputPassword.re_password.length >= 8) {
            if (captchaCode !== captcha) {
                alert("your captcha are invalid");
                return;
            } else {
                const OTP = otp.join("");
                if (OTP.length !== 6) {
                    alert("OTP are invalid length");
                    return;
                } else {
                    const data = decryptData(localStorage.getItem("token"));
                    const requestObj = {
                        password: inputPassword.password,
                        re_password: inputPassword.re_password,
                        OTP: OTP,
                        captchaCode: captcha,
                        ...data
                    }
                    console.log(requestObj);
                    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/student/otp/verification`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(requestObj)
                    });

                    const result = await response.json();
                    const { message, success, token } = result;
                    if (!success) {
                        const messageToast = new Message(result);
                        messageToast.setMessage();
                        setError({ error: message });
                    } else {
                        localStorage.clear();
                        localStorage.setItem("token_finder", encryptData(token));
                        navi('/login');
                    }
                }
            }
        } else {
            alert("password has at least 8 characters");
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const AsyncOperationSend = async () => {
            await new Promise(res => setTimeout(() => {
                setLoading(true);

                res('hello');
            }, 3000));
        }
        AsyncOperationSend();
    }, []);
    return (
        <>
            {
                loading ? <div className='mt-2 text-white'>
                    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
                        <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-8">
                            <h1 className="text-4xl font-bold text-white text-center mb-2 text-wrap">
                                Gemna.ai access workspace page
                            </h1>
                            <p className="text-center text-green-400 mb-6 text-sm">
                                Email verification log, OTP are send on related email address
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center bg-white/20 rounded-lg p-3">
                                    <FaLock className="text-white mr-3" />
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        name='password'
                                        value={inputPassword.password}
                                        onChange={InputHandler}
                                        minLength={8}
                                        className="bg-transparent w-full text-white placeholder-white/60 outline-none"
                                    />

                                </div>

                                <div className="flex items-center bg-white/20 rounded-lg p-3">
                                    <FaKey className="text-white mr-3" />
                                    <input
                                        type="password"
                                        name='re_password'
                                        value={inputPassword.re_password}
                                        minLength={8}
                                        onChange={InputHandler}
                                        placeholder="Re-enter password"
                                        className="bg-transparent w-full text-white placeholder-white/60 outline-none"
                                    />
                                </div>
                                <p className='text-green-700'>password are at least 8 characters using & complex</p>
                            </div>
                            <div className="mb-6">
                                <label className="block text-white font-medium mb-2">Enter OTP</label>
                                <div className="flex justify-between gap-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            id={`otp-${index}`}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e.target.value, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}   // ⬅️ add this
                                            className="w-10 h-12 text-center rounded-lg bg-white/20 text-white font-bold text-lg outline-none focus:ring-2 focus:ring-pink-400"
                                        />
                                    ))}
                                </div>
                                {
                                    error.error &&
                                    <p className='mt-2 text-red-500 font-semibold ring-2 px-4 py-2 ring-gray-900 bg-white rounded-lg'>{error.error && `${error.error}`}</p>
                                }

                            </div>

                            <div className="mb-6">
                                <label className="block text-white font-medium mb-2">Captcha Verification</label>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-mono text-lg tracking-widest rounded-md select-none">
                                        {captcha}
                                    </div>
                                    <button
                                        onClick={() => setCaptcha(generateCaptcha())}
                                        className="text-sm text-white/80 hover:text-white"
                                    >
                                        Refresh
                                    </button>
                                </div>
                                <div className="flex items-center bg-white/20 rounded-lg p-3 mt-3">
                                    <FaShieldAlt className="text-white mr-3" />
                                    <input
                                        type="text"
                                        placeholder="Enter captcha code"
                                        className="bg-transparent w-full text-white placeholder-white/60 outline-none"
                                        onChange={captchaCodeHandler}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={submitHandler}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-[1.02] transform transition">
                                Verify & Continue
                            </button>
                        </div>
                    </div>
                </div> : <CircularProgress />
            }
            <ToastContainer />
        </>
    )
}

export default OtpCard;