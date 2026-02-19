import React, { useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, CloudUpload, CloudCheck } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import API from '../../../ApiEndPoints/api.js';
import { useSelector } from "react-redux";
import { useQueryClient } from '@tanstack/react-query'

export default function SubjectLinkConfirmationDialog({
    open,
    onClose = null,
    selectedSubject,
}) {

    const api = new API(import.meta.env.VITE_APP_BACKEND_URL);
    const userAttendanceInfo = useSelector(state => state?.AttendanceSlice.AttendanceInfo);
    const queryClient = useQueryClient()
    let controller = new AbortController();

    useLayoutEffect(() => {
        if (open) {
            if (selectedSubject === null || selectedSubject === undefined) {
                alert("something was wrong.. check the crendiantails");
            }
            if (Object.keys(selectedSubject)?.length > 21 || Object.keys(selectedSubject)?.length === 0) {
                alert("Select the valid number of subjects max-21 min-1");
            }
        }
    }, [open]);




    const { data, mutate, status, error, reset } = useMutation({
        mutationFn: (payload = {}) => api.postRequest('/api/subject/link/subject', payload, controller.signal),
        retry: 2,
        signal: controller.signal,
        onSuccess: (data) => {
            if (data.status === 201) {
                queryClient.invalidateQueries({ queryKey: ['user-subjects'] })
                return data;
            } else {
                throw new Error(data.message);
            }
        }
    })

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose(false);
        };
        document.addEventListener("keydown", handleEsc);
        return () => {
            controller.abort();
            reset();
            document.removeEventListener("keydown", handleEsc)
        };
    }, [open]);

    // console.log(selectedSubject);

    const submitHandler = async () => {
        if (controller) {
            controller.abort();
            console.log("Abort signal......")
        }
        return onClose ? onClose(false) : alert("provide onClose Att")
    }


    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="bg-green-100 p-2 rounded-full">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-semibold">
                                    Confirm Subject Linking
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 mt-1">
                                    You have selected <span className="text-blue-600 ring-1 rounded-sm ring-red-600 px-1">
                                        {Object.keys(selectedSubject)?.length}</span> subject's to link with your
                                    account.
                                </p>
                            </div>
                        </div>
                        {
                            status === 'success' && <div>
                                <p className="mb-2">
                                    Please review your selection carefully before proceeding.
                                    <h1 className="text-green-500 font-bold">{data?.message}</h1>
                                    <div className="w-full h-[10%] bg-blue-800/60 flex items-center space-x-1">
                                        <CloudCheck className="w-fit min-h-8 " /><span>successfully done</span>
                                    </div>
                                </p>
                            </div>
                        }

                        {
                            status === 'error' ? <div>
                                <p className="mb-2">
                                    Please review your selection carefully before proceeding.
                                    <h2 className="text-red-700">Your request are cancel , try again</h2>
                                    {
                                        !error?.message.includes('[') && <p className="text-red-800">
                                            {error?.message}
                                        </p>
                                    }
                                </p>
                            </div> :
                                <div className="bg-gray-50 border rounded-xl p-4 text-sm md:text-base text-gray-700 leading-relaxed">
                                    <p className="mb-2">
                                        <h1>Don't be refresh....</h1>
                                        <br />
                                        Please review your selection carefully before proceeding.
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>
                                            Subjects once linked will be used for attendance and session
                                            tracking.
                                        </li>
                                        <li>
                                            You confirm that the selected subjects belong to your current
                                            semester and branch.
                                        </li>
                                        <li>
                                            You accept responsibility for any incorrect selection.
                                        </li>
                                    </ul>
                                </div>
                        }


                        <div className="flex flex-col md:flex-row gap-3 mt-6">
                            {
                                status === 'idle' && <div className="flex w-full flex-col md:flex-row gap-3 mt-6">
                                    <button
                                        onClick={() => {
                                            try {
                                                let ArrayOfIDRelation = Object.values(selectedSubject)
                                                ArrayOfIDRelation = ArrayOfIDRelation.map((item) => {
                                                    return `${item.idRelation}`
                                                }).filter(r => r != null && r != undefined);
                                                mutate({
                                                    studentAttendanceId: userAttendanceInfo?._id,
                                                    ArrayOfIDRelation
                                                });
                                            } catch (error) {
                                                console.log(selectedSubject, error);
                                                mutate();
                                            }

                                        }}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition"
                                    >
                                        SAVE
                                    </button>

                                    <button
                                        onClick={() => submitHandler()}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        CANCEL
                                    </button>
                                </div>
                            }
                            {
                                status === 'pending' && <button
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition"
                                >
                                    <CloudUpload className="w-5 h-5" />
                                    UPLOADING....
                                </button>
                            }
                            {
                                status === 'success' && <button
                                    onClick={() => submitHandler()}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    SUCCESSFULLY LINKED
                                </button>
                            }
                            {
                                status === 'error' && <button
                                    onClick={() => reset()}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-400 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition"
                                >
                                    <XCircle className="w-5 h-5" />
                                    FAILED REQUEST
                                </button>
                            }

                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
