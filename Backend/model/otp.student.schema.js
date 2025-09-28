import mongoose, { Schema } from "mongoose";


const model = new Schema(new mongoose.Schema({
    OTP: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
}, { timestamps: true }));

const StudentOtpLog = mongoose.model("otpSubmit", model);

export default StudentOtpLog;