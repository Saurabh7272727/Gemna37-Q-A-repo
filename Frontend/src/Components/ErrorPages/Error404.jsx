import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const recentPages = ['/dashboard', '/settings', '/help']; // Optional dynamic list

export default function Error404() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Error404 page render");
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-10 rounded-xl shadow-lg max-w-xl text-center"
            >
                <div className="text-6xl font-bold text-indigo-600 mb-4">404</div>
                <h1 className="text-2xl font-semibold mb-2 text-gray-800">Oops! Page not found</h1>
                <p className="text-gray-500 mb-6">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>
                {/* Navigation Buttons */}
                <div className="flex justify-center space-x-4 mb-6 md:text-[19px] text-[10px] text-nowrap">
                    <Link
                        to="/"
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Go Home
                    </Link>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                    >
                        Go Back
                    </button>
                    <Link
                        to="/contact"
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Contact Support
                    </Link>
                </div>
                <p className='p-2 text-red-600'>Gemna.support not found</p>
            </motion.div>
        </div>
    );
}
