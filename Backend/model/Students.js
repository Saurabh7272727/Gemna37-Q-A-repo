import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const StudentSchema = new Schema(
    {
        ref_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GEMIDLOG",
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    { timestamps: true, strictPopulate: false }
);

// Hash password before save
StudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare password
StudentSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const StudentModelMain = mongoose.model("Students", StudentSchema);

export default StudentModelMain;
