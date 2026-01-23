import mongoose, { Schema } from "mongoose";



const model = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    shortName: {
        type: String,
        required: true,
        trim: true,
    },
    coverImage: {
        type: String,
        default: "https://tse2.mm.bing.net/th/id/OIP.YxV2fQUIVqyS7huz-I8D5QAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
        trim: true
    },
    position: {
        type: String,
        enum: ["HOD", "TEACHER", "PROFESSOR", "ASSIANT PROFESSOR"],
        default: "TEACHER"
    }
}, { timestamps: true });


const TeacherSchema = mongoose.model("TeacherSchema", model);

export default TeacherSchema;
