import payloadSchema from '../ZodSchema/AttendanceSchema/fetchRelatedSubjectSchema.js';
import SubjectAndTeacherSessionSchema from '../../model/Attendence_Section/SubjectAndTeacherSessionSchema.js';
import StudentWithSubjectSchema from '../../model/Attendence_Section/StudentWithSubjectSchema.js'
import { payloadSchemaLinked, checkSchema1 } from '../ZodSchema/AttendanceSchema/linkedSubjectZods.js';
import { scheduleSubject } from '../ZodSchema/AttendanceSchema/ScheduleSubject.js'

const fetchRelatedSubjectByStudent = async (req, res) => {

    const bodyData = req.body;

    if (!bodyData || Object.keys(bodyData).length === 0) {
        return (
            res.status(401).json({
                message: "Payload are missing",
                success: false,
                status: 401
            })
        )
    }

    try {
        const ValidateTheBodyDataBYZOD = payloadSchema.safeParse(bodyData);
        if (!ValidateTheBodyDataBYZOD?.success) {
            const parseJSON = JSON.parse(ValidateTheBodyDataBYZOD?.error?.message);
            return (
                res.status(400).json({
                    message: parseJSON,
                    success: false,
                    status: 400
                })
            )
        }

        if (ValidateTheBodyDataBYZOD?.success) {
            const relations = await SubjectAndTeacherSessionSchema.find().populate({
                path: "subjetId",
                match: {
                    semester: ValidateTheBodyDataBYZOD?.data?.queryToken.semester,
                    department: ValidateTheBodyDataBYZOD?.data?.queryToken.department
                },
                select: "name department semester weeklyFrequency shortName subjectCode type credit attendanceWeight coverImage"
            })
                .populate({
                    path: "teacherId",
                    select: "name shortName position coverImage createdAt updatedAt"
                })
                .lean();
            const filteredRelations = relations.filter(r => r.subjetId);

            const filterdataOnlyID = filteredRelations
                .map(subject => subject?.idRelation)
                .filter(id => id !== null && id !== undefined && id !== "");

            let aggregate = undefined;

            if (filterdataOnlyID.length > 0 && Array.isArray(filterdataOnlyID)) {
                aggregate = await SubjectAndTeacherSessionSchema.aggregate([
                    {
                        $match: {
                            idRelation: { $in: filterdataOnlyID }
                        }
                    },
                    {
                        $lookup: {
                            from: "teacherschemas",
                            localField: "teacherId",
                            foreignField: "_id",
                            as: "teacherData"
                        }
                    },
                    {
                        $unwind: {
                            path: "$teacherData",
                            preserveNullAndEmptyArrays: false
                        }
                    },
                    {
                        $group: {
                            _id: "$teacherData.name",
                            totalSubjectOfTeacher: { $sum: 1 }
                        }
                    },
                    {
                        $project: {
                            teacherName: "$_id",
                            _id: 0,
                            totalSubjectOfTeacher: 1
                        }
                    }
                ]);

            }
            return (
                res.status(200).json({
                    message: filteredRelations,
                    success: true,
                    aggregate,
                    status: 200
                })
            )
        } else {
            throw new Error("Server error")
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
            status: 500
        })
    }
}



