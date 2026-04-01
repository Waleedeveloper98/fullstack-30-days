import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    cv: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "reviewed", "accepted", "rejected"]
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })


const applicationModel = mongoose.model("Application", applicationSchema)

export default applicationModel