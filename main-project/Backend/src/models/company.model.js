import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    details: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const companyModel = mongoose.model("Company", companySchema)

export default companyModel;