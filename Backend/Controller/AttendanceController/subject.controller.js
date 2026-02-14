import payloadSchema from '../ZodSchema/AttendanceSchema/fetchRelatedSubjectSchema.js';
import SubjectAndTeacherSessionSchema from '../../model/Attendence_Section/SubjectAndTeacherSessionSchema.js';

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


export { fetchRelatedSubjectByStudent };












