import React from "react";

const PulseLoadingSpinner = ({ className = '' }) => {
    return (
        <div className={`flex justify-center pl-[170px] sm:pl-[230px] md:pl-[0px] items-center ${className}`}>
            <div className="relative">
                <div className="w-12 h-12 rounded-full bg-blue-500 opacity-75 animate-ping absolute inset-0"></div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            </div>
        </div>
    );
};


export { PulseLoadingSpinner };