const linkTheRelatedSubject = async (req, res) => {

    const bodyData = req.body;
    const controller = new AbortController();

    // config user disconnect and connection are not proper establish;
    res.on("close", () => {
        controller.abort();
        // console.log("connection was disconnect");
    })

    req.on('aborted', () => {
        controller.abort();
        // console.log("connection was aborted");
    })

    // end ==============================================================


    if (bodyData === undefined || bodyData === null) {
        return (
            res.status(401).json({
                message: "Payload are missing",
                success: false,
                status: 401
            })
        )
    }

    try {
        const parsed = payloadSchemaLinked.safeParse(bodyData);
        if (!parsed.success) {
            throw new Error(parsed.error);
        }
        const { studentAttendanceId, ArrayOfIDRelation } = parsed.data;
        const findCurrentUser = await StudentWithSubjectSchema.findOne({ studentAttendanceId: studentAttendanceId }, null, {
            signal: controller.signal
        })
        if (findCurrentUser == undefined || findCurrentUser == null) {
            const { success, filterRelation } = await ValidateLengthAndCheck(ArrayOfIDRelation);
            if (success && Array.isArray(filterRelation)) {
                const insertNewEntry = new StudentWithSubjectSchema({
                    studentAttendanceId: studentAttendanceId,
                    subjectList: filterRelation
                });

                await insertNewEntry.save({ signal: controller.signal });
                res.status(201).json({
                    message: `${filterRelation.length} subjects are added on your account`,
                    success: true,
                    status: 201
                })
                return;
            }
        } else {
            if (!Array.isArray(findCurrentUser?.subjectList) || findCurrentUser?.subjectList.length >= 21
            ) {
                res.status(403).json({
                    message: `You have already 21 subject in account`,
                    success: false,
                    status: 403
                })
                return;
            }

            const checkLength = (21 - findCurrentUser?.subjectList.length
                >= ArrayOfIDRelation.length) ? true : false;

            if (!checkLength) {
                res.status(403).json({
                    message: `The maximum subject required 21`,
                    success: false,
                    status: 403
                })
                return;
            }

            const { success, filterRelation } = await ValidateLengthAndCheck(ArrayOfIDRelation);
            if (success && Array.isArray(filterRelation)) {
                let checkDuplicatedValue = findCurrentUser.subjectList;

                // Here we check SATSS_ID are already not have a part of list , if it's a part of then avoid it and 
                // check next SASS_ID 
                let resultAfterValidation = filterRelation.filter((item) => {
                    return !checkDuplicatedValue.some(saas => item?.SATSS_ID.toString() === saas?.SATSS_ID.toString())
                });

                // checks , what if all subject relation already have a part of linked list of subject
                if (!Array.isArray(resultAfterValidation) || resultAfterValidation.length <= 0) {
                    res.status(403).json({
                        message: `Request Failed : All subjects are already part of it.. account`,
                        success: false,
                        status: 403
                    })
                    return;
                }

                await StudentWithSubjectSchema.updateOne(
                    { studentAttendanceId },
                    {
                        $addToSet: {
                            subjectList: { $each: resultAfterValidation }
                        }
                    },
                    {
                        signal: controller.signal
                    }
                );
                res.status(201).json({
                    message: `${resultAfterValidation.length} subjects are added on your account`,
                    success: true,
                    status: 201
                })
                return;
            }

            throw new Error();
        }
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Subject already linked",
                success: false,
                status: 409
            });
        }
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
            status: 500
        })
    }
}



async function ValidateLengthAndCheck(ArrayOfIDRelation = [], insert = false) {
    if (ArrayOfIDRelation.length === 0 || ArrayOfIDRelation.length > 21) {
        throw new Error("Provide a ArrayOfIDRelation or length are exseed")
    }

    const lengthArrayOfIDRelation = ArrayOfIDRelation.length;
    try {
        let findRelation = await SubjectAndTeacherSessionSchema.find({
            idRelation: { $in: [...new Set(ArrayOfIDRelation)] }
        }).select('_id subjetId teacherId idRelation');

        // console.log("Fliter =======>", filterRelation);

        if (Array.isArray(findRelation)
            && findRelation.length > 0
            && lengthArrayOfIDRelation === findRelation.length) {

            // Mapped the findRelation in valid Schema =============================================
            findRelation = findRelation.map((gg) => {
                return {
                    idRelation: gg.idRelation.toString(),
                    subjetId: gg.subjetId.toString(),
                    teacherId: gg.teacherId.toString(),
                    _id: gg._id.toString()
                }
            })

            const parsed = checkSchema1.safeParse(findRelation);
            if (!parsed.success)
                throw parsed.error;

            const filterRelation = findRelation.map((item) => {
                return { SATSS_ID: item?._id }
            }).filter(item => item?.SATSS_ID ? true : false);

            if (findRelation.length === filterRelation.length) {
                return { success: true, filterRelation: filterRelation }
            }

            throw new Error("Something was wrong on filteration");
        } else {
            throw new Error("Duplicate value are founded on paload-idRelation");
        }
    } catch (error) {
        throw error;
    }

}



