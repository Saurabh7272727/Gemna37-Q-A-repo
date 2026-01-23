import mongoose, { Schema } from "mongoose";


const model = new Schema({
    studentAttendanceModel: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
        unique: true
    },
    attendanceRecord: {
        type: Map,
        of: String,
        default: {}
    },
    historicalRecord: [
        {
            SATSS_ID: {
                type: Schema.Types.ObjectId,
                required: true,
                trim: true
            },
            totalAttendLectures: {
                type: Number,
                default: 0
            }
        }
    ]
}, { timestamps: true });



const AttendanceRecordCore = mongoose.model("AttendanceRecordCore", model);

export default AttendanceRecordCore;