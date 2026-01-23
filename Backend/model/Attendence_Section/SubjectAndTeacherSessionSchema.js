import mongoose, { Schema } from "mongoose";



const model = new Schema({
    subjetId: {
        type: Schema.Types.ObjectId,
        ref: "SubjectSchema",
        required: true,
        trim: true
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "TeacherSchema",
        required: true,
        trim: true
    },
    priority: {
        type: String,
        enum: ["HIGH", "MEDIUM", "LOW"],
        default: "MEDIUM"
    },
    totalNumberOfLecture: {
        type: Number,
        default: 0
    }
}, { timestamps: true });



const SubjectAndTeacherSessionSchema = mongoose.model("SubjectAndTeacherSessionSchema", model);

export default SubjectAndTeacherSessionSchema