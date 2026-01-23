import mongoose, { Schema } from "mongoose";

const model = new Schema({
    studentAttendanceId: {
        type: Schema.Types.ObjectId,
        ref: "StudentAttendance",
        trim: true,
        required: true,
        unique: true
    },
    //  in subjectList store only subject list of related student (unique each other)
    subjectList: [
        {
            SATSS_ID: {
                type: Schema.Types.ObjectId,
                ref: "SubjectAndTeacherSessionSchema",
                trim: true,
                required: true
            }
        }
    ],

    // this is like time table collection of related student (not unique but validate on same weekday and nth_Periode)
    subjectCollections: [
        {
            SATSS_ID: {
                type: Schema.Types.ObjectId,
                ref: "SubjectAndTeacherSessionSchema",
                trim: true,
                required: true
            },
            priority: {
                type: String,
                enum: ["HIGH", "MEDIUM", "LOW"],
                default: "MEDIUM",
                trim: true
            },
            weekDay: {
                type: String,
                enum: ["MONDAY", "TUESDAY", "WEDNESDAY", "THUSDAY", "FRIDAY", "SATURDAY"],
                required: true,
                trim: true
            },
            nth_Periode: {
                type: Number,
                required: true,
            }
        }
    ]

}, { timestamps: true });


const StudentWithSubjectSchema = mongoose.model("StudentWithSubjectSchema", model);

export default StudentWithSubjectSchema;
