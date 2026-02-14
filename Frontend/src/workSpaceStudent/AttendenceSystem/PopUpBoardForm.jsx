import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentAttendanceSchema } from "../Zod/AttendanceSchema.js";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import API from './ApiEndPoints/api.js';
import { useNavigate } from 'react-router-dom';
import { AttendanceInfoLoad } from '../../ReduxStore/Slices/AttendanceSlice.js'

function Input({ label, error, children, errorVerifiedBy }) {
    return (
        <div className="space-y-1">
            <label className={`text-sm text-gray-300 ${label === "Semester" || label === 'Mobile Number' ? "text-green-600" : "text-gray-300"}`}>
                {label}
            </label>
            {children}
            {error && (
                <p className="text-red-500 text-xs">
                    <p>By-{errorVerifiedBy}</p>
                    {error}
                </p>
            )}
        </div>
    );
}

export default function StudentAttendanceForm() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState({
        error: false,
        message: ""
    });
    const navi = useNavigate();
    const api = new API(import.meta.env.VITE_APP_BACKEND_URL);
    const userInformation = useSelector(state => state?.userinfoSlice?.user);
    const userFullName = `${userInformation?.ref_id?.firstName} ${userInformation?.ref_id?.lastName}`;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(studentAttendanceSchema),
        defaultValues: {
            category: "REGULAR",
            honestyScore: 0.2
        }
    });

    const submitVerify = async (data) => {
        setLoading(true);
        try {
            const result = await api.postRequest('/api/attendance/register/user', {
                sessionToken: sessionStorage.getItem('sessionToken') ?? undefined,
                payload: {
                    ...data
                }
            });

            if (!result) {
                throw new Error("Error on api object", result);
            }

            if (result?.local) {
                return console.log(result);
            }

            if (!(result?.status === 200 && result?.success)) {
                setLoading(false);
                setErrorState({ error: true, message: result.message });
                return;
            } else {
                sessionStorage.setItem("sessionToken", result?.sessionToken);
                dispatch(AttendanceInfoLoad(result?.StudentAttendanceModel))
                navi('/app/attendence/verify?college=bit&secure=true');
            }
        } catch (error) {
            setErrorState({ error: true, message: error.message });
            setLoading(false);
        }
    }

    return createPortal(
        <div
            className="top-[550px] md:top-[100px] cursor-not-allowed absolute inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-3 md:px-6">
            <div className="flex md:flex-row flex-col w-full px-0 md:px-2">
                <div className="min-h-screen md:w-[60%] sm:w-[90%] w-[100%] flex items-center justify-center bg-gray-900/0 px-4">
                    <form
                        onSubmit={handleSubmit(submitVerify)}
                        className="w-full max-w-lg bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-green-500">
                            Complete Your Registration
                        </h2>

                        <Input label="GEMIDLOG" error={errors.gemidlog?.message} errorVerifiedBy={"Zod & RHF"}>
                            <input
                                {...register("gemidlog")}
                                placeholder="Mongo ObjectId"
                                value={userInformation?.ref_id?._id}
                                className="input"
                                disabled
                                type="password"
                            />
                        </Input>

                        <Input label="Name" error={errors.name?.message} errorVerifiedBy={"Zod & RHF"}>
                            <input
                                {...register("name")}
                                placeholder="Student name"
                                className="input"
                                value={userFullName}
                                disabled
                            />
                        </Input>

                        <Input label="Semester" error={errors.semester?.message} errorVerifiedBy={"Zod & RHF"}>
                            <input
                                {...register("semester")}
                                placeholder="Semester"
                                className="input"
                            />
                        </Input>

                        <Input label="Mobile Number" error={errors.mobileNumber?.message} errorVerifiedBy={"Zod & RHF"}>
                            <input
                                {...register("mobileNumber")}
                                placeholder="10 digit number"
                                className="input"
                            />
                        </Input>

                        <Input label="Category" error={errors.category?.message} errorVerifiedBy={"Zod & RHF"}>
                            <select {...register("category")} className="input">
                                <option value="REGULAR">Regular</option>
                                <option value="X_STUDENT">Ex Student</option>
                                <option value="LATERAL_STUDENT">
                                    Lateral Student
                                </option>
                                <option value="RE_ADMISSION">
                                    Re Admission
                                </option>
                            </select>
                        </Input>

                        <Input label="Honesty Score" error={errors.honestyScore?.message} errorVerifiedBy={"Zod & RHF"}>
                            <input
                                type="number"
                                step="0.1"
                                {...register("honestyScore", {
                                    valueAsNumber: true
                                })}
                                className="input"
                                disabled
                            />
                        </Input>
                        {errorState.error ? <h1 className='text-red-600 font-bold'>Something was wrong with you....</h1> : ""}
                        <button
                            type="submit"
                            className={`ring-2 cursor-pointer ring-blue-600 float-right mt-5 w-fit flex justify-center text-white px-8 py-2`}
                        >{loading ? "PROCESSING.." : "SUBMIT"}</button>

                    </form>
                </div>
                <div
                    style={{
                        background: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "16px",
                        padding: "20px",
                        color: "#e5e7eb",
                        marginBottom: "24px",
                        lineHeight: "1.6",
                        height: '90%'
                    }}

                    className="md:mt-[10%] mt-0"
                >
                    <h2 style={{ fontSize: "20px", marginBottom: "12px", color: "#38bdf8" }}>
                        📌 Important Instructions (Read Carefully)
                    </h2>

                    <ul style={{ paddingLeft: "18px" }}>
                        <li>
                            1. <strong>Name</strong> and 🆔 <strong>GEMIDLOG</strong>{" "}
                            are <strong>auto-verified</strong> and{" "}
                            <strong>cannot be edited</strong>.
                        </li>

                        <li>
                            2. <strong>Please Enter Mobile Number, Unregistred Number</strong>.
                            <strong style={{ color: "red" }}>else you see "something was wrong..."</strong>.
                        </li>

                        <li>
                            3. Select your <strong>Semester</strong> and{" "}
                            <strong>Category</strong> carefully. Wrong details may lead to
                            rejection.
                        </li>

                        <li>
                            4. <strong>Honesty Score</strong> is{" "}
                            <strong>system-generated</strong> and{" "}
                            <strong>not changeable</strong>.
                        </li>

                        <li>
                            5. Your data is <strong>secure & encrypted</strong> and used only for
                            academic purposes.
                        </li>

                        <li>
                            ⚠️ Do not submit the form multiple times to avoid duplication.
                        </li>
                    </ul>

                    <p style={{ marginTop: "14px", color: "#94a3b8" }}>
                        ✅ if any problem are occur during registration, due to logout or close the tab and try again
                        <br />
                        🤝 Your honesty ensures a fair academic environment.
                    </p>
                </div>
            </div>
        </div>

        , document.body
    )
}


