import mongoose, { Schema } from "mongoose";


const model = new Schema(new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    fatherName: {
        type: String,
        default: "NA",
        trim: true,
    },
    motherName: {
        type: String,
        default: "NA",
        trim: true,
    },
    emailAreSendStatus: {
        type: String,
        enum: ['failed', 'successed', 'processing'],
        default: "processing"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: [13, "Roll number must be 13 characters"],
        maxlength: [13, "Roll number must be 13 characters"],
        trim: true,
    },
    GEMID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    collegeID: {
        type: String,
        required: true,
        trim: true,
    },
    course: {
        value: { type: String, required: true },
        label: { type: String, required: true },
    },
    branch: {
        value: { type: String, required: true },
        label: { type: String, required: true },
    },
    year: {
        value: { type: String, required: true },
        label: { type: String, required: true },
    },
    status: {
        value: { type: String, enum: ["active", "inactive"], default: "inactive" },
        label: { type: String, default: "Inactive" },
    },
    Indb: {
        type: Boolean,
        required: true
    },
    imageURL: {
        type: String,
    }

}, { timestamps: true }));

const StudentModel = mongoose.model("GEMIDLOG", model);

export default StudentModel;