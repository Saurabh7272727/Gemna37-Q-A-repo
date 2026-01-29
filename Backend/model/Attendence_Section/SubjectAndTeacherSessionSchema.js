import mongoose, { Schema } from "mongoose";
import './TeacherSchema.js';
import './SubjectSchema.js'


const model = new Schema({
    idRelation: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    subjetId: {
        type: Schema.Types.ObjectId,
        ref: "subjectschema",
        required: true,
        trim: true
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "teacherschema",
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



const SubjectAndTeacherSessionSchema = mongoose.model("subjectandteachersessionschema", model);

export default SubjectAndTeacherSessionSchema