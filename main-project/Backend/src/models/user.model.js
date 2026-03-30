import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true });

userSchema.index({ username: 1, email: 1 });

const userModel = mongoose.model("User", userSchema);

export default userModel;