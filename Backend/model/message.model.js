import mongoose, { Schema } from 'mongoose';


const messageschema = new Schema(new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Text', 'Image', "Code"],
        default: "Text"
    },
    language: {
        type: String,
        required: true,
        enum: ['javascript', "python", 'java', 'c', "plaintext"],
        default: "plaintext"
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "GEMIDLOG"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "GEMIDLOG"
    },
    message: {
        type: String,
        required: true
    },
    saveID: {
        type: Boolean,
        enum: [true, false],
        default: false,
    }
}, { timestamps: true }));

const messagemodel = mongoose.model("messagemodel", messageschema);

export default messagemodel