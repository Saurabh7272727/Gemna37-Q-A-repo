import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from '@mui/material/Avatar';
import { CheckCircle } from "lucide-react";
import Label from '../ui/Label.jsx';
import InfoIcon from '@mui/icons-material/Info';
import SubjectTeacherPreview from '../ui/SubjectTeacherPreview.jsx';
import EditIcon from '@mui/icons-material/Edit';
import { deleteSubjectLocal } from '../../../../../ReduxStore/Slices/AttendanceSlice.js';
import MagicButton from '../../MagicButton.jsx';
import SubjectLinkConfirmationDialog from '../ui/ConfirmationDiaLog.jsx'
import UserSubjectsTable from '../ui/AttendanceTable.jsx';

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState("linked");
    const [showConLetter, setShowConLetter] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state?.userinfoSlice.user.ref_id);
    const selectedSubject = useSelector(state => state?.AttendanceSlice?.SelectedSubjectRecord);
    const linkedSubjects = useMemo(() => [] || [], [user, selectedSubject]);



    const unlinkedSubjects = useMemo(() => {
        if (selectedSubject == undefined || selectedSubject == null) {
            return [];
        } else {
            return Object.values(selectedSubject)
        }
    }, [user, selectedSubject]);


    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState();

    const [editSelectedSubject, setEditSelectedSubject] = useState(false);

    const editHandler = () => {
        setEditSelectedSubject(!editSelectedSubject);
    }

    const deleteSelectedItem = (subject) => {
        dispatch(deleteSubjectLocal(subject?._id));
    }

    const submitSelectedSubjectInRedux = async (setOpen) => {
        setOpen(true);
        await new Promise((res, rej) => setTimeout(() => res(), 2000))
        setOpen(false);
        setShowConLetter(true)
    }

    return (
        <>
            {
                open ? <SubjectTeacherPreview
                    open={open}
                    onClose={() => setOpen(false)}
                    data={selected}
                /> : " "
            }
            <div className="min-h-screen bg-gray-900 text-gray-100 md:p-8">
                <SubjectLinkConfirmationDialog open={showConLetter}
                    onClose={setShowConLetter} selectedSubject={selectedSubject} />
                <div className="max-w-6xl w-[80vw] -z-10 mx-auto bg-gray-800 rounded-2xl shadow-xl md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <img
                            src={user?.imageURL}
                            alt="profile"
                            loading="lazy"
                            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                        />

                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
                            <Info label="Name" value={`${user?.firstName} ${user?.lastName}`} />
                            <Info label="Roll No" value={user?.rollNumber} />
                            <Info label="Course" value={user?.course?.label} />
                            <Info label="Branch" value={user?.branch?.label} />
                            <Info label="Year" value={user?.year?.label} />
                            <Info label="Status" value={user?.status?.label} />
                            <Info label="Email" value={user?.email} />
                            <Info label="College ID" value={user?.collegeID} />
                        </div>
                    </div>
                    <div className="mt-10 md:py-10">
                        <div className="flex gap-4 border-b border-gray-700 relative ">
                            <TabButton
                                active={activeTab === "linked"}
                                onClick={() => setActiveTab("linked")}
                                label="Linked Subjects"
                            />
                            <TabButton
                                active={activeTab === "unlinked"}
                                onClick={() => setActiveTab("unlinked")}
                                label="Unlinked Subjects"
                            />
                            {
                                editSelectedSubject ? <button
                                    className="absolute right-0 bottom-1 hover:cursor-pointer py-1 px-4 bg-blue-600 text-white"
                                    onClick={() => editHandler()}>
                                    Save
                                </button> :
                                    <p className="absolute right-0 bottom-1 hover:cursor-pointer"
                                        onClick={() => editHandler()}
                                    >
                                        <Label text={<EditIcon />} css={'mt-2 transform md:scale-75 bg-blue-400/30  text-sm scale-50 '} />
                                    </p>
                            }

                        </div>

                        <div className="mt-6 grid grid-cols-2 grid-rows-2 md:grid-cols-3 gap-1 md:gap-4">
                            {(activeTab === "linked" ? linkedSubjects : unlinkedSubjects).map(
                                (subject) => (
                                    <div
                                        key={subject?._id}
                                        onClick={(e) => {
                                            if (editSelectedSubject) {
                                                deleteSelectedItem(subject);
                                            }
                                        }}
                                        className={`cursor-pointer rounded-xl border p-4 transition-all md:col-span-1 col-auto
                                          ${editSelectedSubject
                                                ? "border-slate-700 bg-slate-800 hover:border-slate-500"
                                                : "border-indigo-500 bg-sky-500/40"
                                            }
                                    `}
                                    >
                                        <Avatar alt={"Cover Image"} src={`${subject?.subjetId?.coverImage}`} className="m-1" />
                                        <div className="flex items-start justify-between relative">
                                            <div>
                                                <h3 className="font-semibold md:text-lg text-[16px]">
                                                    {subject.subjetId?.name}
                                                </h3>
                                                <p className="text-sm text-slate-400">
                                                    <br />
                                                    <Label css={"mt-3 -z-10 md:inline w-fit mb-3 bg-sky-400/30 mr-2 transform md:scale-45 text-sm scale-10"}
                                                        text={`${subject?.subjetId?.subjectCode}`} />
                                                    <Label css={`mt-3 -z-10 md:inline ${subject?.subjetId?.type === "LAB" ? "bg-gray-900/30" : "bg-sky-400/30"}  w-fit mb-3 mr-2 transform md:scale-45 text-sm scale-10`}
                                                        text={`${subject?.subjetId?.type}`} />
                                                    <span className="  font-semibold text-nowrap text-yellow-700">• Semester {subject?.subjetId?.semester}</span>
                                                </p>
                                                <p className="absolute right-0 bottom-0" title="Information about" onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelected(subject);
                                                    setOpen(true);
                                                }}>
                                                    <Label text={<InfoIcon />} css={'mt-2 transform md:scale-75 bg-sky-400/30  text-sm scale-50'} />
                                                </p>

                                            </div>
                                            {(!editSelectedSubject) && (
                                                <CheckCircle className="text-green-600" />
                                            )}
                                        </div>
                                    </div>
                                )
                            )}

                            {activeTab === "linked" &&
                                <div className="  h-fit bg-green-600">
                                    <UserSubjectsTable />
                                </div>
                            }
                        </div>
                        {
                            ((activeTab === 'unlinked') && (!editSelectedSubject)) ? <MagicButton
                                text={"UPLOAD"}
                                submitHandler={submitSelectedSubjectInRedux}
                                css={"text-black transform scale-45 "}
                            /> : ""
                        }
                    </div>
                </div>
            </div>

        </>
    );
}

function Info({ label, value }) {
    return (
        <div className="bg-gray-900 rounded-xl p-3 text-wrap">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="font-medium text-clip overflow-scroll scrollbar-none">{value || "—"}</p>
        </div>
    );
}

function TabButton({ label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`pb-3 px-1 text-sm font-medium transition border-b-2 ${active
                ? "border-indigo-500 text-indigo-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
        >
            {label}
        </button>
    );
}
