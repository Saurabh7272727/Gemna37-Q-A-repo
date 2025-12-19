import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { SiAuth0 } from 'react-icons/si';
import { HiOutlineShieldCheck } from 'react-icons/hi';

const GoogleStyleAuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleGoogleAuth = async () => {
        const backendURL = import.meta.env.VITE_APP_BACKEND_URL
        window.location.href = `${backendURL}/auth/google`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 flex items-center justify-center p-4 font-['Inter']">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-32 w-80 h-80 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Container */}
            <div className="relative max-w-md w-full">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center mb-6">
                        <div className="bg-white p-4 rounded-2xl shadow-2xl shadow-blue-500/10 border border-blue-100">
                            <SiAuth0 className="text-5xl text-gradient bg-gradient-to-r from-blue-600 to-purple-600" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                        {isLogin ? 'Welcome Back' : 'Get Started'}
                    </h1>
                    <p className="text-lg text-white font-light">
                        {isLogin
                            ? 'Sign in to access your account and continue your journey'
                            : 'Create your account and unlock amazing features'
                        }
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-500/10 border border-white/60 p-10">
                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 mb-8 text-sm text-gray-700 font-medium">
                        <HiOutlineShieldCheck className="text-lg" />
                        Users are only permitted to log in using the same email address that is registered and verified with their GEMID log. Authentication via Google OAuth will be strictly limited to the email address associated with the user's existing GEMID profile.
                    </div>

                    {/* Google Auth Button */}
                    <button
                        onClick={handleGoogleAuth}
                        className="w-full flex items-center justify-center gap-4 px-6 py-4 border-2 border-gray-200 rounded-2xl text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:shadow-lg active:scale-95 group"
                    >
                        <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
                        <span className="text-gray-700 font-semibold">
                            Continue with Google
                        </span>
                    </button>



                    {/* Features List */}
                    <div className="mt-10 pt-8 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                password less
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                dev by - JS37
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                Gemna.ai with Google
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                Fast & secure login
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>By continuing, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a></p>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .text-gradient {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
        </div>
    );
};

export default GoogleStyleAuthPage;