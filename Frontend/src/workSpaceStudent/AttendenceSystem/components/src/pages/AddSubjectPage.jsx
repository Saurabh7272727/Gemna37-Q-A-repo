import { BookOpen, CheckCircle, GraduationCap, Layers } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Label from '../ui/Label.jsx';
import InfoIcon from '@mui/icons-material/Info';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { useQuery } from "@tanstack/react-query";
import MessageAlert from '../../../../../Components/ErrorPages/ErrorMessagePage.jsx'
import { useNavigate } from 'react-router-dom';
import { decryptData } from '../../../../../Auth/Encryption/jsondataEncryption.js';
import SubjectTeacherPreview from '../ui/SubjectTeacherPreview.jsx';
import Avatar from '@mui/material/Avatar';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Select from 'react-select';
import MagicButton from '../../MagicButton.jsx';
import { AddSelectedSubject } from '../../../../../ReduxStore/Slices/AttendanceSlice.js'
import { SubjectTeacherRelationArraySchema } from '../../../../Zod/selectedSubjectSchema.js';

export default function SubjectAddPage() {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const hasSet = useRef(false);
    const baseDataRef = useRef([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const userInformation = useSelector(state => state?.userinfoSlice.user);
    const userAttendanceInformation = useSelector(state => state?.AttendanceSlice);
    const [queryData, setQueryData] = useState([]);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState();
    const options = [
        { value: 'THEORY', label: 'THEORY' },
        { value: 'LAB', label: 'LAB' },
        { value: 'SKILL DEVELOPEMENT', label: 'SKILL DEVELOPEMENT' },
        { value: 'ALL', label: 'ALL SUBJECT' }
    ];

    const [selectedOption, setSelectedOption] = useState({ value: 'ALL', label: 'ALL SUBJECT' });
    const toggleSubject = (id) => {
        setSelectedSubjects((ids = []) => {
            return ids.includes(id)
                ? ids.filter((x) => x !== id)
                : [...ids, id];
        });
    };

    const sessionToken = sessionStorage.getItem('sessionToken');
    const decryptedSession = decryptData(sessionToken);

    const getAllSubject = async () => {
        try {
            let token = localStorage.getItem("jwt_token");
            token = decryptData(token);
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/subject/get`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token?.jwt_token}`
                },
                body: JSON.stringify({
                    sessionToken: { ...decryptedSession },
                    queryToken: {
                        semester: Number(userAttendanceInformation?.AttendanceInfo?.semester),
                        department: "CS_IT"
                    }
                })
            });

            const result = await response.json();
            if (!result?.success) {
                throw new Error(`${result.message}`)
            };
            return result.message;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    //  "is" prefix are mark as return boolean value
    const { isError, error, data, isLoading, isSuccess, isFetchedAfterMount } = useQuery({
        queryKey: ['subjectFetch', `${userAttendanceInformation?.AttendanceInfo?.semester}`],
        gcTime: 5 * 60 * 1000,
        staleTime: 3 * 60 * 1000,
        queryFn: getAllSubject,
        retry: 2,
        enabled: !!userAttendanceInformation?.AttendanceInfo?.semester
    })

    useEffect(() => {
        if (isSuccess && !hasSet.current) {
            baseDataRef.current = data;
            setQueryData(data);
            hasSet.current = true;
        }

    }, [isSuccess, data]);

    if (isError) {
        console.log(error);
    }

    if (isLoading) {
        return (
            <>
                <MessageAlert type={"success"} message={`loading...`} onClose={false} />
            </>
        )
    }

    const filterHandler = (e) => {
        const { value } = e;
        setSelectedOption(e);
        switch (value) {
            case "LAB":
                setQueryData(
                    baseDataRef.current.filter(
                        subject => subject?.subjetId?.type === "LAB"
                    )
                );
                break;
            case "THEORY":
                setQueryData(
                    baseDataRef.current.filter(
                        subject => subject?.subjetId?.type === "THEORY"
                    )
                );
                break;
            default:
                setQueryData(baseDataRef.current);
        }
    };
    const submitSelectedSubjectInRedux = (setOpen) => {
        setOpen(true);
        const totalSelectedSubject =
            baseDataRef.current.filter(subject =>
                selectedSubjects.includes(String(subject?._id))
            );

        if (totalSelectedSubject.length <= 14) {
            const parsed = SubjectTeacherRelationArraySchema.safeParse(totalSelectedSubject);
            if (!parsed.success) {
                alert(`something was wrong with you`);
                setOpen(false);
                return;
            }
            dispatch(AddSelectedSubject(parsed?.data));
            navi('/app/attendence/profile');
        } else {
            alert(`Maximum 14 subjects allowed. You selected ${totalSelectedSubject.length}`);
        }
        setOpen(false);
    };


    return (
        <>
            {
                open ? <SubjectTeacherPreview
                    open={open}
                    onClose={() => setOpen(false)}
                    data={selected}
                /> : " "
            }
            <div className="min-h-screen h-fit bg-slate-900 p-6 text-white">
                <div className="max-w-6xl mx-auto mb-6">
                    <h1 className="md:text-2xl text-[23px] font-bold flex items-center gap-2">
                        <GraduationCap className="text-indigo-400" />
                        Link Your Subjects
                    </h1>
                    <br />
                    <p className="text-slate-400 mt-1">
                        Choose the subjects you are currently studying
                    </p>
                    <p className="text-green-400 mt-1 text-[15px] md:text-xl 
                 font-bold text-nowrap whitespace-nowrap overflow-ellipsis overflow-hidden">
                        Email - {userInformation?.email ? userInformation?.email : "Invalid user"}
                    </p>
                </div>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <InfoCard icon={Layers} label="Branch" value={`${userInformation?.ref_id?.branch?.label}`} />
                    <InfoCard icon={BookOpen} label="Academic Year" value={`${userInformation?.ref_id?.year?.label}`} />
                    <InfoCard
                        icon={CheckCircle}
                        label="Semester"
                        value={`${userAttendanceInformation?.AttendanceInfo?.semester}`}
                    />
                    <InfoCard
                        icon={CheckCircle}
                        label="Category"
                        value={`${userAttendanceInformation?.AttendanceInfo?.category}`}
                    />
                    <InfoCard
                        icon={ScatterPlotIcon}
                        label="Selected"
                        value={`${selectedSubjects.length} Subjects`}
                    />
                </div>
                <hr />
                <br />
                <Select
                    defaultValue={selectedOption}
                    onChange={filterHandler}
                    options={options}
                    className="md:w-[50%] text-nowrap whitespace-nowrap overflow-ellipsis max-w-[90%] content-center mx-auto my-5 text-black"
                    placeholder={"Select theory & lab or Search Subject-Code"}
                />
                {
                    isError ?
                        <MessageAlert type={"error"} message={`fetching failed - ${error.message}`} onClose={true} />
                        : <div className="max-w-6xl mx-auto grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {queryData?.map((subject, index) => {
                                const active = selectedSubjects.includes(subject?._id);
                                return (
                                    <div
                                        key={subject?._id}
                                        onClick={() => toggleSubject(subject?._id)}
                                        className={`cursor-pointer rounded-xl border p-4 transition-all md:col-span-1 col-auto 
                                     ${active
                                                ? "border-indigo-500 bg-sky-500/40"
                                                : "border-slate-700 bg-slate-800 hover:border-slate-500"
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
                                                    <Label css={"mt-3 md:inline w-fit mb-3 bg-sky-400/30 mr-2 transform md:scale-45 text-sm scale-10"}
                                                        text={`${subject?.subjetId?.subjectCode}`} />
                                                    <Label css={`mt-3 md:inline ${subject?.subjetId?.type === "LAB" ? "bg-gray-900/30" : "bg-sky-400/30"}  w-fit mb-3 mr-2 transform md:scale-45 text-sm scale-10`}
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

                                            {active && (
                                                <CheckCircle className="text-green-600" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                }
                {
                    isError ?
                        <div className="max-w-6xl mx-auto mt-10 flex justify-end">
                            <button
                                onClick={() => navi('/')}
                                className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium"
                            >
                                Go to Home
                            </button>
                        </div>
                        : <div className="max-w-6xl mx-auto mt-10 flex justify-end">
                            <MagicButton
                                text={"Link Selected Subjects"}
                                submitHandler={submitSelectedSubjectInRedux}
                                css={"text-black transform scale-45"}
                            />
                        </div>
                }
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-4 mb-8">
                <InfoCard icon={BeenhereIcon} label={"Gemna World"} value={`Attendance-bit@gemna.ai`} />
            </div>

        </>

    );
}


function InfoCard({ icon: Icon, label, value }) {
    return (
        <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="p-3 bg-slate-700 rounded-lg">
                <Icon className="text-indigo-400" />
            </div>
            <div>
                <p className="text-sm text-slate-400">{label}</p>
                <p className="font-semibold">{value}</p>
            </div>
        </div>
    );
}
