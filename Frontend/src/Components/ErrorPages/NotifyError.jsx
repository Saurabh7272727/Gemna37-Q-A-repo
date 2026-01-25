import React from 'react'
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const NotifyError = ({ message }) => {
    const navi = useNavigate();
    if (Array.isArray(message)) {
        return createPortal(
            <div
                className='fixed inset-0 z-[9999] flex items-center justify-center flex-col md:bg-black bg-black/60 backdrop-blur-sm px-3 md:px-6'
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    <span style={{ fontSize: "22px", marginRight: "8px" }}>⚠️</span>
                    <h4 style={{ margin: 0, fontSize: "16px", color: "#f87171" }}>
                        Validation Error
                    </h4>
                </div>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                    {message.map((err, index) => (
                        <li
                            key={index}
                            style={{
                                fontSize: "14px",
                                marginBottom: "6px",
                                color: "#fecaca",
                            }}
                        >
                            <strong>{err.path?.[0] || "Field"}:</strong> {err.message}
                        </li>
                    ))}
                </ul>

                <br />
                <br />
                <button
                    className='w-[50%] bg-indigo-600 hover:bg-indigo-500 transition text-white py-2 rounded-xl'
                    onClick={(e) => navi(-1)}>
                    Back
                </button>
            </div>
            , document.body
        )
    }

    return (
        <>
            <div
                className='fixed inset-0 z-[9999] flex items-center justify-center flex-col md:bg-black bg-black/60 backdrop-blur-sm px-3 md:px-6'>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    <span style={{ fontSize: "22px", marginRight: "8px" }}>⚠️</span>
                    <h4 style={{ margin: 0, fontSize: "16px", color: "#f87171" }}>
                        Validation Error
                    </h4>
                </div>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                    <li
                        style={{
                            fontSize: "14px",
                            marginBottom: "6px",
                            color: "#fecaca",
                        }}
                    >
                        <strong>Field :</strong> {message}
                    </li>
                </ul>
                <br />
                <br />
                <button
                    className='w-full bg-indigo-600 hover:bg-indigo-500 transition text-white py-2 rounded-xl'
                    onClick={(e) => navi(-1)}>
                    Back
                </button>
            </div>
        </>
    )

}

export default NotifyError;