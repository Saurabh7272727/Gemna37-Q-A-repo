import mongoose, { Schema } from "mongoose";




const model = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        enum: [
            "CS_IT",
            "AI_ML",
            "ME",
            "CE",
            "D_CS",
            "D_ME",
            "D_CE",
            "EE",
            "CSE",
            "DS",
            "AI"
        ]
    },
    semester: {
        type: Number,
        max: [10, 'only have during maximum 10 semester'],
        min: [1, 'minimum semester required 1'],
        required: true
    },
    weeklyFrequency: {
        type: Number,
        default: 1,
        min: [1, 'minimum weekly frequency is 1']
    },
    shortName: {
        type: String,
        uppercase: true,
        required: true,
        trim: true
    },
    subjectCode: {
        type: String,
        uppercase: true,
        required: true,
        trim: true,
        unique: [true, 'subject-code are unique - Error occurs because if you choose exist subject code']
    },
    type: {
        type: String,
        enum: ["THEORY", "LAB"],
        required: true,
        uppercase: true
    },

    attendanceWeight: {
        type: Number,
        default: function () {
            return this.type === "LAB" ? 2 : 1;
        }
    },
    coverImage: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/684/622/png-clipart-logo-subject-english-miscellaneous-blue.png",
        trim: true
    },

}, { timestamps: true });


// Without this → data inconsistency because we not change or update the attendanceWeight (directly)
model.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update.type) {
        update.attendanceWeight = update.type === "LAB" ? 2 : 1;
    }
    next();
});


const SubjectSchema = mongoose.model("SubjectSchema", model);
export default SubjectSchema;