const getAllLinkedSuject = async (req, res) => {
    const bodyData = req.body;

    if (bodyData == null || bodyData == undefined) {
        return (
            res.status(401).json({
                message: "Payload are missing",
                success: false,
                status: 401
            })
        )
    }

    if (!(bodyData?.studentAttendanceId || Object.keys(bodyData).length == 1)) {
        return (
            res.status(401).json({
                message: "Payload are missing (condition)",
                success: false,
                status: 401
            })
        )
    }

    try {
        let data = await StudentWithSubjectSchema
            .findOne({ studentAttendanceId: bodyData?.studentAttendanceId })
            .populate({
                path: "subjectList.SATSS_ID",
                select: "-_id -idRelation",
                populate: [
                    { path: "subjetId" },
                    { path: "teacherId" }
                ]
            })
            .lean();


        if ((data == null || data == undefined)) {
            return (
                res.status(404).json({
                    message: "User are not in list of attendance",
                    success: false,
                    status: 404
                })
            )
        }

        if (Object.keys(data).length > 0) {
            return (
                res.status(200).json({
                    message: "successfully found data",
                    success: true,
                    status: 200,
                    UserData: data
                })
            )
        }

        throw new Error("list have no any data");
    } catch (error) {
        res.status(500).json({
            message: error.message || "internal server error",
            success: false,
            status: 500
        })
    }


}





const scheduleTheTime = async (req, res) => {

    const body = req.body;

    const { AttendanceId } = req.params;


    if (!body || !body.length > 0 || body == null || body == undefined) {
        return req.status(404).json({
            message: "payload are missing",
            success: false,
            status: 404
        })
    };

    let checkList = body.filter(item => !item.save).map((item) => {
        return {
            ...item,
            save: true
        }
    });

    try {
        const parsed = scheduleSubject.safeParse(checkList);

        if (!parsed.success) {
            return res.status(403).json({
                message: "zod validation failed",
                status: 403,
                success: false
            })
        }

        //  ===================================== new code (best to filter exist data) =============================

        const checkWeekDayAndPeriode = await StudentWithSubjectSchema.findOne({ studentAttendanceId: AttendanceId });
        if (checkWeekDayAndPeriode === null) {
            return res.status(403).json({
                message: "Student record are not found",
                status: 404,
                success: false
            })
        }
        if (Object.keys(checkWeekDayAndPeriode).length > 0) {
            const result = checkWeekDayAndPeriode.subjectCollections.filter((item) =>
                !parsed.data.some((incoming) =>
                    item.weekDay === incoming.weekDay &&
                    item.nth_Periode === incoming.nth_Periode
                ));
            checkWeekDayAndPeriode.subjectCollections = [...result, ...parsed.data];
            await checkWeekDayAndPeriode.save();
            return res.status(201).json({
                message: "Successfully Update",
                status: 201,
                success: true
            })
        } else {
            const UserFind = await StudentWithSubjectSchema.updateOne({ studentAttendanceId: AttendanceId }, {
                $push: {
                    subjectCollections: {
                        $each: [
                            ...parsed?.data
                        ]
                    }
                }
            }).lean();

            const { acknowledged } = UserFind;

            if (acknowledged) {
                return res.status(201).json({
                    message: "Successfully Update",
                    status: 201,
                    success: true
                })
            }
        }
        throw new Error("uncompleted task")
    } catch (error) {
        return res.status(505).json({
            message: error.message,
            status: 505,
            success: false
        })
    }
}


export { fetchRelatedSubjectByStudent, linkTheRelatedSubject, getAllLinkedSuject, scheduleTheTime };












