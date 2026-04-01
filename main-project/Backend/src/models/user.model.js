import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ["Recruiter", "Applicant"],
        default: "Applicant",
        required: true
    }

}, { timestamps: true });


const userModel = mongoose.model("User", userSchema);

export default userModel;