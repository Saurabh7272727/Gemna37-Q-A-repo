// src/components/MessageAlert.jsx
import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

const MessageAlert = ({ type = "info", message = "Something happened!", onClose }) => {
    const getStyles = () => {
        switch (type) {
            case "success":
                return "bg-green-100 text-green-800 border-green-300";
            case "error":
                return "bg-red-100 text-red-800 border-red-300";
            case "warning":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            default:
                return "bg-blue-100 text-blue-800 border-blue-300";
        }
    };

    const getIcon = () => {
        switch (type) {
            case "success":
                return <FaCheckCircle className="text-green-600 text-xl" />;
            case "error":
                return <FaExclamationCircle className="text-red-600 text-xl" />;
            case "warning":
                return <FaExclamationCircle className="text-yellow-600 text-xl" />;
            default:
                return <FaInfoCircle className="text-blue-600 text-xl" />;
        }
    };

    return (
        <div className={`flex items-center gap-3 p-4 mt-5 mx-1 border rounded-xl shadow-sm ${getStyles()} max-w-md mx-auto`}>
            {getIcon()}
            <p className="flex-1 font-medium">{message}</p>
            {
                onClose && <div className={`${getStyles()}`}>Warning</div>
            }
        </div>
    );
};

export default MessageAlert;
