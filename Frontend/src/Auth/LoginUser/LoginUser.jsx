import React from 'react';
import { FaUserAlt, FaLock, FaGoogle, FaFacebookF } from 'react-icons/fa';

const LoginUser = () => {
    return (
        <div className="min-h-screen group flex items-center justify-center bg-gray-900 relative overflow-hidden">

            <div className="absolute w-screen h-screen flex justify-center items-center">
                <h1 className='text-[300px] text-gray-300/10  font-bold first-letter:font-thin group-hover:first-letter:text-green-500'>Gemna.login</h1>
            </div>

            <div className="z-10 bg-white/5 backdrop-blur-md shadow-xl p-10 rounded-2xl w-[90%] max-w-md border border-white/40">
                <h2 className="text-xl font-bold text-white text-center mb-6 ring-2 rounded-md py-2 bg-green-700/10">Gemna fire</h2>

                <form className="flex flex-col space-y-4">
                    <div className="relative">
                        <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Username"
                            className="pl-10 pr-4 py-2 w-full rounded-md bg-white/50 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="pl-10 pr-4 py-2 w-full rounded-md bg-white/50 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-white text-sm mt-6">
                    Don’t have an account? <span className="underline cursor-pointer hover:text-indigo-200">Sign up</span>
                </p>
            </div>
        </div>
    );
};

export { LoginUser };
