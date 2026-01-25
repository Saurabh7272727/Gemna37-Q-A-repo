import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentAttendanceSchema } from "../Zod/AttendanceSchema.js";
import { createPortal } from "react-dom";


function Input({ label, error, children, errorVerifiedBy }) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-gray-300">
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

    const onSubmit = (data) => {
        console.log("FORM DATA ✅", data);
    };

    return createPortal(
        <div
            className="top-[550px] md:top-[100px] cursor-not-allowed absolute inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-3 md:px-6">
            <div className="flex md:flex-row flex-col w-full px-0 md:px-2">
                <div className="min-h-screen md:w-[60%] sm:w-[90%] w-[100%] flex items-center justify-center bg-gray-900/0 px-4">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="w-full max-w-lg bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4"
                    >
                        <h2 className="text-xl font-semibold text-green-500">
                            Complete Your Registration
                        </h2>

                        <Input label="GEMIDLOG" error={errors.gemidlog?.message} errorVerifiedBy={"Zod & RHF"}>
                            <input
                                {...register("gemidlog")}
                                placeholder="Mongo ObjectId"
                                className="input"
                            />
                        </Input>

                        <Input label="Name" error={errors.name?.message} errorVerifiedBy={"Zod & RHF"}>
                            <input
                                {...register("name")}
                                placeholder="Student name"
                                className="input"
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

                        <button className="w-full bg-indigo-600 hover:bg-indigo-500 transition text-white py-2 rounded-xl">
                            Verify
                        </button>
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
                            2. <strong>Mobile number verification is mandatory</strong>.
                            OTP will be sent via <strong>WhatsApp</strong>.
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
                        ✅ After successful OTP verification, you can proceed with submission.
                        <br />
                        🤝 Your honesty ensures a fair academic environment.
                    </p>
                </div>
            </div>
        </div>

        , document.body
    )
}


