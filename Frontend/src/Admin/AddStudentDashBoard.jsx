import React from 'react'
import Select from "react-select";
import { useState } from 'react';
import StudentCard from './StudentCard';
import { useContext } from 'react';
import { StoreAdminContext } from './store/store.jsx';
import { service } from './store/service.js';
import { useNavigate } from 'react-router-dom';
import Message from '../MessageGemnaCenter/toast.js';
import { ToastContainer } from 'react-toastify';
const branches = [
    { value: "cse", label: "Computer Science" },
    { value: "it", label: "Information Technology" },
    { value: "ece", label: "Electronics" },
    { value: "me", label: "Mechanical" },
];

const courses = [
    { value: "btech", label: "B.Tech" },
    { value: "mtech", label: "M.Tech" },
    { value: "phd", label: "Ph.D." },
];

const years = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
];
const status = [
    { value: "inactive", label: "Inactive" }
]

const AddStudentDashBoard = () => {
    const navi = useNavigate();

    const { dispatch, state } = useContext(StoreAdminContext);
    const [btnLoading, setBtnLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        rollNumber: "",
        fatherName: "",
        motherName: "",
        collegeID: "",
        branch: null,
        course: null,
        year: null,
        status: 'inactive',
        email: "",
        setSubmitBtnDisabled: true
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setFormData({ ...formData, [name]: selectedOption });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required.";
        if (!formData.lastName) newErrors.lastName = "Last name is required.";
        if (!formData.rollNumber) newErrors.rollNumber = "Roll number is required.";
        if (!formData.fatherName) newErrors.fatherName = "Father's name is required.";
        if (!formData.motherName) newErrors.motherName = "Mother's name is required.";
        if (!formData.collegeID) newErrors.collegeID = "College ID is required.";
        if (!formData.branch) newErrors.branch = "Branch is required.";
        if (!formData.course) newErrors.course = "Course is required.";
        if (!formData.year) newErrors.year = "Year is required.";
        if (!formData.status) newErrors.year = "status are by default inactive";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (validate()) {
            setBtnLoading(true);
            dispatch({ type: "LOAD_FORM_INACTIVE", payload: { ...formData, loading: true } });
        }
        const result = await service.sendFormToServer(formData);
        if (result.success) {
            dispatch({ type: "INSERT_IN_LOAD", payload: { ...result?.studentData } });
        } else {
            const message = new Message(result);
            message.setMessage();
            if (state.uploadingList.length >= 0) {
                dispatch({ type: "UNSUCCESS_FULL_UPLAOD" });
            };

            setBtnLoading(false);
            return;
        }
        console.log(result);
        setBtnLoading(false);
    };
    return (
        <>
            <div className='w-full md:h-full h-auto flex md:flex-row space-x-2 flex-col-reverse justify-center items-center'>
                <div className='md:w-[60%] w-full md:h-full h-[60%] rounded-md shadow-sm md:bg-gray-600/30'>
                    <div className="max-w-4xl mx-auto mt-5 md:mt-0 p-6 h-full bg-white shadow-md rounded-lg ">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">GEMID Sign-up Console</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium">First Name</label>
                                <input
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`mt-1 w-full p-2 border rounded-md ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Last Name</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`mt-1 w-full p-2 border rounded-md ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">University Roll Number</label>
                                <input
                                    name="rollNumber"
                                    type="text"
                                    value={formData.rollNumber}
                                    onChange={handleChange}
                                    className={`mt-1 w-full p-2 border rounded-md ${errors.rollNumber ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.rollNumber && <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">College ID</label>
                                <input
                                    name="collegeID"
                                    type="text"
                                    value={formData.collegeID}
                                    onChange={handleChange}
                                    className={`mt-1 w-full p-2 border rounded-md ${errors.collegeID ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.collegeID && <p className="text-red-500 text-sm mt-1">{errors.collegeID}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Father's Name</label>
                                <input
                                    name="fatherName"
                                    type="text"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    className={`mt-1 w-full p-2 border rounded-md ${errors.fatherName ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Mother's Name</label>
                                <input
                                    name="motherName"
                                    type="text"
                                    value={formData.motherName}
                                    onChange={handleChange}
                                    className={`mt-1 w-full p-2 border rounded-md ${errors.motherName ? "border-red-500" : "border-gray-300"}`}
                                />
                                {errors.motherName && <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Branch</label>
                                <Select
                                    name="branch"
                                    options={branches}
                                    value={formData.branch}
                                    onChange={handleSelectChange}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                                {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Course</label>
                                <Select
                                    name="course"
                                    options={courses}
                                    value={formData.course}
                                    onChange={handleSelectChange}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                                {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Year</label>
                                <Select
                                    name="year"
                                    options={years}
                                    value={formData.year}
                                    onChange={handleSelectChange}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                                {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">status</label>
                                <Select
                                    name="status"
                                    options={status}
                                    value={formData.status}
                                    onChange={handleSelectChange}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='write a student email'
                                    className="w-[100%] h-[40px] ring-2 ring-gray-200 pl-3 rounded-sm"
                                />
                            </div>
                            <div className="md:col-span-2">
                                {
                                    btnLoading ? <button
                                        disabled={true}
                                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                                    >Loading...</button> :
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                                        >
                                            Submit
                                        </button>
                                }

                            </div>
                        </form>
                        {
                            !errors.email && <div className="bg-yellow-100 border-l-4 mt-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-4">
                                <p className="font-semibold">Please don’t close or refresh this tab.</p>
                                <p>Your form is being submitted to <strong>Gemna.ai /admin/registeration</strong>. This may take a few seconds.</p>
                            </div>
                        }

                    </div>
                </div>
                <div className='md:w-[30%] w-[90%] md:h-[100%] h-[40%] md:bg-gray-600/20 
                rounded-lg flex flex-col justify-start pt-3 md:pt-0 items-center md:pb-3
                gap-y-3 overflow-y-scroll
                scrollbar-thin scrollbar-thumb-white scrollbar-track-gray-900
                '>
                    {
                        (state?.uploadingList.length == 0) && <div className='pt-5 text-white'>
                            <h1>No form in workspace</h1>
                        </div>
                    }
                    {
                        (Array.isArray(state?.uploadingList) && state.uploadingList.length) &&
                        <div className='w-full h-full md:bg-gray-600/20 
                rounded-lg flex flex-col justify-start pt-3 md:pt-0 items-center md:pb-3
                gap-y-3 overflow-y-scroll
                scrollbar-thin scrollbar-thumb-white scrollbar-track-gray-900
                '>
                            {
                                state?.uploadingList.map((student, index) => {
                                    return (
                                        <StudentCard
                                            firstName={student.firstName}
                                            lastName={student.lastName}
                                            fatherName={student.fatherName}
                                            motherName={student.motherName}
                                            rollNumber={student.rollNumber}
                                            collegeID={student.collegeID}
                                            course={student.course}
                                            branch={student.branch}
                                            year={student.year}
                                            status={student.status}
                                            loading={student.loading}
                                            email={student.email}
                                            key={index} />
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default AddStudentDashBoard;