import mongoose, { Schema } from 'mongoose';


const messageschema = new Schema(new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['text', 'image'],
        default: "text"
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