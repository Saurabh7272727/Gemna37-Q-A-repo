import React from 'react';
import {
    FaCheckCircle,
    FaUser,
    FaUsers,
    FaGraduationCap,
    FaCodeBranch,
    FaIdCard,
    FaClock
} from 'react-icons/fa';
import { SiMinutemailer } from "react-icons/si";

const StudentDetailsDisplay = ({ responseData }) => {
    const {
        message,
        redirect_path,
        status,
        status_message,
        success,
        timestamp,
        data,
    } = responseData;

    if (!success) {
        return (
            <div className="max-w-2xl mx-auto p-6 bg-gray-900">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <FaCheckCircle className="text-red-500 text-4xl mx-auto mb-3" />
                    <h2 className="text-red-800 font-bold text-xl mb-2">No Student Data Found</h2>
                    <p className="text-red-600">{status_message || 'Unable to retrieve student information'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 bg-slate-900">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-2xl p-6 text-white text-center">
                <div className="flex items-center justify-center mb-3">
                    <FaCheckCircle className="text-3xl mr-3" />
                    <h1 className="text-2xl font-bold">GEMID Found Successfully!</h1>
                </div>
                <p className="text-green-100">{message}</p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
                {/* Status Information */}
                <div className="border-b border-gray-100 p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                            <FaClock className="text-gray-500 mr-2" />
                            <span className="text-gray-600">Timestamp: </span>
                            <span className="ml-2 font-medium">
                                {new Date(timestamp).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${status === 200 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                            <span className="text-gray-600">Status: </span>
                            <span className="ml-2 font-medium">{status} - {status_message}</span>
                        </div>
                    </div>
                </div>

                {/* Student Details */}
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                        <FaUser className="mr-2 text-blue-500" />
                        Student Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* GEMID Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                            <div className="flex items-center mb-3">
                                <FaIdCard className="text-blue-600 text-xl mr-2" />
                                <h3 className="font-semibold text-blue-800">GEMID</h3>
                            </div>
                            <div className="text-2xl font-bold text-blue-900 bg-white py-3 px-4 rounded-lg shadow-inner">
                                {data.GEMID}
                            </div>
                            <p className="text-sm text-blue-600 mt-2">Unique Student Identifier</p>
                        </div>

                        {/* Personal Information */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                <p className="text-lg font-semibold text-gray-800">{data.NAME}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                                        <FaUsers className="mr-1 text-sm" /> Father's Name
                                    </label>
                                    <p className="font-medium text-gray-800">{data.FATHERNAME}</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
                                        <FaUsers className="mr-1 text-sm" /> Mother's Name
                                    </label>
                                    <p className="font-medium text-gray-800">{data.MOTHERNAME}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Information */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <FaGraduationCap className="mr-2 text-purple-500" />
                            Academic Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                                <div className="flex items-center mb-3">
                                    <FaGraduationCap className="text-purple-600 mr-2" />
                                    <h4 className="font-semibold text-purple-800">Course</h4>
                                </div>
                                <p className="text-lg font-medium text-purple-900 bg-white py-2 px-4 rounded-lg">
                                    {data.COURSE}
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                                <div className="flex items-center mb-3">
                                    <FaCodeBranch className="text-green-600 mr-2" />
                                    <h4 className="font-semibold text-green-800">Branch</h4>
                                </div>
                                <p className="text-lg font-medium text-green-900 bg-white py-2 px-4 rounded-lg">
                                    {data.BRANCH}
                                </p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
                                <div className="flex items-center mb-3">
                                    <SiMinutemailer className="text-green-600 mr-2" />
                                    <h4 className="font-semibold text-green-800">Email</h4>
                                </div>
                                <p className="font-medium text-sm text-green-900 bg-white py-2 px-4 rounded-lg">
                                    {data.EMAIL}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 border-t border-gray-100 p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600">
                            Student record verified and authenticated
                        </p>
                        {redirect_path && (
                            <button
                                onClick={() => window.location.href = redirect_path}
                                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-md"
                            >
                                Continue to Portal
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Success Animation */}
            <div className="text-center mt-8">
                <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-ping mr-2"></div>
                    <span className="text-sm text-green-800 font-medium">Student record verified successfully</span>
                </div>
            </div>
        </div>
    );
};



export default StudentDetailsDisplay;