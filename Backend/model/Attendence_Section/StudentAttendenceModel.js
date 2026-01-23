import mongoose, { Schema } from "mongoose";

const StudentAttendanceSchema = new Schema(
    {
        gemidlog: {
            type: Schema.Types.ObjectId,
            ref: "GEMIDLOG",
            required: true,
            unique: true // keep only 1–1 relation
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        semester: {
            type: String,
            trim: true,
            required: true
        },

        mobileNumber: {
            type: String,
            required: true,
            match: [/^[6-9]\d{9}$/, "Mobile number must be 10 digits"]
        },

        category: {
            type: String,
            enum: ["REGULAR", "X_STUDENT", "LATERAL_STUDENT", "RE_ADMISSION"],
            default: "REGULAR"
        },

        honestyScore: {
            type: Number,
            min: 0,
            max: 1,
            default: 0.2
        }
    },
    { timestamps: true }
);

const StudentAttendanceModel = mongoose.model(
    "StudentAttendance",
    StudentAttendanceSchema
);

export default StudentAttendanceModel;
