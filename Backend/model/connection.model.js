import mongoose from 'mongoose';


const connectionschema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['direct', 'group'],
        default: "direct"
    },

    id: {
        type: String,
        required: true,
        unique: true
    },

    member_one: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "GEMIDLOG"
    },
    member_two: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "GEMIDLOG"
    },
    messages: [
        {
            ref_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "messagemodel"
            }
        }
    ]
}, {
    timestamps: true
});

const connectionModel = mongoose.model("connectionmodel", connectionschema);

export default connectionModel